import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage';
import { Message, WholeState } from '@/types';
import { TailSpin } from 'react-loader-spinner';
import {
  ChangeEventHandler,
  ComponentProps,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import MessagesList from './MessagesList';
import { Form } from 'react-router-dom';
import { getDatabase, onValue, ref } from 'firebase/database';

function ChatView({
  sendMessage,
  dummy,
  deleteMessage,
  setTypingTimestamp,
  editMessage,
}: {
  sendMessage: (messageToSend: string) => Promise<void>;
  dummy: MutableRefObject<HTMLDivElement | null>;
  deleteMessage: (message: Message) => Promise<void>;
  setTypingTimestamp: () => void;
  editMessage: () => Promise<void>;
}) {
  const db = getDatabase();

  const currentFriend = useSelector(
    (state: WholeState) => state.chat.currentFriend
  );
  const isLoadingData = useSelector(
    (state: WholeState) => state.chat.isLoadingData
  );
  const currentCombinedId = useSelector(
    (state: WholeState) => state.chat.currentCombinedId
  );
  const myMessages = useSelector(
    (state: WholeState) => state.chat.myMessages
  );

  const [currentMessage, setCurrentMessage] = useState<
    string | undefined
  >(undefined);

  const [lastWritingTimestamp, setLastWritingTimestamp] = useState<
    number | null
  >(null);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const onMessageChange: ComponentProps<'input'>['onChange'] = (
    event
  ) => {
    setCurrentMessage(event.target.value);
    setTypingTimestamp();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentMessage && currentMessage?.trimEnd().length <= 0)
      return;

    sendMessage(currentMessage!);

    setCurrentMessage('');
  };

  useEffect(() => {
    onValue(
      ref(
        db,
        'chats/' +
          currentCombinedId +
          '/lastTypingTimestamps/' +
          currentFriend?.uid
      ),
      (writingTimestamp: any) => {
        if (writingTimestamp.exists()) {
          setLastWritingTimestamp(writingTimestamp.val().timestamp);
        }
      }
    );
  }, []);

  useEffect(() => {
    // This handles displaying when someone is typing

    console.log(lastWritingTimestamp);

    let timer = null;

    if (
      // When someone you are chating with sends message, stop showing that he/she is typing

      myMessages[myMessages.length - 1]?.sender ===
        currentFriend?.uid &&
      lastWritingTimestamp &&
      myMessages[myMessages.length - 1]?.date > lastWritingTimestamp
    ) {
      setIsTyping(false);
    }

    // If last typing was at max 5 seconds ago, display that he/she is typing and after 5 seconds stop displaying
    else if (
      lastWritingTimestamp &&
      (lastWritingTimestamp - Date.now()) / 1000 > -5
    ) {
      setIsTyping(true);

      timer = setTimeout(() => setIsTyping(false), 5 * 1000);
    }

    return () => {
      // When there's new last typing, then close the timeout

      if (!timer) return;

      clearTimeout(timer);
    };
  }, [lastWritingTimestamp, myMessages]);

  // useEffect(() => {
  //   console.log(myMessages);
  // }, [myMessages]);

  return (
    <>
      <MessagesList
        dummy={dummy}
        deleteMessage={deleteMessage}
        isLoadingData={isLoadingData}
      />

      {currentFriend && (
        <Form
          onSubmit={onSubmit}
          className='w-full mt-auto px-4 pb-4 pt-4 relative'
        >
          {isTyping && (
            <div className='dark:text-white absolute text-sm -top-1'>{`${currentFriend.displayName} is typing...`}</div>
          )}
          <input
            value={currentMessage}
            onChange={onMessageChange}
            className='w-full border-none bg-orange-vivid-200 text-lg py-1 px-2 rounded placeholder:text-orange-vivid-700 focus:outline-none'
            placeholder={`You are typing with ${currentFriend.displayName}`}
          />
        </Form>
      )}
    </>
  );
}

export default ChatView;

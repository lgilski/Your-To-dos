import ProfileIcon from '@/components/Profile/ProfileIcon';
import { auth } from '@/config/firebase';
import formatMessageData from '@/helpers/formatMessageData';
import { Message, WholeState } from '@/types';
import { getDatabase, ref, update } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function ChatMessage({
  message,
  index,
  deleteMessage,
}: // setEditedMessage,
{
  message: Message;
  index: number;
}) {
  const user = auth.currentUser;
  const db = getDatabase();

  const currentFriend = useSelector(
    (state: WholeState) => state.chat.currentFriend
  );
  const currentCombinedId = useSelector(
    (state: WholeState) => state.chat.currentCombinedId
  );
  const myMessages = useSelector(
    (state: WholeState) => state.chat.myMessages
  );
  const [editable, setEditable] = useState(false);

  const editMessage = function () {
    setEditable((prevState) => !prevState);
  };

  const setEditedMessage = function () {
    editMessage();

    if (textAreaRef.current.innerText !== message.message)
      update(
        ref(db, 'chats/' + currentCombinedId + '/messages/' + index),
        { message: textAreaRef.current.innerText, edited: true }
      );
  };

  const keyHandler = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      setEditedMessage();
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      setEditable(false);
      textAreaRef.current.innerText = message.message;
    }
  };

  const textAreaRef = useRef<HTMLParagraphElement>(null);

  const {
    onlyMessage,
    photo,
    sentBy,
    dateToDisplay,
    time,
    nextDiff,
  } = formatMessageData(message, myMessages, index, currentFriend);

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current!.focus();

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textAreaRef.current!);
      range.collapse(false);
      selection!.removeAllRanges();
      selection!.addRange(range);
    }
  }, [editable]);

  return (
    <div
      className={`flex relative px-4 py-0.5 gap-2 group/message hover:bg-grey-050 dark:hover:bg-grey-800 ${
        myMessages[index + 1] &&
        myMessages[index + 1].sender !== message.sender &&
        'mb-4'
      } ${nextDiff! > 3 && 'mb-4'} `}
    >
      {!onlyMessage && (
        <ProfileIcon
          size='semi-medium'
          friend
          src={message.canNotSendMessage ? null : photo!}
        />
      )}
      <div className='flex flex-col gap-1'>
        {!onlyMessage && (
          <div className='flex items-baseline gap-2'>
            <div className=' dark:text-grey-100 font-medium'>
              {message.canNotSendMessage
                ? 'Your To-dos and stuff UwU'
                : sentBy}
            </div>
            <p className='text-xs text-grey-400'>
              {dateToDisplay} {time}
            </p>
          </div>
        )}
        <p
          className={`flex flex-col ${
            onlyMessage && 'pl-12'
          } max-w-full`}
        >
          <span
            suppressContentEditableWarning={true}
            contentEditable={editable}
            onKeyDown={keyHandler}
            ref={textAreaRef}
            className={`${
              editable &&
              'dark:bg-orange-800 h-auto flex items-center p-3 rounded-lg text-lg w-fit focus:outline-none break-all max-w-full'
            }`}
          >
            {message.message}{' '}
            {message.edited && (
              <span className='text-xs dark:text-grey-400 text-grey-300 pl-2'>
                (edited)
              </span>
            )}
          </span>
          {editable && (
            <div className='flex gap-3 text-sm'>
              <p className='flex gap-1'>
                press esc to
                <button
                  onClick={() => setEditable(false)}
                  className='bg-inherit border-none text-orange-500 text-sm cursor-pointer hover:underline'
                >
                  cancle
                </button>
              </p>
              <p className='flex gap-1'>
                press enter to
                <button
                  onClick={setEditedMessage}
                  className='bg-inherit border-none text-orange-500 text-sm cursor-pointer hover:underline'
                >
                  save changes
                </button>
              </p>
            </div>
          )}
        </p>
      </div>
      {message.sender === user?.uid && (
        <div className='absolute overflow-hidden rounded border border-solid border-grey-850 hidden -top-4 right-4 h-7 bg-grey-700 group-hover/message:flex [&_ion-icon]:h-full [&_ion-icon]:w-full'>
          <button
            onClick={editMessage}
            className='border-y-0 border-l-0 border-r border-solid border-grey-900 h-full w-7 bg-inherit text-grey-050 py-0.5 px-1 hover:bg-grey-600 duration-300 cursor-pointer'
          >
            <ion-icon name='create-outline' />
          </button>
          <button
            onClick={() => deleteMessage(message)}
            className='h-full w-7 bg-inherit border-none text-grey-050 p-1 hover:bg-grey-600 hover:text-red-300 duration-300 cursor-pointer'
          >
            <ion-icon name='trash-outline' />
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;

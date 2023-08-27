import FriendsView from './views/FriendsView/FriendsView';
import useChat from '@/hooks/useChat';
import { ComponentProps, useRef, useState } from 'react';
import ChatsList from './views/ChatView/ChatsList';
import ChatView from './views/ChatView/ChatView';

function Chat() {
  const dummy = useRef<HTMLDivElement | null>(null);

  const [currentMessage, setCurrentMessage] = useState<
    string | undefined
  >(undefined);

  const onMessageChange: ComponentProps<'input'>['onChange'] = (
    event
  ) => {
    setCurrentMessage(event.target.value);
  };

  const functions = useChat({
    dummy,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    functions.sendMessage(currentMessage!);
    setCurrentMessage('');
  };

  return (
    <div className=' w-[1600px] h-[800px] bg-white mx-auto rounded-2xl border border-solid border-grey-200 dark:border-grey-600 dark:bg-grey-850 duration-500 grid grid-cols-[300px_1fr] overflow-hidden relative shadow-md'>
      <ChatsList
        goToChat={functions.goToChat}
        goToFriendsList={functions.goToFriendsList}
      />
      <div className='flex flex-col'>
        <FriendsView functions={functions} />
        <ChatView
          onMessageChange={onMessageChange}
          onSubmit={onSubmit}
          dummy={dummy}
          value={currentMessage}
        />
      </div>
    </div>
  );
}

export default Chat;

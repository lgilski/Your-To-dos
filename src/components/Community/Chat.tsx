import FriendsView from './views/FriendsView/FriendsView';
import useChat from '@/hooks/useChat';
import { ComponentProps, useRef, useState } from 'react';
import ChatsList from './views/ChatView/ChatsList';
import ChatView from './views/ChatView/ChatView';

function Chat() {
  const dummy = useRef<HTMLDivElement | null>(null);

  const functions = useChat({
    dummy,
  });

  return (
    <div className=' max-w-[1600px] h-[calc(100vh-120px)] bg-white mx-auto rounded-md border border-solid border-cool-grey-200 dark:border-cool-grey-600 dark:bg-cool-grey-850 duration-500 grid grid-cols-[300px_1fr] overflow-hidden relative shadow-md'>
      <ChatsList
        goToChat={functions.goToChat}
        goToFriendsList={functions.goToFriendsList}
      />
      <div className='flex flex-col  dark:bg-cool-grey-900'>
        <FriendsView functions={functions} />
        <ChatView
          setTypingTimestamp={functions.setTypingTimestamp}
          sendMessage={functions.sendMessage}
          dummy={dummy}
          deleteMessage={functions.deleteMessage}
          editMessage={functions.setEditedMessage}
        />
      </div>
    </div>
  );
}

export default Chat;

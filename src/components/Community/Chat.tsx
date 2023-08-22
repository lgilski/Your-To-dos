import { auth } from '@/config/firebase';
import FriendsList from './views/ChatView/FriendsList';
import useChat from '@/hooks/useChat';
import { useRef, useState } from 'react';
import ChatsList from './views/ChatView/ChatsList';
import ChatMessage from './views/ChatView/ChatMessage';
import ChatInput from './views/ChatView/ChatInput';

function Chat() {
  const messageRef = useRef<HTMLInputElement | null>(null);
  const dummy = useRef<HTMLDivElement | null>(null);
  const user = auth.currentUser;

  const [currentMessage, setCurrentMessage] = useState<
    string | undefined
  >();

  function onMessageChange() {
    setCurrentMessage(messageRef.current?.value);
  }

  const {
    currentFriend,
    searchedFriend,
    chats,
    messages,
    requests,
    friendsListSection,
    friends,
    displayAddFriendsModal,
    functions,
  } = useChat({ currentMessage, setCurrentMessage, dummy });

  const sortedChats = chats.sort((a, b) => b.date - a.date);

  console.log(friendsListSection);

  return (
    <div className=' w-[1600px] h-[800px] bg-white mx-auto rounded-2xl border border-solid border-grey-200 dark:border-grey-600 dark:bg-grey-850 duration-500 grid grid-cols-[300px_1fr] overflow-hidden relative shadow-md'>
      <ChatsList
        currentFriend={currentFriend}
        functions={functions}
        sortedChats={sortedChats}
      />
      <div className='flex flex-col'>
        {!currentFriend && (
          <FriendsList
            searchedFriend={searchedFriend}
            requests={requests}
            friendsListSection={friendsListSection}
            friends={friends}
            displayAddFriendsModal={displayAddFriendsModal}
            functions={functions}
          />
        )}
        {messages.length > 0 && (
          <div
            // onScroll={functions.handleScroll}
            className='flex flex-col dark:text-grey-200 overflow-y-scroll max-h-[740px] pt-4'
          >
            {messages.map((message, index) => {
              return (
                <ChatMessage
                  currentFriend={currentFriend}
                  user={user}
                  index={index}
                  message={message}
                  messages={messages}
                  key={message.date}
                />
              );
            })}
            <div ref={dummy} />
          </div>
        )}
        {currentFriend && (
          <ChatInput
            messageRef={messageRef}
            currentMessage={currentMessage}
            displayName={currentFriend.displayName}
            sendMessage={functions.sendMessage}
            onMessageChange={onMessageChange}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;

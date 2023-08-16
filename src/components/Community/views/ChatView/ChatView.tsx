import { auth } from '@/config/firebase';
import ProfileIcon from '../../../Profile/ProfileIcon';
import FriendsList from './FriendsList';
import useChat from '@/hooks/useChat';
import { useRef, useState } from 'react';

function ChatView() {
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
    messages,
    requests,
    friends,
    displayAddFriendsModal,
    functions,
  } = useChat({ currentMessage, setCurrentMessage, dummy });

  return (
    // w-[95%] h-[96%]
    <div className=' w-[1600px] h-[800px] bg-white mx-auto rounded-2xl border border-solid border-grey-200 dark:border-grey-600 dark:bg-grey-850 duration-500 grid grid-cols-[300px_1fr_220px] overflow-hidden relative shadow-md'>
      {/* <div className='absolute w-full top-0 left-0 h-12 bg-green-500'>
        AAAAAAAAAA
      </div> */}
      <FriendsList
        friends={friends}
        displayAddFriendsModal={displayAddFriendsModal}
        functions={functions}
      />

      <div className='flex flex-col'>
        <div className='flex flex-col dark:text-grey-200 overflow-auto max-h-[700px] '>
          {messages &&
            messages.map((message, index) => {
              const date = new Date(message.date).toLocaleDateString(
                'pl-PL'
              );

              const hours = new Date(message.date).getHours();
              let minutes: string | number = new Date(
                message.date
              ).getMinutes();

              if (
                new Date(message.date).getMinutes().toString()
                  .length < 2
              )
                minutes =
                  '0' +
                  new Date(message.date).getMinutes().toString();

              const time = hours + ':' + minutes;

              let onlyMessage = false;
              let nextDiff;

              if (messages[index - 1]) {
                const before = Math.floor(
                  new Date(messages[index - 1].date).getTime() /
                    1000 /
                    60
                );
                const now = Math.floor(
                  new Date(message.date).getTime() / 1000 / 60
                );
                const diff = now - before;

                if (
                  diff <= 3 &&
                  messages[index - 1].sender === message.sender
                ) {
                  onlyMessage = true;
                } else {
                  onlyMessage = false;
                }
              }

              if (messages[index + 1]) {
                const now = Math.floor(
                  new Date(message.date).getTime() / 1000 / 60
                );
                const after = Math.floor(
                  new Date(messages[index + 1].date).getTime() /
                    1000 /
                    60
                );

                nextDiff = after - now;
              }

              let photo: string | null | undefined =
                currentFriend?.photoURL;

              if (message.sender === user?.uid) {
                photo = user.photoURL;
              }

              const sentBy =
                message.sender === user?.uid
                  ? user.displayName
                  : currentFriend?.displayName;

              console.log(onlyMessage);

              return (
                <div
                  className={`flex px-4 py-0.5 gap-2 last:mb-2`}
                  key={message.date}
                >
                  {!onlyMessage && (
                    <ProfileIcon size='semi-medium' src={photo!} />
                  )}
                  <div className='flex flex-col gap-1'>
                    {!onlyMessage && (
                      <div className='flex items-baseline gap-2'>
                        <div className=' dark:text-grey-100 font-medium'>
                          {sentBy}
                        </div>
                        <p className='text-xs text-grey-400'>
                          {date} {time}
                        </p>
                      </div>
                    )}
                    <p
                      className={`${onlyMessage && 'pl-12'} ${
                        messages[index + 1] &&
                        messages[index + 1].sender !==
                          message.sender &&
                        'mb-4'
                      } ${nextDiff! >= 3 && 'mb-4'}`}
                    >
                      {message.message}
                    </p>
                  </div>
                </div>
              );
            })}
          <div ref={dummy} />
        </div>
        {currentFriend && (
          <form
            onSubmit={functions.sendMessage}
            // w-full / absolute bottom-0 left-0 w-[70%]+
            className='w-full mt-auto px-4 pb-2'
          >
            <input
              ref={messageRef}
              value={currentMessage}
              onChange={onMessageChange}
              className='w-full border-none bg-orange-200 text-lg p-1 rounded placeholder:text-orange-700'
              placeholder={`You are typing with ${currentFriend.displayName}`}
            />
          </form>
        )}
      </div>

      <div className='bg-red-100'>
        <div>
          <h1>Requests</h1>
          {requests &&
            requests.map((request) => {
              return (
                <div
                  key={request.uid}
                  className='flex items-center p-1 justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <ProfileIcon
                      size='medium'
                      src={request.photoURL}
                    />
                    <div>{request.displayName}</div>
                  </div>
                  <div className='[&_ion-icon]:w-6 [&_ion-icon]:h-6 [&_button]:border-none [&_button]:rounded-full [&_button]:p-1 [&_button]:h-8 [&_button]:dark:bg-grey-800 [&_button]:dark:text-grey-100 flex gap-1'>
                    <button
                      onClick={() =>
                        functions.acceptFriendRequest(request)
                      }
                      className='dark:hover:text-lime-green-500 hover:text-lime-green-500 duration-300 cursor-pointer'
                    >
                      <ion-icon name='checkmark' />
                    </button>
                    <button
                      onClick={() =>
                        functions.ingnoreFriendRequest(request)
                      }
                      className='dark:hover:text-red-500 hover:text-lime-green-500 duration-300 cursor-pointer'
                    >
                      <ion-icon name='close' />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ChatView;

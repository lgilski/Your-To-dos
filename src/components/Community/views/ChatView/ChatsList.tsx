import ProfileIcon from '@/components/Profile/ProfileIcon';
import { Friend, WholeState } from '@/types';
import { useSelector } from 'react-redux';

function ChatsList({
  goToChat,
  goToFriendsList,
}: {
  goToChat: (e: Event | null, friend: Friend) => void;
  goToFriendsList: () => void;
}) {
  const currentFriend = useSelector(
    (state: WholeState) => state.chat.currentFriend
  );
  const userChats = useSelector(
    (state: WholeState) => state.chat.userChats
  );

  return (
    <div className='bg-orange-vivid-050 dark:bg-cool-grey-800 flex flex-col overflow-y-auto'>
      <div className='bg-inherit py-4 px-4 border-x-0 border-t-0 border-b border-solid dark:border-cool-grey-600 border-cool-grey-200 w-full mx-auto'>
        <button
          onClick={goToFriendsList}
          className={`border-none ${
            !currentFriend
              ? 'dark:bg-cool-grey-700 bg-orange-vivid-200'
              : 'bg-inherit'
          } dark:text-cool-grey-100 rounded-md px-4 py-2 text-lg w-full font-semibold cursor-pointer duration-300 hover:bg-orange-vivid-100 dark:hover:bg-cool-grey-600 text-left [&_ion-icon]:w-5 [&_ion-icon]:h-5 flex items-center gap-2`}
        >
          <ion-icon name='people' /> Friends
        </button>
      </div>
      <div className='flex flex-col px-4 pt-4 dark:text-cool-grey-100'>
        {userChats.length > 0 &&
          userChats.map((chat) => {
            return (
              <div
                onClick={() => goToChat(null, chat.userInfo)}
                key={chat.userInfo.uid}
                className={`flex items-center relative gap-4 ${
                  currentFriend?.uid === chat.userInfo.uid &&
                  'bg-orange-vivid-200 dark:bg-cool-grey-700'
                } hover:bg-orange-vivid-100 px-2 py-2 rounded duration-300 cursor-pointer dark:hover:bg-cool-grey-600`}
              >
                <ProfileIcon
                  size='medium'
                  friend
                  src={chat.userInfo?.photoURL}
                />
                <div className='text-2xl font-normal'>
                  {chat.userInfo.displayName}
                </div>
                {chat.newMessages && (
                  <div className='absolute bg-cool-grey-800 rounded-full w-7 h-7 p-1 left-10 top-0'>
                    <p className='bg-red-400 text-red-50 w-full h-full rounded-full font-medium text-sm flex justify-center items-center'>
                      {chat.newMessages > 9 ? '+9' : chat.newMessages}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChatsList;

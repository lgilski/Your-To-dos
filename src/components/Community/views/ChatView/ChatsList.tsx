import ProfileIcon from '@/components/Profile/ProfileIcon';
import { Friend } from '@/types';

function ChatsList({
  sortedChats,
  functions,
  currentFriend,
}: {
  sortedChats:
    | {
        userInfo: {
          displayName: string;
          userName: string;
          uid: string;
          photoURL: string;
        };
        date: number;
      }[]
    | [];
  currentFriend:
    | {
        displayName: string;
        photoURL: string;
        uid: string;
      }
    | null
    | undefined;
  functions: {
    closeAddFriendsModal: () => void;
    openAddFriendsModal: () => void;
    acceptFriendRequest: (sentRequest: Friend) => Promise<void>;
    ingnoreFriendRequest: (request: Friend) => Promise<void>;
    goToChat: (friend: Friend) => void;
    goToFriendsList: () => void;
  };
}) {
  return (
    <div className='bg-orange-050 dark:bg-grey-800 flex flex-col overflow-y-auto'>
      <div className='bg-inherit py-4 px-4 border-x-0 border-t-0 border-b border-solid dark:border-grey-600 border-grey-200 w-full mx-auto'>
        <button
          onClick={functions.goToFriendsList}
          className='border-none bg-inherit dark:text-grey-100 rounded-lg px-2 py-1 text-xl w-full font-semibold cursor-pointer duration-300 hover:bg-orange-100 dark:hover:bg-grey-600 text-left [&_ion-icon]:w-5 [&_ion-icon]:h-5 flex items-center gap-2'
        >
          <ion-icon name='people' /> Friends
        </button>
      </div>
      <div className='flex flex-col px-4 pt-4 dark:text-grey-100'>
        {sortedChats.length > 0 &&
          sortedChats.map((chat) => {
            return (
              <div
                onClick={() => functions.goToChat(chat.userInfo)}
                key={chat.userInfo.uid}
                className={`flex items-center gap-4 ${
                  currentFriend?.uid === chat.userInfo.uid &&
                  'bg-orange-200 dark:bg-grey-700'
                } hover:bg-orange-100 px-2 py-2 rounded duration-300 cursor-pointer dark:hover:bg-grey-600`}
              >
                <ProfileIcon
                  size='medium'
                  friend
                  src={chat.userInfo?.photoURL}
                />
                <div className='text-2xl font-normal'>
                  {chat.userInfo.displayName}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChatsList;

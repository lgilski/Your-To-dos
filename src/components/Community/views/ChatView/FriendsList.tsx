import ProfileIcon from '@/components/Profile/ProfileIcon';
import AddFriendsModal from './modals/AddFriendsModal';
import { Friend } from '@/types';

function FriendsList({
  friends,
  displayAddFriendsModal,
  functions,
}: {
  friends: Friend[];
  displayAddFriendsModal: boolean;
  functions: {
    closeAddFriendsModal: () => void;
    openAddFriendsModal: () => void;
    acceptFriendRequest: (sentRequest: Friend) => Promise<void>;
    ingnoreFriendRequest: (request: { uid: string }) => void;
    goToChat: (friend: Friend) => void;
  };
}) {
  return (
    <div className='bg-orange-050 dark:bg-grey-800 flex flex-col overflow-y-auto'>
      <div className='bg-inherit py-4 px-8 border-x-0 border-t-0 border-b border-solid dark:border-grey-600 border-grey-200 w-[90%] mx-auto'>
        <button
          onClick={functions.openAddFriendsModal}
          className='border-none bg-lime-green-200 text-lime-green-800 rounded-lg px-2 py-1 text-xl w-full font-semibold cursor-pointer dark:bg-lime-green-600 dark:text-white duration-300 hover:bg-lime-green-300 dark:hover:bg-lime-green-700'
        >
          Add friend
        </button>
      </div>
      {displayAddFriendsModal && (
        <AddFriendsModal
          closeAddFriendsModal={functions.closeAddFriendsModal}
        />
      )}
      <div className='flex flex-col px-4 pt-4 dark:text-grey-100'>
        {friends &&
          friends.map((friend) => {
            return (
              <div
                onClick={() => functions.goToChat(friend)}
                key={friend.uid}
                className='flex items-center gap-4 hover:bg-orange-200 px-2 py-2 rounded duration-300 cursor-pointer dark:hover:bg-grey-600'
              >
                <ProfileIcon
                  size='medium'
                  friend
                  src={friend.photoURL}
                />
                <div className='text-2xl font-normal'>
                  {friend.displayName}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FriendsList;

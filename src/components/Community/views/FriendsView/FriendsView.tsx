import { Friend, WholeState } from '@/types';
import FriendsNav from './FriendsNav';
import FriendsList from './FriendsList';
import FriendRequestsList from './FriendRequestsList';
import { useSelector } from 'react-redux';
import AddFriends from './AddFriends';

function FriendsView({
  functions,
}: {
  functions: {
    acceptFriendRequest: (sentRequest: Friend) => Promise<void>;
    ingnoreFriendRequest: (sentRequest: Friend) => Promise<void>;
    goToChat: (friend: Friend) => Promise<void>;
    setCurrentFriendsViewSection: (e: any) => void;
    setCurrentSearchedFriend: (e: any) => void;
  };
}) {
  const currentFriend = useSelector(
    (state: WholeState) => state.chat.currentFriend
  );

  return (
    <>
      {!currentFriend && (
        <div className='dark:bg-inherit flex flex-col h-full overflow-y-auto relative'>
          <FriendsNav
            setCurrentFriendsViewSection={
              functions.setCurrentFriendsViewSection
            }
          />
          <div className='flex flex-col px-4 pt-4 dark:text-grey-100 h-full'>
            <FriendsList
              goToChat={functions.goToChat}
              setCurrentSearchedFriend={
                functions.setCurrentSearchedFriend
              }
            />
            <FriendRequestsList
              acceptFriendRequest={functions.acceptFriendRequest}
              ingnoreFriendRequest={functions.ingnoreFriendRequest}
            />
            <AddFriends />
          </div>
        </div>
      )}
    </>
  );
}

export default FriendsView;

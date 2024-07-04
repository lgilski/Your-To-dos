import { Friend, Message, WholeState } from '@/types';
import FriendsNav from './FriendsNav';
import FriendsList from './FriendsList';
import FriendRequestsList from './FriendRequestsList';
import { useSelector } from 'react-redux';
import SendFriendRequestForm from './SendFriendRequestForm';

function FriendsView({
  functions,
}: {
  functions: {
    acceptFriendRequest: (sentRequest: Friend) => Promise<void>;
    ingnoreFriendRequest: (sentRequest: Friend) => Promise<void>;
    goToChat: (e: any, friend: Friend) => Promise<void>;
    sendMessage: (messageToSend: string) => Promise<void>;
    goToFriendsList: () => void;
    setCurrentFriendsViewSection: (
      e: React.FormEvent<HTMLFormElement>
    ) => void;
    setCurrentSearchedFriend: (e: any) => void;
    deleteFriend: (friend: Friend) => Promise<void>;
    deleteMessage: (message: Message) => Promise<void>;
    setEditedMessage: () => Promise<void>;
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
          <div className='flex flex-col grow basis-0 px-4 pt-4 overflow-y-scroll dark:bg-cool-grey-900 dark:text-cool-grey-100 h-full'>
            <FriendsList
              goToChat={functions.goToChat}
              setCurrentSearchedFriend={
                functions.setCurrentSearchedFriend
              }
              deleteFriend={functions.deleteFriend}
            />
            <FriendRequestsList
              acceptFriendRequest={functions.acceptFriendRequest}
              ingnoreFriendRequest={functions.ingnoreFriendRequest}
            />
            <SendFriendRequestForm />
          </div>
        </div>
      )}
    </>
  );
}

export default FriendsView;

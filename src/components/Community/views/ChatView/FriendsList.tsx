import ProfileIcon from '@/components/Profile/ProfileIcon';
import AddFriendsModal from './modals/AddFriendsModal';
import { Friend } from '@/types';
import ChatRequest from './ChatRequest';

function FriendsNavButton({
  handler,
  friendsListSection,
  valueAsNotification,
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  handler: (e?: any) => void;
  friendsListSection: string;
  valueAsNotification?: any;
}) {
  return (
    <button
      onClick={handler}
      className={`relative border-none rounded-lg px-2 py-1 text-xl font-semibold cursor-pointer ${
        friendsListSection === children
          ? 'bg-orange-100 dark:bg-grey-700 after:absolute after:w-full after:h-0.5 after:bg-orange-400 after:content-[""] after:-bottom-2 after:left-0'
          : 'bg-orange-050 dark:bg-grey-800'
      } hover:bg-orange-100 duration-300 dark:text-grey-100 dark:hover:bg-grey-700`}
    >
      {children}
      {valueAsNotification && valueAsNotification.length > 0 && (
        <p className='absolute top-[-8px] right-[-8px] bg-orange-500 rounded-full text-sm w-5'>
          {valueAsNotification.length < 10
            ? valueAsNotification.length
            : '+9'}
        </p>
      )}
    </button>
  );
}

function FriendsList({
  searchedFriend,
  requests,
  friendsListSection,
  friends,
  displayAddFriendsModal,
  functions,
}: {
  searchedFriend: string | null;
  requests: Friend[];
  friendsListSection: string;
  friends: Friend[];
  displayAddFriendsModal: boolean;
  functions: {
    closeAddFriendsModal: () => void;
    openAddFriendsModal: () => void;
    acceptFriendRequest: (sentRequest: Friend) => Promise<void>;
    ingnoreFriendRequest: (sentRequest: Friend) => Promise<void>;
    goToChat: (friend: Friend) => Promise<void>;
    sendMessage: (e: React.FormEvent) => void;
    goToFriendsList: () => void;
    setCurrentFriendsListSection: (e: any) => void;
    setCurrentSearchedFriend: (e: any) => void;
  };
}) {
  return (
    <div className='dark:bg-inherit flex flex-col h-full overflow-y-auto relative'>
      <div className='bg-inherit py-4 px-8 border-x-0 border-t-0 border-b border-solid dark:border-grey-600 border-grey-200 w-full mx-auto flex gap-4'>
        <FriendsNavButton
          friendsListSection={friendsListSection}
          handler={functions.setCurrentFriendsListSection}
        >
          All
        </FriendsNavButton>
        <FriendsNavButton
          friendsListSection={friendsListSection}
          handler={functions.setCurrentFriendsListSection}
          valueAsNotification={requests}
        >
          Requests
        </FriendsNavButton>
        <button
          onClick={functions.openAddFriendsModal}
          className='border-none bg-lime-green-200 text-lime-green-800 rounded-lg px-2 py-1 text-xl font-semibold cursor-pointer dark:bg-lime-green-600 dark:text-white duration-300 hover:bg-lime-green-300 dark:hover:bg-lime-green-700'
        >
          Add friend
        </button>
      </div>
      {displayAddFriendsModal && (
        <AddFriendsModal
          closeAddFriendsModal={functions.closeAddFriendsModal}
        />
      )}
      <div className='flex flex-col px-4 pt-4 dark:text-grey-100 h-full'>
        {friends.length > 0 && friendsListSection === 'All' && (
          <input
            onChange={functions.setCurrentSearchedFriend}
            className={`bg-lime-green-100 dark:bg-grey-800 dark:text-grey-100 rounded mb-2 border-none py-1 px-2 text-base w-full focus:outline-none`}
            placeholder='Search friend'
          />
        )}

        {friends.length > 0 &&
          friendsListSection === 'All' &&
          friends
            .sort((a, b) => {
              if (
                a.displayName.toLowerCase() <
                b.displayName.toLowerCase()
              )
                return -1;

              if (
                a.displayName.toLowerCase() >
                b.displayName.toLowerCase()
              )
                return 1;

              return 0;
            })
            .map((friend) => {
              if (
                searchedFriend &&
                !friend.displayName
                  .toLowerCase()
                  .includes(searchedFriend.toLowerCase())
              )
                return;

              return (
                <div
                  onClick={() => functions.goToChat(friend)}
                  key={friend.uid}
                  className={`flex items-center gap-4 
                hover:bg-orange-100 px-2 py-2 rounded duration-300 cursor-pointer dark:hover:bg-grey-600`}
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
        {requests.length > 0 &&
          friendsListSection === 'Requests' &&
          requests.map((request) => {
            console.log(request);

            return (
              <ChatRequest
                key={request.uid}
                handlers={{
                  acceptFriendRequest: functions.acceptFriendRequest,
                  ingnoreFriendRequest:
                    functions.ingnoreFriendRequest,
                }}
                request={request}
              />
            );
          })}
        {requests.length === 0 &&
          friendsListSection === 'Requests' && (
            <h5 className='absolute text-4xl text-yellow-600 dark:text-yellow-500 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
              There are no requests yet
            </h5>
          )}
        {friends.length === 0 && friendsListSection === 'All' && (
          <h5 className='absolute text-4xl text-yellow-600 dark:text-yellow-500 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
            There&apos;s noone there...
          </h5>
        )}
      </div>
    </div>
  );
}

export default FriendsList;

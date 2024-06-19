import ProfileIcon from '@/components/Profile/ProfileIcon';
import { WholeState } from '@/types';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

function FriendsList({
  setCurrentSearchedFriend,
  goToChat,
  deleteFriend,
}) {
  const currentFriendListSecton = useSelector(
    (state: WholeState) => state.chat.currentFriendListSecton
  );
  const searchedFriend = useSelector(
    (state: WholeState) => state.chat.searchedFriend
  );
  const myFriends = useSelector(
    (state: WholeState) => state.chat.myFriends
  );

  return (
    <>
      {myFriends.length > 0 && currentFriendListSecton === 'All' && (
        <input
          onChange={setCurrentSearchedFriend}
          className={`bg-orange-vivid-100  dark:bg-cool-grey-800 dark:text-cool-grey-100 rounded mb-4 border-none py-1 px-2 text-base w-full focus:outline-none`}
          placeholder='Search friend'
        />
      )}
      {myFriends.length > 0 &&
        currentFriendListSecton === 'All' &&
        myFriends.map((friend) => {
          if (
            searchedFriend &&
            !friend.displayName
              .toLowerCase()
              .includes(searchedFriend.toLowerCase())
          )
            return;

          return (
            <>
              <div
                onClick={(e) => goToChat(e, friend)}
                key={friend.uid}
                className='flex items-center justify-between hover:bg-orange-vivid-100 px-2 py-2 rounded duration-300 cursor-pointer dark:hover:bg-cool-grey-600'
              >
                <div
                  onClick={() => goToChat(null, friend)}
                  className='flex items-center gap-4'
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
                <div className='flex gap-3'>
                  <button
                    onClick={() => goToChat(null, friend)}
                    className='border-none w-8 h-8 rounded-full [&_ion-icon]:w-5 [&_ion-icon]:h-5 cursor-pointer bg-orange-vivid-300 hover:bg-orange-vivid-400 duration-300 '
                  >
                    <ion-icon name='chatbox' />
                  </button>
                  <button
                    data-tooltip-id='friend-info'
                    className='border-none w-8 h-8 rounded-full [&_ion-icon]:w-5 [&_ion-icon]:h-5 cursor-pointer bg-orange-vivid-300 hover:bg-orange-vivid-400 duration-300'
                  >
                    <ion-icon name='ellipsis-vertical' />
                  </button>
                </div>
              </div>
              <Tooltip id='friend-info' clickable openOnClick>
                <button
                  onClick={() => deleteFriend(friend)}
                  className='border-none bg-inherit text-lg text-red-400 hover:bg-red-400 dark:hover:text-red-50 hover:text-red-50 px-2 py-1 cursor-pointer'
                >
                  Delete friend
                </button>
              </Tooltip>
            </>
          );
        })}

      {myFriends.length === 0 &&
        currentFriendListSecton === 'All' && (
          <h5 className='absolute text-4xl text-cool-grey-800 dark:text-white top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
            There&apos;s noone there...
          </h5>
        )}
    </>
  );
}

export default FriendsList;

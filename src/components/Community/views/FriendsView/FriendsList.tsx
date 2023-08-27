import ProfileIcon from '@/components/Profile/ProfileIcon';
import { WholeState } from '@/types';
import { useSelector } from 'react-redux';

function FriendsList({ setCurrentSearchedFriend, goToChat }) {
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
          className={`bg-lime-green-100 dark:bg-grey-800 dark:text-grey-100 rounded mb-4 border-none py-1 px-2 text-base w-full focus:outline-none`}
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
            <div
              onClick={() => goToChat(friend)}
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

      {myFriends.length === 0 &&
        currentFriendListSecton === 'All' && (
          <h5 className='absolute text-4xl text-yellow-600 dark:text-yellow-500 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
            There&apos;s noone there...
          </h5>
        )}
    </>
  );
}

export default FriendsList;

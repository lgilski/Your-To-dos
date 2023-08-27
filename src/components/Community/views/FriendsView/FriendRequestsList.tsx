import { WholeState } from '@/types';
import { useSelector } from 'react-redux';
import FriendRequest from './FriendRequest';

function FriendRequestsList({
  acceptFriendRequest,
  ingnoreFriendRequest,
}) {
  const myRequests = useSelector(
    (state: WholeState) => state.chat.myRequests
  );
  const currentFriendListSecton = useSelector(
    (state: WholeState) => state.chat.currentFriendListSecton
  );

  console.log(myRequests);

  return (
    <>
      {myRequests.length > 0 &&
        currentFriendListSecton === 'Requests' &&
        myRequests.map((request) => {
          return (
            <FriendRequest
              key={request.uid}
              handlers={{
                acceptFriendRequest: acceptFriendRequest,
                ingnoreFriendRequest: ingnoreFriendRequest,
              }}
              request={request}
            />
          );
        })}
      {myRequests.length === 0 &&
        currentFriendListSecton === 'Requests' && (
          <h5 className='absolute text-4xl text-yellow-600 dark:text-yellow-500 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
            There are no requests yet
          </h5>
        )}
    </>
  );
}

export default FriendRequestsList;

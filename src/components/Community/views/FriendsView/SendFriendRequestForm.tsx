import { auth } from '@/config/firebase';
import { WholeState } from '@/types';
import {
  child,
  get,
  getDatabase,
  ref,
  update,
} from 'firebase/database';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function SendFriendRequestForm() {
  const currentFriendListSecton = useSelector(
    (state: WholeState) => state.chat.currentFriendListSecton
  );

  const addingUser = auth.currentUser;

  const sendRequest = async function (e: React.FormEvent) {
    console.log('Trying to send request');

    e.preventDefault();

    const db = getDatabase();
    const addingUserData = await get(
      child(ref(db), 'usersPublicData/' + addingUser?.uid)
    );
    const users = await get(child(ref(db), 'usersPublicData'));

    users.forEach(function (user: any) {
      if (
        user.val().userName === e.target[0].value &&
        user.val().uid !== addingUser?.uid &&
        !addingUserData
          .val()
          .friends?.find((friend) => friend.uid === user.val().uid)
      ) {
        get(
          child(ref(db), 'usersPublicData/' + user.key + '/requests')
        )
          .then((snapshot) => {
            let alreadySent;

            snapshot.forEach((request) => {
              if (request.val().uid === addingUserData.val().uid) {
                alreadySent = true;
              }
            });

            let otherRequests = snapshot.val();
            if (!otherRequests) {
              otherRequests = [];
            }

            if (alreadySent) return;

            update(ref(db, 'usersPublicData/' + user.key), {
              requests: [
                {
                  uid: addingUser!.uid,
                },
                ...otherRequests,
              ],
            });

            toast.success('Friend request has been sent.', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
          })
          .catch(() => console.log('bozo'));
      }
    });
  };

  return (
    <>
      {currentFriendListSecton === 'Add friend' && (
        <form onSubmit={sendRequest} className='flex flex-col'>
          <h5 className='text-2xl font-medium'>Add friend</h5>
          <label htmlFor='sendRequest' className='mb-3 text-base'>
            Type your friend&apos;s user name to send request
          </label>
          <div className='bg-orange-vivid-050 dark:bg-cool-grey-800 px-2 py-3 rounded-lg flex justify-between w-full'>
            <input
              className='lowercase bg-inherit border-none w-full text-lg px-1 py-1 focus:outline-none dark:text-cool-grey-100'
              maxLength={32}
              placeholder="Type your friend's user name to send request"
              type='text'
              name='sendRequest'
              autoComplete='off'
            />
            <button
              type='submit'
              className='mx-2 text-lg whitespace-nowrap bg-orange-vivid-200 border-none rounded-md hover:bg-orange-vivid-300 font-medium text-orange-vivid-800 py-1 px-2 cursor-pointer duration-300'
            >
              Send friend request
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default SendFriendRequestForm;

import { auth } from '@/config/firebase';
import {
  child,
  get,
  getDatabase,
  ref,
  set,
  update,
} from 'firebase/database';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';

function AddFriendsModal({
  closeAddFriendsModal,
}: {
  closeAddFriendsModal: () => void;
}) {
  const addingUser = auth.currentUser;

  const addFriend = async function (e: React.FormEvent) {
    e.preventDefault();

    const db = getDatabase();
    const sendingUser = await get(
      child(ref(db), 'usersPublicData/' + addingUser?.uid)
    );
    const users = await get(child(ref(db), 'usersPublicData'));

    users.forEach(function (user: any) {
      if (
        user.val().userName === e.target[0].value &&
        user.val().uid !== addingUser?.uid
      ) {
        get(
          child(ref(db), 'usersPublicData/' + user.key + '/requests')
        )
          .then((snapshot) => {
            let alreadySent;

            snapshot.forEach((request) => {
              if (request.val().uid === sendingUser.val().uid) {
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
      {createPortal(
        <form
          onSubmit={addFriend}
          className='p-8 rounded flex flex-col w-96 fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-[11] bg-grey-050 dark:text-grey-100 dark:bg-grey-800'
        >
          {/* <h5 className='text-base pb-1 font-extrabold text-red-400'>
            Delete account
          </h5> */}
          <p className={`pb-8 text-lg font-medium`}>
            To add a friend type a user name.
          </p>
          {/* {error && <p className='mb-4 text-red-400'>{error}</p>} */}
          <label htmlFor='friendName'>Friend&apos;s user name</label>
          <input
            required
            // ref={passwordRef}
            autoComplete='off'
            type='text'
            id='friendName'
            name='friendName'
            className='border lowercase border-lime-green-800 bg-lime-green-100 rounded py-1 px-2 text-base mb-4'
          />
          {/* <Button
            disabled={isSubmitting}
            type='submit'
            color='OrangeLite'
            variant='Rounded'
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button> */}
        </form>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={closeAddFriendsModal}
          className='fixed top-0 left-0 z-10 w-full h-screen bg-[rgba(0,0,0,0.75)]'
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
}

export default AddFriendsModal;

import { auth } from '@/config/firebase';
import { useState } from 'react';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { getDatabase, update, ref as dbRef } from 'firebase/database';

const ProfileIcon = function ({
  settings,
  friend,
  size,
  src,
}: {
  settings?: boolean;
  friend?: boolean;
  size?: 'medium' | 'semi-medium';
  src?: string;
}) {
  const user = auth.currentUser;

  // let photo;

  // if (src) {
  //   photo = src;
  // }

  console.log(src);

  const [showDeleteImage, setShowDeleteImage] = useState(false);

  const showDeleteImageHandler = function () {
    if (settings) {
      setShowDeleteImage(true);
    }
  };

  const hideDeleteImageHandler = function () {
    if (settings) {
      setShowDeleteImage(false);
    }
  };

  const deleteProfileImage = async function () {
    const storage = getStorage();

    const imgRef = ref(storage, `images/${user!.uid}`);

    await deleteObject(imgRef);

    updateProfile(user!, {
      photoURL: '',
    });

    const db = getDatabase();
    update(dbRef(db, 'usersPublicData/' + auth!.currentUser!.uid), {
      photoURL: null,
    });

    toast.success('Image has been successfully deleted!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  return (
    <div className='relative'>
      <div
        className={`${
          settings
            ? 'w-[100px] h-[100px] min-w-[100px] min-h-[100px]'
            : size === 'medium'
            ? 'w-[48px] h-[48px] min-w-[48px] min-h-[48px]'
            : size === 'semi-medium'
            ? 'w-[40px] h-[40px] min-w-[40px] min-h-[40px]'
            : 'min-w-[32px] min-h-[32px] w-[32px] h-[32px]'
        }  block rounded-full overflow-hidden ${
          (!user?.photoURL || !src) &&
          'bg-orange-400 [&_ion-icon]:w-full [&_ion-icon]:h-full [&_ion-icon]:translate-y-[6.25%] dark:[&_ion-icon]:text-black'
        } ${(user?.photoURL || src) && 'flex justify-center'}`}
        onMouseEnter={showDeleteImageHandler}
        onMouseLeave={hideDeleteImageHandler}
      >
        {!user?.photoURL || (friend && !src) ? (
          <ion-icon name='person' />
        ) : (
          <>
            <img
              className={`object-cover inline-block w-full h-full`}
              src={src ? src?.toString() : user?.photoURL}
            />
            {showDeleteImage && user!.photoURL && (
              <button
                className='border-none cursor-pointer absolute rounded-full p-1 bg-red-200 text-red-800 leading-none w-8 h-8 [&_ion-icon]:w-6 [&_ion-icon]:h-6 [&_ion-icon]:align-middle right-0 top-0 duration-300 hover:bg-red-300'
                onClick={deleteProfileImage}
              >
                <ion-icon name='close-outline' />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileIcon;

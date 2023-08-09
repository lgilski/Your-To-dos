import ProfileIcon from '@/components/Profile/ProfileIcon';
import ChangeNames from '../ChangeNames/ChangeNames';
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  ref,
} from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '@/config/firebase';

function SectionWithImg() {
  const user = auth.currentUser;

  const storage = getStorage();

  const storageRef = ref(storage, `images/${user!.uid}`);
  const submitImage = async function (e: any) {
    try {
      toast.info('Image has been sent', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      await uploadBytes(storageRef, e.target.files[0]);
      const url = await getDownloadURL(storageRef);

      updateProfile(user!, {
        photoURL: url,
      });

      toast.success('Image has been successfully uploaded!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (err) {
      if (err instanceof Error) {
        new Error(err.message);
      }
    }
  };

  return (
    <div className='mt-4 flex justify-between mb-8'>
      <div className='w-[150px] flex flex-col items-center'>
        <ProfileIcon settings={true} />
        <form className='mt-3'>
          <label
            htmlFor='img'
            className='text-sm text-lime-green-900 p-1 bg-lime-green-200 duration-300 hover:bg-lime-green-300 cursor-pointer rounded'
          >
            Choose image
          </label>
          <input
            type='file'
            id='img'
            name='img'
            accept='image/*'
            hidden
            onChange={submitImage}
          />
        </form>
        <p className='text-xs text-center text-grey-400 mt-2'>
          Best resolution is 360x360
        </p>
      </div>
      <ChangeNames />
    </div>
  );
}

export default SectionWithImg;

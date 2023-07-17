import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { redirect } from 'react-router-dom';
// import { toast } from 'react-toastify';

export async function action() {
  try {
    await signOut(auth);
    localStorage.removeItem('cards');

    // toast.info('You have been logged out.', {
    //   position: 'top-center',
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: 'dark',
    // });

    return redirect('/');
  } catch (err: any) {
    new Error(err);
  }
}

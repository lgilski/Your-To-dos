import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { redirect } from 'react-router-dom';

export async function action() {
  try {
    await signOut(auth);
    // localStorage.removeItem('token');
    // localStorage.removeItem('uid');
    // localStorage.removeItem('expiration');
    localStorage.removeItem('cards');

    return redirect('/');
  } catch (err) {
    console.log(err);
  }
}

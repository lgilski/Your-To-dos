import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { redirect } from 'react-router-dom';

export async function action() {
  console.log('removed!!!');
  await signOut(auth);
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('expiration');
  localStorage.removeItem('cards');

  return redirect('/');
}

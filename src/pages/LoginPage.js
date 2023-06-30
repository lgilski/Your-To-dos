import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthForm from '../components/UI/AuthForm/AuthForm';
import { auth } from '../config/firebase';
import { json, redirect } from 'react-router-dom';
import { getCardsData } from '../api/api';

function LoginPage() {
  return <AuthForm mode='login' />;
}

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    passwordRepeat: data.get('passwordRepeat'),
  };

  if (authData.password.length < 6) {
    return { message: 'Password must be at least 6 characters long' };
  }

  try {
    const response = await signInWithEmailAndPassword(
      auth,
      authData.email,
      authData.password
    );

    if (
      response.status === 422 ||
      response.status === 401 ||
      response.status === 400
    ) {
      return response;
    }

    const responseToken = await response.user.getIdToken();

    const uid = response.user.uid;

    localStorage.setItem('token', responseToken);
    localStorage.setItem('uid', uid);
    const expiration = new Date();

    expiration.setHours(expiration.getHours() + 12);
    localStorage.setItem('expiration', expiration.toISOString());

    const cardsData = await getCardsData(uid);

    localStorage.setItem('cards', JSON.stringify(cardsData));

    return redirect('/');
  } catch (err) {
    console.log('eeeeerrror', err.message);
    if (
      err.message === 'Firebase: Error (auth/wrong-password).' ||
      err.message === 'Firebase: Error (auth/user-not-found).'
    ) {
      return { message: 'Incorrect email or password' };
    }
    return { message: err.message };
    // throw json({ message: err.message });
  }
}

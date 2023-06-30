import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/UI/AuthForm/AuthForm';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/firebase';

function SignupPage() {
  return <AuthForm mode='signup' />;
}

export default SignupPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    passwordRepeat: data.get('passwordRepeat'),
  };

  if (mode === 'signup') {
    if (authData.password.length < 6) {
      return { message: 'Password must be at least 6 characters long' };
    } else if (authData.passwordRepeat !== authData.password) {
      return { message: 'Passwords are incorrect' };
    }

    // try {
    const response = await createUserWithEmailAndPassword(
      auth,
      authData.email,
      authData.password
    );

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    console.log(await response.user.getIdToken());

    const responseToken = await response.user.getIdToken();

    localStorage.setItem('token', responseToken);
    localStorage.setItem('email', authData.email);
    const expiration = new Date();

    expiration.setHours(expiration.getHours() + 12);
    localStorage.setItem('expiration', expiration.toISOString());
    // } catch (err) {
    //   console.error('******ERROR******');
    //   console.error(err.message);
    //   throw json({ message: err.message });
    // }

    const cardsResponse = await fetch(
      `https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/data/${authData.email
        .split('.')
        .join('-')}/cards.json`
    );

    const cardsData = await cardsResponse.json();

    console.log(cardsData);

    localStorage.setItem('cards', cardsData);
  }

  if (mode === 'login') {
    // if (authData.password.length() < 6) {
    //   return { message: 'Password must be at least 6 characters long' };
    // }

    // try {
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

    // console.log(await response.user.getIdToken());

    const responseToken = await response.user.getIdToken();

    localStorage.setItem('token', responseToken);
    localStorage.setItem('email', authData.email);
    const expiration = new Date();

    expiration.setHours(expiration.getHours() + 12);
    localStorage.setItem('expiration', expiration.toISOString());
    // } catch (err) {
    //   console.error(err.message);
    //   throw json({ message: err.message });
    // }

    const cardsResponse = await fetch(
      `https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/${authData.email
        .split('.')
        .join('-')}/cards.json`
    );

    // console.log(cardsResponse);

    const cardsData = await cardsResponse.json();
    // const cardsData = JSON.parse(cardsResponse);

    // console.log(cardsData);

    localStorage.setItem('cards', JSON.stringify(cardsData));
  }

  return redirect('/');
}

import { redirect } from 'react-router-dom';
import AuthForm from '../components/UI/AuthForm/AuthForm';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/firebase';

function SignupPage() {
  return <AuthForm mode='signup' />;
}

export default SignupPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    passwordRepeat: data.get('passwordRepeat'),
  };

  if (authData.password.length < 6) {
    return { message: 'Password must be at least 6 characters long' };
  } else if (authData.passwordRepeat !== authData.password) {
    return { message: 'Passwords are incorrect' };
  }

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      authData.email.trim(),
      authData.password
    );

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    await sendEmailVerification(auth.currentUser);

    console.log(auth.currentUser.emailVerified);
    // const responseToken = await response.user.getIdToken();

    // const uid = response.user.uid;

    // localStorage.setItem('token', responseToken);
    // localStorage.setItem('uid', uid);
    // const expiration = new Date();

    // expiration.setHours(expiration.getHours() + 12);
    // localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/');
  } catch (err) {
    console.log(err);

    return { message: err.message };
  }
}

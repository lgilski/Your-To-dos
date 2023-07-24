import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthForm from '../components/UI/AuthForm/AuthForm';
import { auth } from '../config/firebase';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage() {
  return <AuthForm mode='login' />;
}

export default LoginPage;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    passwordRepeat: data.get('passwordRepeat'),
  };

  if (authData.password!.length < 6) {
    return { message: 'Password must be at least 6 characters long' };
  }

  try {
    await signInWithEmailAndPassword(
      auth,
      authData.email!.toString(),
      authData.password!.toString()
    );

    // if (
    //   response.status === 422 ||
    //   response.status === 401 ||
    //   response.status === 400
    // ) {
    //   return response;
    // }

    if (!auth.currentUser?.emailVerified) {
      return { message: 'Email must be verified.' };
    }

    toast.success('Successfully logged in!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    return redirect('/app/cards');
  } catch (err) {
    if (err instanceof Error) {
      if (
        err.message === 'Firebase: Error (auth/wrong-password).' ||
        err.message === 'Firebase: Error (auth/user-not-found).'
      ) {
        return { message: 'Incorrect email or password.' };
      }
      return { message: err.message };
    }
  }
}

import { redirect } from 'react-router-dom';
import AuthForm from '../components/UI/AuthForm/AuthForm';
import {
  createUserWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

function SignupPage() {
  return <AuthForm mode='signup' />;
}

export default SignupPage;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    passwordRepeat: data.get('passwordRepeat'),
  };

  if (authData.password!.length < 6) {
    return { message: 'Password must be at least 6 characters long' };
  } else if (authData.passwordRepeat !== authData.password) {
    return { message: 'Passwords are incorrect' };
  }

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      authData.email!.toString().trim(),
      authData.password!.toString()
    );

    console.log(response);

    // if (response.status === 422 || response.status === 401) {
    //   return response;
    // }

    await sendEmailVerification(auth.currentUser!);

    toast.success('Verification email has been sent.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    return redirect('/');
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
  }
}

import { redirect } from 'react-router-dom';
import ForgotPasswordForm from '../components/UI/ForgotPasswordForm/ForgotPasswordForm';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
// import { toast } from 'react-toastify';

function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}

export default ForgotPasswordPage;

export async function action({ request }: { request: Request }) {
  try {
    const data = await request.formData();

    const email = data.get('email');

    if (email) {
      sendPasswordResetEmail(auth, email.toString());

      // toast.success('Reset password email has been sent.', {
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
    }
  } catch (err: any) {
    new Error(err);
  }
}

import { redirect } from 'react-router-dom';
import ForgotPasswordForm from '../components/UI/ForgotPasswordForm/ForgotPasswordForm';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

// type,
//     name,
//     required = false,
//     text,
//     color,
//     down = false,
//     noMargin,

function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}

export default ForgotPasswordPage;

export async function action({ request }) {
  try {
    const data = await request.formData();

    const email = data.get('email');

    sendPasswordResetEmail(auth, email);

    return redirect('/');
  } catch (err) {}
}

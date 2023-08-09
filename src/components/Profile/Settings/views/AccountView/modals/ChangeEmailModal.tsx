import Button from '@/components/common/Button/Button';
import { auth } from '@/config/firebase';
import {
  reauthenticateWithCredential,
  updateEmail,
  EmailAuthProvider,
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';

function ChangeEmailModal({
  hideChangeEmailModal,
}: {
  hideChangeEmailModal: () => void;
}) {
  const [isReauthenticated, setIsReauthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = auth.currentUser;

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const newEmailRef = useRef<HTMLInputElement | null>(null);

  async function checkCredentials(
    e: React.FormEvent<HTMLFormElement>
  ) {
    try {
      e.preventDefault();

      const credential = EmailAuthProvider.credential(
        user!.email!,
        passwordRef.current!.value
      );

      setIsSubmitting(true);

      const result = await reauthenticateWithCredential(
        user!,
        credential
      );

      if (result) {
        setError(null);
        setIsSubmitting(false);
        setIsReauthenticated(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setIsSubmitting(false);
      }
    }
  }

  async function updateEmailHandler(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await updateEmail(user!, newEmailRef.current!.value);

    toast.success('Message has been sent to the original email!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    hideChangeEmailModal();
  }

  return (
    <>
      {createPortal(
        <>
          {!isReauthenticated && (
            <form
              onSubmit={checkCredentials}
              className='p-8 rounded flex flex-col w-96 fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-[11] bg-grey-050 dark:text-grey-100 dark:bg-grey-800'
            >
              <h5 className='text-base pb-1 font-extrabold'>
                Change email
              </h5>
              <p
                className={`${
                  error ? 'pb-4' : 'pb-8'
                } text-lg font-medium`}
              >
                To be able to change your current email please
                reauthenticate.
              </p>
              {error && <p className='mb-4 text-red-400'>{error}</p>}
              <label htmlFor='password'>Provide your password</label>
              <input
                required
                ref={passwordRef}
                type='password'
                id='password'
                name='password'
                className='border border-lime-green-800 bg-lime-green-100 rounded py-1 px-2 text-base mb-4'
              />
              <Button
                disabled={isSubmitting}
                type='submit'
                color='OrangeLite'
                variant='Rounded'
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          )}
          {isReauthenticated && (
            <form
              onSubmit={updateEmailHandler}
              className='p-8 rounded flex flex-col w-96 fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-[11] bg-grey-050 dark:text-grey-100 dark:bg-grey-800'
            >
              <h5 className='text-base pb-1 font-extrabold'>
                Change email
              </h5>
              <p className='pb-8 text-lg font-medium'>
                After submiting the new email address the confirmation
                message will be send to the original one.
              </p>
              <label htmlFor='email'>Provide new email address</label>
              <input
                required
                ref={newEmailRef}
                type='email'
                id='email'
                name='email'
                className='border border-lime-green-800 bg-lime-green-100 rounded py-1 px-2 text-base mb-4'
              />
              <Button
                type='submit'
                color='OrangeLite'
                variant='Rounded'
              >
                Change email
              </Button>
            </form>
          )}
        </>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={hideChangeEmailModal}
          className='fixed top-0 left-0 z-10 w-full h-screen bg-[rgba(0,0,0,0.75)]'
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
}

export default ChangeEmailModal;

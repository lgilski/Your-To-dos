import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/common/Button/Button';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { toast } from 'react-toastify';

function ChangePasswordModal({
  hideChangePasswordModal,
}: {
  hideChangePasswordModal: () => void;
}) {
  const user = auth.currentUser;

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);

  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      if (
        repeatPasswordRef.current?.value !==
        passwordRef.current?.value
      ) {
        throw new Error('Passwords are not the same');
      }

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
        await updatePassword(user!, newPasswordRef.current!.value);
        toast.success('Your password has been changed!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setError(null);
        setIsSubmitting(false);
        hideChangePasswordModal();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setIsSubmitting(false);
      }
    }
  }

  return (
    <>
      {createPortal(
        <form
          onSubmit={changePassword}
          className='p-8 rounded flex flex-col w-96 fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-[11] bg-grey-050 dark:text-grey-100 dark:bg-grey-800'
        >
          <h5 className='text-base pb-1 font-extrabold'>
            Change password
          </h5>
          <p
            className={`${
              error ? 'pb-4' : 'pb-8'
            } text-lg font-medium`}
          >
            To change password provide your current password and the
            new one.
          </p>
          {error && <p className='mb-4 text-red-400'>{error}</p>}
          <label htmlFor='password'>
            Provide your current password
          </label>
          <input
            required
            ref={passwordRef}
            type='password'
            id='password'
            name='password'
            className='border border-lime-green-800 bg-lime-green-100 rounded py-1 px-2 text-base mb-4'
          />
          <label htmlFor='repeatPassword'>
            Repeat your current password
          </label>
          <input
            required
            ref={repeatPasswordRef}
            type='password'
            id='repeatPassword'
            name='repeatPassword'
            className='border border-lime-green-800 bg-lime-green-100 rounded py-1 px-2 text-base mb-4'
          />
          <label htmlFor='newPassword'>Provide new password</label>
          <input
            required
            ref={newPasswordRef}
            type='password'
            id='newPassword'
            name='newPassword'
            className='border border-lime-green-800 bg-lime-green-100 rounded py-1 px-2 text-base mb-4'
          />
          <Button
            disabled={isSubmitting}
            type='submit'
            color='OrangeLite'
            variant='Rounded'
          >
            {isSubmitting ? 'Changing...' : 'Change password'}
          </Button>
        </form>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={hideChangePasswordModal}
          className='fixed top-0 left-0 z-10 w-full h-screen bg-[rgba(0,0,0,0.75)]'
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
}

export default ChangePasswordModal;

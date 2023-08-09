import Button from '@/components/common/Button/Button';
import { auth } from '@/config/firebase';
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DeleteAccountModal({
  hideDeleteAccountModal,
}: {
  hideDeleteAccountModal: () => void;
}) {
  const email = auth.currentUser!.email;
  const user = auth.currentUser;

  const navigate = useNavigate();

  const [isReauthenticated, setIsReauthenticated] = useState(false);
  const [proceeded, setProceeded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const deleteUserAccount = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    try {
      e.preventDefault();
      setError(null);

      if (emailRef.current?.value !== email) {
        throw new Error('Email is incorrect.');
      }
      setIsSubmitting(true);

      await deleteProfileImage();
      await deleteUser(user!);

      toast.success('Account has been successfully deleted.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      setIsSubmitting(false);
      hideDeleteAccountModal();
      localStorage.removeItem('favorite');
      localStorage.removeItem('weather');
      localStorage.removeItem('timers');
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setIsSubmitting(false);
      }
    }
  };

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

  const deleteProfileImage = async function () {
    const storage = getStorage();

    const imgRef = ref(storage, `images/${user!.uid}`);

    await deleteObject(imgRef);
  };

  return (
    <>
      {createPortal(
        <>
          {!proceeded && (
            <div className='p-8 rounded flex flex-col w-80 fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-[11] bg-grey-050 dark:text-grey-100 dark:bg-grey-800'>
              <h5 className='text-base text-red-400 pb-1 font-extrabold'>
                Delete account
              </h5>
              <p className={`pb-8 text-lg font-medium`}>
                Here you are going to delete your account. Do you want
                to proceed?
              </p>
              <div className='flex gap-4 w-full justify-center'>
                <button
                  onClick={hideDeleteAccountModal}
                  className='border-none rounded text-2xl font-semibold py-2 px-4 bg-red-100 text-red-800 cursor-pointer hover:bg-red-200 duration-300'
                >
                  Cancle
                </button>
                <button
                  onClick={() => setProceeded(true)}
                  className='border-none rounded text-2xl font-semibold py-2 px-4 bg-red-400 text-red-50 cursor-pointer hover:bg-red-500 duration-300'
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          {!isReauthenticated && proceeded && (
            <form
              onSubmit={checkCredentials}
              className='p-8 rounded flex flex-col w-96 fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-[11] bg-grey-050 dark:text-grey-100 dark:bg-grey-800'
            >
              <h5 className='text-base pb-1 font-extrabold text-red-400'>
                Delete account
              </h5>
              <p
                className={`${
                  error ? 'pb-4' : 'pb-8'
                } text-lg font-medium`}
              >
                To be able to delete your account please
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
              onSubmit={deleteUserAccount}
              className='p-8 rounded flex flex-col w-96 fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-[11] bg-grey-050 dark:text-grey-100 dark:bg-grey-800'
            >
              <h5 className='text-base pb-1 font-extrabold text-red-400'>
                Delete account
              </h5>
              <p className={`pb-4 text-lg font-medium`}>
                This action will permanently delete your account with
                all data. That means all cards, timers and wether
                cards will be deleted. This can&apos;t be undone.
              </p>
              <p className='pb-4 text-lg font-medium'>
                Please type your email to confirm.
              </p>
              {error && <p className='mb-4 text-red-400'>{error}</p>}
              <label htmlFor='email'>Type email</label>
              <input
                required
                ref={emailRef}
                placeholder={email!}
                type='email'
                id='email'
                name='email'
                className='border border-red-800 bg-red-100 rounded py-1 px-2 text-base mb-4'
              />
              <div className='flex flex-col gap-2'>
                <button
                  type='submit'
                  className='py-2 px-4 text-2xl rounded border-none text-red-50 bg-red-400 hover:bg-red-500 duration-300 cursor-pointer'
                >
                  Delete my account
                </button>
                <button
                  onClick={() => {
                    setProceeded(false);
                    hideDeleteAccountModal();
                  }}
                  type='button'
                  className='py-2 px-4 text-2xl rounded border-none duration-300 cursor-pointer text-red-800 bg-red-100 hover:bg-red-200'
                >
                  Cancle
                </button>
              </div>
            </form>
          )}
        </>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={hideDeleteAccountModal}
          className='fixed top-0 left-0 z-10 w-full h-screen bg-[rgba(0,0,0,0.75)]'
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
}

export default DeleteAccountModal;

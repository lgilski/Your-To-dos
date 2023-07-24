import {
  Form,
  Link,
  useNavigate,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import Input from '../../common/Input/Input';
import { useEffect } from 'react';
import { auth } from '../../../config/firebase';
import Button from '../../common/Button/Button';

function AuthForm({ mode }: { mode?: string }) {
  const data = useActionData() as {
    message?: string;
  };
  const navigation = useNavigation();
  const navigate = useNavigate();

  const user = auth.currentUser;

  const isSubmitting = navigation.state === 'submitting';
  const isLogin = mode === 'login';

  useEffect(() => {
    if (user) {
      navigate('/app/cards');
    }
  }, [user, navigate]);

  return (
    <div className='max-w-[1200px] mt-16 mx-auto mb-20'>
      {!user && (
        <Form
          method='post'
          className='flex flex-col items-start max-w-[450px] p-6 mt-16 mx-auto text-grey-900 border border-solid border-lime-green-900 rounded-lg shadow-md'
        >
          <h4 className='mt-4 mx-auto mb-8 text-3xl'>
            {isLogin ? 'Welcome back!' : 'Start your new journey!'}
          </h4>
          {data?.message && (
            <div className='bg-red-100 w-[98%] mx-auto flex gap-3 [&_ion-icon]:w-12 [&_ion-icon]:h-12 [&_ion-icon]:text-red-300 [&_ion-icon]:ml-1 rounded mb-3'>
              <ion-icon name='alert-circle-outline' />
              <p className='text-lg self-center text-red-900'>
                {data.message}
              </p>
            </div>
          )}
          <div className='w-[98%] m-auto'>
            <Input
              color={'Green'}
              name='email'
              type='email'
              required={true}
              text={'Email'}
            />
            <Input
              color={'Green'}
              name='password'
              type='password'
              required={true}
              text={'Password'}
            />
            {!isLogin && (
              <Input
                color={'Green'}
                name={'passwordRepeat'}
                type={'password'}
                required={true}
                text={'Repeat password'}
              />
            )}
            {isLogin && (
              <div className='flex justify-end w-full text-lg'>
                {/* <div className={classes.rememberMe}>
                  <input
                    type='checkbox'
                    id='Remember me'
                    name='Remember me'
                    value='Remember me'
                  />
                  <label htmlFor='Remember me'>Remember me</label>
                </div> */}
                <Link
                  to='/auth/forgot-password'
                  className='font-semibold text-grey-700 no-underline duration-300 hover:text-lime-green-500'
                >
                  Forgot password?
                </Link>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-3 items-center w-full mt-3'>
            <Button
              color='OrangeLite'
              variant='Rounded'
              className='w-full font-bold'
            >
              {isSubmitting
                ? 'Submitting...'
                : isLogin
                ? 'LOGIN'
                : 'SIGN UP'}
            </Button>
            <Link
              // to={`?mode=${isLogin ? 'signup' : 'login'}`}
              to={`/auth/${isLogin ? 'signup' : 'login'}`}
              className='m-2 text-xl text-grey-900 no-underline duration-300 hover:text-lime-green-500'
            >
              {isLogin
                ? 'Create account'
                : 'Already have an account?'}
            </Link>
          </div>
        </Form>
      )}
    </div>
  );
}

export default AuthForm;

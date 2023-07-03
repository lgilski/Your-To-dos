import {
  Form,
  Link,
  useNavigate,
  useActionData,
  useNavigation,
  useRouteLoaderData,
} from 'react-router-dom';

import classes from './AuthForm.module.css';
import { getAuthToken, getCurrentUser } from '../../../utils/auth';
import Input from '../../common/Input/Input';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../../config/firebase';
import Button from '../../common/Button/Button';

function AuthForm({ mode }) {
  const data = useActionData();
  const navigation = useNavigation();

  const navigate = useNavigate();

  // const token = getAuthToken();

  // const user = getCurrentUser();

  // const { user } = useRouteLoaderData('root');
  // const user = useSelector(state => state.data.user);
  const user = auth.currentUser;

  const isSubmitting = navigation.state === 'submitting';
  const isLogin = mode === 'login';

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='wrapper'>
      {/* {token && (
        <div className={classes['alreadyLoggedIn-container']}>
          <h3 className={classes.alreadyLoggedIn}>
            You are already logged in.
          </h3>
          <Link to='/' className={classes.returnToHomePage}>
            Return to home page
          </Link>
        </div>
      )} */}
      {!user && (
        <Form method='post' className={classes.authForm}>
          <h4>{isLogin ? 'Welcome back!' : 'Start your new journey!'}</h4>
          {data && data.error && (
            <ul>
              {Object.values(data.errors).map(err => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          <div className={classes.inputsWrapper}>
            <Input
              color={'green'}
              name='email'
              type='email'
              required={true}
              text={'Email'}
            />
            <Input
              color={'green'}
              name='password'
              type='password'
              required={true}
              text={'Password'}
            />
            {!isLogin && (
              <Input
                color={'green'}
                name={'passwordRepeat'}
                type={'password'}
                required={true}
                text={'Repeat password'}
              />
            )}
            {isLogin && (
              <div className={classes.otherOptions}>
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
                  className={classes.forgotPassword}
                >
                  Forgot password?
                </Link>
              </div>
            )}
          </div>
          <div className={classes['auth-form--buttons']}>
            <Button
              color='orangeLite'
              variant='roundedSquare'
              className={classes['auth-form-submit']}
            >
              {isSubmitting ? 'Submitting...' : isLogin ? 'LOGIN' : 'SIGN UP'}
            </Button>
            <Link
              // to={`?mode=${isLogin ? 'signup' : 'login'}`}
              to={`/auth/${isLogin ? 'signup' : 'login'}`}
              className={classes['auth-form--link']}
            >
              {isLogin ? 'Create account' : 'Already have an account?'}
            </Link>
          </div>
        </Form>
      )}
    </div>
  );
}

export default AuthForm;

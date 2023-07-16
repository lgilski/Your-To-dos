import {
  Form,
  Link,
  useNavigate,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';
import Input from '../../common/Input/Input';
import { useEffect } from 'react';
import { auth } from '../../../config/firebase';
import Button from '../../common/Button/Button';

function AuthForm({ mode }: { mode?: string }) {
  const data = useActionData() as { errors?: string; message?: string };
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
    <div className='wrapper'>
      {/* {token && (
        <div className={classes.alreadyLoggedInContainer}>
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
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          <div className={classes.inputsWrapper}>
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
          <div className={classes.authFormButtons}>
            <Button
              color='OrangeLight'
              variant='RoundedSquare'
              className={classes['authFormSubmit']}
            >
              {isSubmitting ? 'Submitting...' : isLogin ? 'LOGIN' : 'SIGN UP'}
            </Button>
            <Link
              // to={`?mode=${isLogin ? 'signup' : 'login'}`}
              to={`/auth/${isLogin ? 'signup' : 'login'}`}
              className={classes['authFormLink']}
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

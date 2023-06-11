import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';

import classes from './AuthForm.module.css';
import { getAuthToken } from '../../../utils/auth';
import Input from '../Input/Input';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const token = getAuthToken();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className={classes.wrapper}>
      {token && (
        <div className={classes['alreadyLoggedIn-container']}>
          <h3 className={classes.alreadyLoggedIn}>
            You are already logged in.
          </h3>
          <Link to='/' className={classes.returnToHomePage}>
            Return to home page
          </Link>
        </div>
      )}
      {!token && (
        <Form method='post' className={classes.authForm}>
          <h4>{isLogin ? 'Log in' : 'Create a new user'}</h4>
          {data && data.error && (
            <ul>
              {Object.values(data.errors).map(err => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          <Input
            color={'blue'}
            name='email'
            type='email'
            required={true}
            text={'Email'}
          />
          <Input
            color={'blue'}
            name='password'
            type='password'
            required={true}
            text={'Password'}
          />
          {!isLogin && (
            <Input
              color={'blue'}
              name={'passwordRepeat'}
              type={'password'}
              required={true}
              text={'Repeat password'}
            />
          )}
          <div className={classes['auth-form--buttons']}>
            <button className={classes['auth-form-submit']}>
              {isSubmitting ? 'Submitting...' : isLogin ? 'Log in' : 'Sign up'}
            </button>
            <Link
              to={`?mode=${isLogin ? 'signup' : 'login'}`}
              className={classes['auth-form--link']}
            >
              {isLogin ? 'Create account' : 'Log in'}
            </Link>
          </div>
        </Form>
      )}
    </div>
  );
}

export default AuthForm;

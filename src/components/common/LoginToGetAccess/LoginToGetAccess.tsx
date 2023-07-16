import { Link } from 'react-router-dom';

import classes from './LoginToGetAccess.module.css';

function LoginToGetAccess() {
  return (
    <section className={classes.wrapper}>
      <div className={classes.loginToGetAccess}>
        Log in to get access to your cards.
      </div>
      <div className={classes.textContainer}>
        <h2 className={classes['cardsH2']}>Don&apos;t have an account?</h2>
        <Link to='/auth?mode=signup' className={classes.signup}>
          Sing up now
        </Link>
      </div>
    </section>
  );
}

export default LoginToGetAccess;

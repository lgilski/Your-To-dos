import { Link } from 'react-router-dom';

import classes from './Hero.module.css';
import { auth } from '../../../config/firebase';

function Hero() {
  const user = auth.currentUser;

  // max-width: 540px;
  // margin: 16px 0;
  // font-size: var(--heading-s);
  // font-weight: 400;
  // line-height: 160%;
  // color: var(--tint-orange-90);

  return (
    <section>
      <div className={classes.hero}>
        <div className={classes.contentContainer}>
          <div className={'max-w-[700px]'}>
            <h2 className={classes['heroTextHeading']}>
              Here you can keep all your todos and more!
            </h2>
            <p
              className={
                'max-w-[540px] my-4 leading-[160%] text-2xl text-orange-50 '
              }
            >
              We offer a really cool way of planing your to-dos. You will surely
              have a lot of fun.
            </p>
            <div className={classes.buttonsContainer}>
              <Link
                to={user ? '/cards' : '/auth/signup'}
                className={classes.mainButton}
              >
                Get started
              </Link>
              <a href='##' className={classes.secondaryButton}>
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

import { Link } from 'react-router-dom';

import classes from './Hero.module.css';

function Hero() {
  return (
    <section>
      <div className={classes.hero}>
        <div className={classes.contentContainer}>
          <div className={classes['hero-text']}>
            <h2 className={classes['hero-text-heading']}>
              Here you can keep all your todos and more!
            </h2>
            <p className={classes['hero-text-p']}>
              We offer a really cool way of planing your to-dos. You will surely
              have a lot of fun.
            </p>
            <div className={classes.buttonsContainer}>
              <Link to='/auth/signup' className={classes.mainButton}>
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

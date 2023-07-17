import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

function Footer() {
  // .logoCol {
  //   display: flex;
  //   flex-direction: column;
  // }

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={'flex flex-col'}>
          <h5 className={'mb-4 text-xl font-extrabold text-orange-400'}>
            Your To-dos <span className='text-grey-900'>and stuff UwU</span>
          </h5>
          <div className={classes.icons}>
            <Link to='#'>
              <ion-icon name='logo-instagram'></ion-icon>
            </Link>
            <Link to='#'>
              <ion-icon name='logo-facebook'></ion-icon>
            </Link>
            <Link to='#'>
              <ion-icon name='logo-twitter'></ion-icon>
            </Link>
            <Link to='#'>
              <ion-icon name='logo-youtube'></ion-icon>
            </Link>
          </div>
          {/* <p className={classes.madeBy}>
            Made by Łukasz Gilski as a cool project
          </p> */}
          <p className={classes.copyright}>
            Copyright &copy; 2023 by Your To-dos and stuff UwU, Inc. All rights
            reserved.
          </p>
        </div>
        <div className={classes['contact-col']}>
          <h6>Contact us</h6>
          <address>
            <p className={classes.address}>
              Kasztankowa 2115, 3rd Floor, Warsaw, 42-DK(p)
            </p>
            <p>
              <a href='tel:213-755-8082'>213-755-8082</a>
              <br />
              <a href='mailto:hello@yourtodos.com'>hello@yourtodos.com</a>
            </p>
          </address>
        </div>
        <nav className={classes['navCol']}>
          <h6>Account</h6>
          <ul className={classes['navColLinks']}>
            <li>
              <Link
                className={classes['navCoLinksLink']}
                to='/auth?mode=signup'
              >
                Create account
              </Link>
            </li>
            <li>
              <Link
                className={classes['navColLinksLink']}
                to='/auth?mode=login'
              >
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={classes['navCol']}>
          <h6>Company</h6>
          <ul className={classes['navColLinks']}>
            <li>
              <Link className={classes['navColLinksLink']} to='#'>
                About Your To-dos
              </Link>
            </li>
            <li>
              <Link className={classes['navColLinksLink']} to='#'>
                For Business
              </Link>
            </li>
            <li>
              <Link className={classes['navColLinksLink']} to='#'>
                Our partners
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={classes['navCol']}>
          <h6>Resources</h6>
          <ul className={classes['navColLinks']}>
            <li>
              <Link className={classes['navColLinksLink']} to='#'>
                Help center
              </Link>
            </li>
            <li>
              <Link className={classes['navColLinksLink']} to='#'>
                Privacy & terms
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

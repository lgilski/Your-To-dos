import { Form, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import Subtitle from '../Subtitle/Subtitle';
import { useMediaPredicate } from 'react-media-hook';
import NavButton from '../NavButton/NavButton';
import Button from '../Button/Button';

function MainNavigation() {
  const { token } = useRouteLoaderData('root');

  const lessThan1100 = useMediaPredicate('(max-width: 1100px)');

  return (
    <header className={classes.wrapper}>
      <Subtitle />
      <nav>
        {lessThan1100 && <ion-icon name='menu' />}
        {!lessThan1100 && (
          <ul className={classes.navList}>
            <NavButton className={classes.navListItem} to='/' end={true}>
              Home
            </NavButton>
            <NavButton className={classes.navListItem} to='/cards' end={true}>
              Cards
            </NavButton>
            <NavButton className={classes.navListItem} to='/timer' end={false}>
              Timer
            </NavButton>
            <NavButton className={classes.navListItem} to='/weather' end={true}>
              Weather
            </NavButton>
            {!token && (
              <NavButton
                className={classes.navListItem}
                to='/auth?mode=login'
                auth={true}
                end={true}
              >
                Log In
              </NavButton>
              // <li>
              //   <NavLink
              //     to='/auth?mode=login'
              //     className={({ isActive }) =>
              //       isActive ? `${classes.active}` : null
              //     }
              //     end
              //   >
              //     Log in
              //   </NavLink>
              // </li>
            )}
            {token && (
              <li>
                <Form action='/logout' method='post'>
                  <Button variant='logout' color='logout'>
                    Log out
                  </Button>
                  {/* <button
                    className={clsx(
                      // classes['navItem-auth--button'],
                      // classes['navItem-auth'],
                      classes.logout
                    )}
                  >
                    Log out
                  </button> */}
                </Form>
              </li>
            )}
            {/* <li className={classes.navListItem}>
            <NavLink
              to='/auth?mode=signup'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Singup
            </NavLink>
          </li> */}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default MainNavigation;

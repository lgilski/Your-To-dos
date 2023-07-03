import { Form, useRouteLoaderData } from 'react-router-dom';
import clsx from '../../../../utils/clsx';
import NavButton from '../../NavButton/NavButton';

import classes from './MainNavContent.module.css';
import Button from '../../../common/Button/Button';
import { useMediaPredicate } from 'react-media-hook';
import { CSSTransition } from 'react-transition-group';
import { getCurrentUser } from '../../../../utils/auth';
import { useSelector } from 'react-redux';
import { auth } from '../../../../config/firebase';
import { useEffect, useState } from 'react';

function MainNavContent({ showMobile, showMobileNav }) {
  // const { user } = useRouteLoaderData('root');
  // const user = useSelector(state => state.data.user);
  // const user = auth.currentUser;

  const [user, setUser] = useState();

  console.log(user);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  const lessThan1100 = useMediaPredicate('(max-width: 1100px)');

  return (
    <CSSTransition
      classNames={{
        enterActive: classes['fade-enter-active'],
        enter: classes['fade-enter'],
        exitActive: classes['fade-exit-active'],
        exit: classes['fade-exit'],
      }}
      timeout={300}
      in={showMobile}
    >
      <ul
        className={clsx(classes.navList, {
          [classes.mobile]: lessThan1100,
          [classes.showMobile]: showMobile,
        })}
      >
        <NavButton
          onClick={lessThan1100 ? showMobileNav : null}
          className={classes.navListItem}
          to='/'
          end={true}
        >
          Home
        </NavButton>
        <NavButton
          onClick={lessThan1100 ? showMobileNav : null}
          className={classes.navListItem}
          to='/cards'
          end={true}
        >
          Cards
        </NavButton>
        <NavButton
          onClick={lessThan1100 ? showMobileNav : null}
          className={classes.navListItem}
          to='/timer'
          end={false}
        >
          Timer
        </NavButton>
        <NavButton
          onClick={lessThan1100 ? showMobileNav : null}
          className={classes.navListItem}
          to='/weather'
          end={false}
        >
          Weather
        </NavButton>
        {!user && (
          <NavButton
            onClick={lessThan1100 ? showMobileNav : null}
            className={classes.navListItem}
            // to='/auth?mode=login'
            to='/auth/login'
            auth={true}
            end={true}
          >
            Log In
          </NavButton>
        )}
        {user && (
          <li>
            <Form action='/logout' method='post'>
              <Button
                onClick={lessThan1100 ? showMobileNav : null}
                variant='logout'
                color='logout'
              >
                Log out
              </Button>
            </Form>
          </li>
        )}
      </ul>
    </CSSTransition>
  );
}

export default MainNavContent;

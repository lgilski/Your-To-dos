import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import Subtitle from './UI/Subtitle';

function MainNavigation() {
  // const user = useSelector(state => state.user.user);

  // const token = localStorage.getItem('token');
  const { token } = useRouteLoaderData('root');

  // console.log(token);

  return (
    <header className={classes.wrapper}>
      <Subtitle />
      <nav>
        <ul className={classes.navList}>
          <li className={classes.navListItem}>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className={classes.navListItem}>
            <NavLink
              to='/cards'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Cards
            </NavLink>
          </li>
          <li className={classes.navListItem}>
            <NavLink
              to='/timer'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Timer
            </NavLink>
          </li>
          <li className={classes.navListItem}>
            <NavLink
              to='/weather'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Weather
            </NavLink>
          </li>
          {!token && (
            <li className={classes.navListItem}>
              <NavLink
                to='/auth?mode=login'
                className={({ isActive }) =>
                  isActive
                    ? `${classes.active} ${classes['navItem-auth']}`
                    : classes['navItem-auth']
                }
                end
              >
                Log in
              </NavLink>
            </li>
          )}
          {token && (
            <li className={classes.navListItem}>
              <Form action='/logout' method='post'>
                <button
                  // to='/logout'

                  // className={({ isActive }) =>
                  //   isActive
                  //     ? `${classes.active} ${classes['navItem-auth']}`
                  //     : classes['navItem-auth']
                  // }
                  className={classes['navItem-auth--button']}
                  // end
                >
                  Log out
                </button>
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
      </nav>
    </header>
  );
}

export default MainNavigation;

import classes from './AppNavigation.module.css';
import AppNavButton from '../AppNavButton/AppNavButton';
import { useState } from 'react';
import clsx from '../../../../utils/clsx';
import { useDispatch } from 'react-redux';
import { dataActions } from '../../../../store';
import { useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import { WholeState } from '@/types';

function AppNavigation() {
  const dispatch = useDispatch();

  const isSidenavOpen = useSelector(
    (state: WholeState) => state.data.isSidenavOpen
  );

  // const lessThan1100 = useMediaPredicate('(max-width: 1100px)');

  const [showHideOption, setShowHideOption] = useState(false);

  const hideSidenav = function () {
    dispatch(dataActions.isSidenavOpen());
  };

  return (
    <nav
      className={clsx(
        classes.sidenav,
        !isSidenavOpen && classes.sidenavHidden
      )}
      onMouseEnter={() => setShowHideOption(true)}
      onMouseLeave={() => setShowHideOption(false)}
    >
      {/* <p className={classes.logo}>
        Your To-dos <span>and stuff UwU</span>
      </p> */}
      <button
        onClick={hideSidenav}
        className={clsx(
          classes.hideBtn,
          showHideOption && classes.showHideBtn,
          !isSidenavOpen && classes.hideBtnOtherPosition
        )}
      >
        {isSidenavOpen && <ion-icon name='chevron-back' />}
        {!isSidenavOpen && <ion-icon name='chevron-forward' />}
      </button>
      <ul className={classes.contentWrapper}>
        <AppNavButton to='/app/cards' end={true}>
          <ion-icon name='albums' />
          <p
            className={clsx(
              classes.btnText,
              !isSidenavOpen && classes.hideBtnText
            )}
          >
            Cards
          </p>
        </AppNavButton>
        <AppNavButton to='/app/timer' end={false}>
          <ion-icon name='timer' />
          <p
            className={clsx(
              classes.btnText,
              !isSidenavOpen && classes.hideBtnText
            )}
          >
            Timers
          </p>
        </AppNavButton>
        <AppNavButton to='/app/weather' end={false}>
          <ion-icon name='partly-sunny' />
          <p
            className={clsx(
              classes.btnText,
              !isSidenavOpen && classes.hideBtnText
            )}
          >
            Weather
          </p>
        </AppNavButton>
        <li className={classes.divider} />
        <li>
          <Form action='/app/logout' method='post'>
            <button className={classes.logoutBtn}>
              <span>
                <ion-icon name='exit' />
                <p
                  className={clsx(
                    classes.btnText,
                    !isSidenavOpen && classes.hideBtnText
                  )}
                >
                  Log out
                </p>
              </span>
            </button>
          </Form>
        </li>
      </ul>
    </nav>
  );
}

export default AppNavigation;

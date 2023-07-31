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
      className={`fixed top-0 left-0 z-[1] ${
        !isSidenavOpen ? 'w-[58px]' : 'w-[200px]'
      } h-full pt-[68px] overflow-hidden text-base bg-white shadow-md duration-500 [&_ion-icon]:min-w-[24px] [&_ion-icon]:min-h-[24px] dark:[&_ion-icon]:text-grey-050 dark:bg-grey-900 dark:border-r dark:border-solid dark:border-grey-700 dark:border-y-0 dark:border-l-0`}
      onMouseEnter={() => setShowHideOption(true)}
      onMouseLeave={() => setShowHideOption(false)}
    >
      <button
        onClick={hideSidenav}
        className={clsx(
          'absolute top-[62px] right-2 flex items-center w-8 h-8 p-1 cursor-pointer bg-inherit border-none rounded opacity-0 duration-300 hover:bg-orange-100 dark:hover:bg-grey-800',
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
        <AppNavButton to='/app/stopwatch' end={false}>
          <ion-icon name='stopwatch' />
          <p
            className={clsx(
              classes.btnText,
              !isSidenavOpen && classes.hideBtnText
            )}
          >
            Stopwatch
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
            <button
              className={`cursor-pointer py-2 px-4 bg-inherit border-none w-full font-medium text-grey-700 no-underline duration-300 dark:text-grey-100 dark:hover:bg-grey-800 hover:bg-orange-100 text-base font-['Roboto']`}
            >
              <span className='flex gap-2 items-center'>
                <ion-icon name='exit' />
                <p
                  className={clsx(
                    `text-start leading-normal duration-300 h-6 whitespace-nowrap ${
                      !isSidenavOpen ? 'w-0 opacity-0' : 'w-[100px]'
                    }`
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

import classes from './AppNavigation.module.css';
import AppNavButton from '../AppNavButton/AppNavButton';
import { useState } from 'react';
import clsx from '../../../../utils/clsx';
import { useDispatch } from 'react-redux';
import { dataActions } from '../../../../store';
import { useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import { WholeState } from '@/types';
import { Tooltip } from 'react-tooltip';
import Settings from '@/components/Profile/Settings/Settings';
import ProfileCircle from '@/components/Profile/ProfileCircle';

function AppNavigation() {
  const dispatch = useDispatch();

  const isSidenavOpen = useSelector(
    (state: WholeState) => state.data.isSidenavOpen
  );
  const areSettingsOpen = useSelector(
    (state: WholeState) => state.data.areSettingsOpen
  );

  // const lessThan1100 = useMediaPredicate('(max-width: 1100px)');

  const [showHideOption, setShowHideOption] = useState(false);

  const hideSidenav = function () {
    dispatch(dataActions.isSidenavOpen());
  };

  const showSettings = function () {
    dispatch(dataActions.openSettings());
  };

  return (
    <>
      {areSettingsOpen && <Settings />}
      <Tooltip
        id='profile'
        clickable
        openOnClick
        className={classes.tooltip}
      >
        <div className='flex flex-col text-grey-900 [&_ion-icon]:min-w-[24px] [&_ion-icon]:min-h-[24px]'>
          <button
            onClick={showSettings}
            className={`cursor-pointer py-2 px-4 bg-inherit border-none w-full font-medium text-grey-900 no-underline duration-300 hover:bg-lime-green-300 text-base font-['Roboto']`}
          >
            <span className='flex gap-2 items-center'>
              <ion-icon name='cog' />
              <p
                className={clsx(
                  `text-start leading-normal duration-300 h-6 whitespace-nowrap w-[100px]`
                )}
              >
                Settings
              </p>
            </span>
          </button>
          <Form action='/app/logout' method='post'>
            <button
              className={`cursor-pointer py-2 px-4 bg-inherit border-none w-full font-medium text-grey-900 no-underline duration-300 hover:bg-lime-green-300 text-base font-['Roboto']`}
            >
              <span className='flex gap-2 items-center'>
                <ion-icon name='exit' />
                <p
                  className={clsx(
                    `text-start leading-normal duration-300 h-6 whitespace-nowrap w-[100px]`
                  )}
                >
                  Log out
                </p>
              </span>
            </button>
          </Form>
        </div>
      </Tooltip>
      <nav
        className={`fixed top-0 left-0 z-[1] flex flex-col  ${
          !isSidenavOpen ? 'w-[58px]' : 'w-[200px]'
        } h-full pt-[68px] overflow-hidden text-base bg-white shadow-md duration-500 [&_ion-icon]:min-w-[24px] [&_ion-icon]:min-h-[24px]  dark:bg-grey-900 dark:border-r dark:border-solid dark:border-grey-700 dark:border-y-0 dark:border-l-0`}
        onMouseEnter={() => setShowHideOption(true)}
        onMouseLeave={() => setShowHideOption(false)}
      >
        <button
          onClick={hideSidenav}
          className={clsx(
            'absolute top-[62px] right-2 flex items-center w-8 h-8 p-1 cursor-pointer bg-inherit border-none rounded opacity-0 duration-300 hover:bg-orange-100 dark:[&_ion-icon]:text-grey-050 dark:hover:bg-grey-800',
            showHideOption && classes.showHideBtn,
            !isSidenavOpen && classes.hideBtnOtherPosition
          )}
        >
          {isSidenavOpen && <ion-icon name='chevron-back' />}
          {!isSidenavOpen && <ion-icon name='chevron-forward' />}
        </button>
        <ul
          className={clsx(
            classes.contentWrapper,
            'dark:[&_ion-icon]:text-grey-050'
          )}
        >
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
          {/* <AppNavButton to='/app/community' end={false}>
            <ion-icon name='people' />
            <p
              className={clsx(
                classes.btnText,
                !isSidenavOpen && classes.hideBtnText
              )}
            >
              Community
            </p>
          </AppNavButton> */}
          {/* <li className={classes.divider} /> */}
        </ul>
        <div className='mt-auto w-full mb-2 flex duration-0 justify-start'>
          <ProfileCircle />
        </div>
      </nav>
    </>
  );
}

export default AppNavigation;

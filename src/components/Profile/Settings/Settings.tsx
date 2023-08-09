import { dataActions } from '@/store';
import { WholeState } from '@/types';
import clsx from '@/utils/clsx';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Account from './views/AccountView/Account';
import Billing from './views/Billing';
import Customization from './views/Customization';
import SettingsView from './views/SettingsView';
import SettingsButton from './SettingsButton/SettingsButton';
import Preferences from './views/Preferences';

function Settings({ className }: { className?: any }) {
  const dispatch = useDispatch();

  const currentSettingsPage = useSelector(
    (state: WholeState) => state.data.currentSettingsPage
  );

  return (
    <>
      {createPortal(
        <div className='z-10 grid grid-cols-[200px_1fr] w-[1000px] h-[600px] fixed top-2/4 left-2/4 bg-white -translate-y-1/2 -translate-x-2/4 rounded dark:text-grey-100 dark:bg-grey-900 shadow-lg overflow-hidden'>
          <div className='pt-4 px-1 bg-grey-050 shadow-lg dark:bg-grey-800'>
            <h5 className='pb-2 pl-2'>Account</h5>
            <ul className='list-none '>
              <SettingsButton
                icon='person-circle-outline'
                text='My account'
              />
              {/* <SettingsButton
                icon='color-palette-outline'
                text='Customization'
              /> */}
              {/* <SettingsButton
                icon='settings-outline'
                text='Settings'
              /> */}
              {/* <SettingsButton
                icon='options-outline'
                text='Preferences'
              /> */}
              {/* <SettingsButton icon='cash-outline' text='Billing' /> */}
            </ul>
          </div>
          <div className='pt-8 px-8 overflow-y-auto'>
            {currentSettingsPage === 'My account' && <Account />}
            {/* {currentSettingsPage === 'Customization' && (
              <Customization />
            )} */}
            {/* {currentSettingsPage === 'Settings' && <SettingsView />} */}
            {/* {currentSettingsPage === 'Preferences' && <Preferences />} */}
            {/* {currentSettingsPage === 'Billing' && <Billing />} */}
          </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={() => dispatch(dataActions.closeSettings())}
          className={clsx('blurElement', className)}
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
}

export default Settings;

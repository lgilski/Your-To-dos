import { auth } from '@/config/firebase';
import SettingsSectionHeader from '../SectionHeader/SettingsSectionHeader';
import SectionWithImg from './SectionWithImg/SectionWithImg';
import ChangeEmailModal from './modals/ChangeEmailModal';
import { useState } from 'react';
import ChangePasswordModal from './modals/ChangePasswordModal';
import DeleteAccountModal from './modals/DeleteAccountModal';

function Account() {
  const user = auth.currentUser;

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] =
    useState(false);

  const showChangeEmailModal = function () {
    setShowEmailModal(true);
  };

  const hideChangeEmailModal = function () {
    setShowEmailModal(false);
  };

  const showChangePasswordModal = function () {
    setShowPasswordModal(true);
  };

  const hideChangePasswordModal = function () {
    setShowPasswordModal(false);
  };

  const showDeleteAccountModalHandler = function () {
    setShowDeleteAccountModal(true);
  };

  const hideDeleteAccountModal = function () {
    setShowDeleteAccountModal(false);
  };

  return (
    <div>
      <SettingsSectionHeader>My account</SettingsSectionHeader>
      <SectionWithImg />
      <SettingsSectionHeader>Security</SettingsSectionHeader>
      <div className='mt-4 text-sm flex flex-col gap-8 mb-8'>
        <div className='flex justify-between items-center'>
          <div>
            <p>My email</p>
            <span className='text-xs text-grey-500 dark:text-grey-300 font-medium'>
              {user?.email}
            </span>
          </div>
          <button
            onClick={showChangeEmailModal}
            className='h-min border-0 rounded-lg px-2 py-1 text-base font-medium cursor-pointer text-lime-green-900 bg-lime-green-200 hover:bg-lime-green-300 duration-300'
          >
            Change email
          </button>
        </div>
        <div className='flex justify-between items-center'>
          <div>
            <p>My password</p>
            <span className='text-xs text-grey-500 dark:text-grey-300 font-medium'>
              Set password to your account
            </span>
          </div>
          <button
            onClick={showChangePasswordModal}
            className='h-min border-0 rounded-lg px-2 py-1 text-base font-medium cursor-pointer text-lime-green-900 bg-lime-green-200 hover:bg-lime-green-300 duration-300'
          >
            Change password
          </button>
        </div>
      </div>
      <SettingsSectionHeader>Others</SettingsSectionHeader>
      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-red-400 text-sm'>Delete my account</p>
            <span className='text-xs text-grey-500 dark:text-grey-300 font-medium'>
              Permanently delete my account and all data
            </span>
          </div>
          <button
            onClick={showDeleteAccountModalHandler}
            className='h-min border-0 rounded-lg px-2 py-1 text-base font-medium cursor-pointer text-red-900 bg-red-200 hover:bg-red-300 duration-300'
          >
            Delete account
          </button>
        </div>
      </div>
      {showEmailModal && (
        <ChangeEmailModal
          hideChangeEmailModal={hideChangeEmailModal}
        />
      )}
      {showPasswordModal && (
        <ChangePasswordModal
          hideChangePasswordModal={hideChangePasswordModal}
        />
      )}
      {showDeleteAccountModal && (
        <DeleteAccountModal
          hideDeleteAccountModal={hideDeleteAccountModal}
        />
      )}
    </div>
  );
}

export default Account;

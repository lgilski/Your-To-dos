import { auth } from '@/config/firebase';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import ChangeButtons from './ChangeButtons/ChangeButtons';

function ChangeNames() {
  const user = auth.currentUser;

  const [saveDisplayName, setSaveDisplayName] =
    useState<boolean>(false);
  const [saveUsersName, setSaveUsersName] = useState<boolean>(false);

  const showSaveDisplayName = function () {
    setSaveDisplayName(true);
  };
  const showSaveUserName = function () {
    setSaveUsersName(true);
  };

  const submitDisplayName = function (e: any) {
    e.preventDefault();
    e.target[0].blur();

    if (e.target[0].value.length === 0) {
      return;
    }

    setSaveDisplayName(false);

    if (e.target[0].value === user?.displayName) return;

    updateProfile(user!, {
      displayName: e.target[0].value,
    });
  };

  const resetDisplayName = function (e: any) {
    e.preventDefault();

    setSaveDisplayName(false);

    e.target[0].value = user?.displayName;
  };

  return (
    <div className='flex flex-col mt-4 w-96'>
      <form
        className='flex gap-2'
        onSubmit={submitDisplayName}
        onReset={resetDisplayName}
      >
        <div className='flex flex-col'>
          <label
            className='text-sm font-medium '
            htmlFor='displayName'
          >
            Display name
          </label>
          <input
            maxLength={32}
            defaultValue={user!.displayName || ''}
            className={`mt-1 py-1 px-2 w-52 rounded border border-lime-green-700 text-sm bg-lime-green-100 dark:border-lime-green-050`}
            type='text'
            id='displayName'
            name='displayName'
            placeholder='none'
            autoComplete='off'
            onChange={showSaveDisplayName}
          />
        </div>
        {saveDisplayName && <ChangeButtons />}
      </form>
      {/* <form className='flex gap-2'>
        <div className='flex flex-col'>
          <label
            className='text-sm font-medium mt-4'
            htmlFor='userName'
          >
            User&apos;s name
          </label>
          <input
            maxLength={32}
            // defaultValue={user!.userName || ''}
            className={`mt-1 py-1 px-2 w-52 rounded border border-lime-green-700 text-sm bg-lime-green-100 dark:border-lime-green-050`}
            type='text'
            id='userName'
            name='userName'
            placeholder='none'
            autoComplete='off'
            onChange={showSaveUserName}
          />
        </div>
        {saveUsersName && <ChangeButtons />}
      </form> */}
    </div>
  );
}

export default ChangeNames;

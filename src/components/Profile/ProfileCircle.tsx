import { WholeState } from '@/types';
import { useSelector } from 'react-redux';
import ProfileIcon from './ProfileIcon';
import { auth } from '@/config/firebase';

function ProfileCircle() {
  const user = auth.currentUser;

  const isSidenavOpen = useSelector(
    (state: WholeState) => state.data.isSidenavOpen
  );

  return (
    <div
      data-tooltip-id='profile'
      className='container px-3 py-1 flex gap-2 hover:bg-orange-200 dark:hover:bg-grey-800 w-full duration-300 cursor-pointer'
    >
      <ProfileIcon />
      {isSidenavOpen && (
        <p
          className={`self-center text-base font-medium ${
            !user?.displayName ? 'text-grey-500' : 'dark:text-white'
          } `}
        >
          {user?.displayName ? user?.displayName : 'none'}
        </p>
      )}
    </div>
  );
}

export default ProfileCircle;

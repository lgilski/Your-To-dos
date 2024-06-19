import { WholeState } from '@/types';
import { useSelector } from 'react-redux';

function FriendsNavButton({
  handler,
  valueAsNotification,
  addFriend,
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  handler: (e?: any) => void;
  addFriend?: boolean;
  valueAsNotification?: any;
}) {
  const currentFriendListSecton = useSelector(
    (state: WholeState) => state.chat.currentFriendListSecton
  );

  return (
    <div className='relative'>
      <button
        onClick={handler}
        className={`relative border-none rounded-md px-4 py-2 text-lg cursor-pointer duration-300 ${
          currentFriendListSecton === children && !addFriend
            ? 'bg-orange-vivid-100 dark:bg-cool-grey-700 dark:text-cool-grey-100 after:absolute after:w-full after:h-0.5 after:bg-orange-vivid-400 after:content-[""] after:-bottom-2 after:left-0'
            : currentFriendListSecton === children && addFriend
            ? 'dark:bg-orange-vivid-700 text-orange-vivid-900 dark:text-white bg-orange-vivid-300 after:absolute after:w-full after:h-0.5 after:bg-orange-vivid-400 after:content-[""] after:-bottom-2 after:left-0'
            : addFriend
            ? 'bg-orange-vivid-200 text-orange-vivid-800 rounded-lg dark:bg-orange-vivid-600 dark:text-white duration-300 hover:bg-orange-vivid-300 dark:hover:bg-orange-vivid-700'
            : 'bg-orange-vivid-050 dark:bg-cool-grey-800 hover:bg-orange-vivid-100 dark:text-cool-grey-100 dark:hover:bg-cool-grey-700'
        }`}
      >
        {children}
      </button>
      {valueAsNotification && valueAsNotification.length > 0 && (
        <p className='absolute text-red-100 top-[-8px] right-[-8px] bg-red-400 rounded-full font-medium text-sm w-5 text-center'>
          {valueAsNotification.length < 10
            ? valueAsNotification.length
            : '+9'}
        </p>
      )}
    </div>
  );
}

export default FriendsNavButton;

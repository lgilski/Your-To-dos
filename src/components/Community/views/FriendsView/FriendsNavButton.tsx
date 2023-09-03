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
        className={`relative border-none rounded-lg px-2 py-1 text-xl font-semibold cursor-pointer duration-300 ${
          currentFriendListSecton === children && !addFriend
            ? 'bg-orange-100 dark:bg-grey-700 dark:text-grey-100 after:absolute after:w-full after:h-0.5 after:bg-orange-400 after:content-[""] after:-bottom-2 after:left-0'
            : currentFriendListSecton === children && addFriend
            ? 'dark:bg-lime-green-700 text-lime-green-800 dark:text-white bg-lime-green-300 after:absolute after:w-full after:h-0.5 after:bg-orange-400 after:content-[""] after:-bottom-2 after:left-0'
            : addFriend
            ? 'bg-lime-green-200 text-lime-green-800 rounded-lg dark:bg-lime-green-600 dark:text-white duration-300 hover:bg-lime-green-300 dark:hover:bg-lime-green-700'
            : 'bg-orange-050 dark:bg-grey-800 hover:bg-orange-100 dark:text-grey-100 dark:hover:bg-grey-700'
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

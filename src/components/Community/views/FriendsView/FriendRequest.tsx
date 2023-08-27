import ProfileIcon from '@/components/Profile/ProfileIcon';
import { Friend } from '@/types';

function FriendRequest({
  request,
  handlers,
}: {
  request: Friend;
  handlers: {
    acceptFriendRequest: (sentRequest: Friend) => Promise<void>;
    ingnoreFriendRequest: (sentRequest: Friend) => Promise<void>;
  };
}) {
  console.log(request);

  return (
    <div className='flex items-center p-2 justify-between'>
      <div className='flex items-center gap-4'>
        <ProfileIcon size='medium' friend src={request.photoURL} />
        <p className='text-2xl font-normal'>{request.displayName}</p>
      </div>
      <div className='[&_ion-icon]:w-6 [&_ion-icon]:h-6 [&_button]:border-none [&_button]:rounded-full [&_button]:p-1 [&_button]:h-8 [&_button]:dark:bg-grey-800 [&_button]:dark:text-grey-100 flex gap-2'>
        <button
          onClick={() => handlers.acceptFriendRequest(request)}
          className='dark:hover:text-lime-green-500 hover:text-lime-green-500 duration-300 cursor-pointer'
        >
          <ion-icon name='checkmark' />
        </button>
        <button
          onClick={() => handlers.ingnoreFriendRequest(request)}
          className='dark:hover:text-red-500 hover:text-lime-green-500 duration-300 cursor-pointer'
        >
          <ion-icon name='close' />
        </button>
      </div>
    </div>
  );
}

export default FriendRequest;

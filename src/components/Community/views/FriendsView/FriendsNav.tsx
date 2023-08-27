import { useSelector } from 'react-redux';
import FriendsNavButton from './FriendsNavButton';
import { WholeState } from '@/types';

function FriendsNav({ setCurrentFriendsViewSection }) {
  const myRequests = useSelector(
    (state: WholeState) => state.chat.myRequests
  );

  return (
    <div className='bg-inherit py-4 px-8 border-x-0 border-t-0 border-b border-solid dark:border-grey-600 border-grey-200 w-full mx-auto flex gap-4'>
      <FriendsNavButton handler={setCurrentFriendsViewSection}>
        All
      </FriendsNavButton>
      <FriendsNavButton
        handler={setCurrentFriendsViewSection}
        valueAsNotification={myRequests}
      >
        Requests
      </FriendsNavButton>
      <FriendsNavButton
        handler={setCurrentFriendsViewSection}
        addFriend={true}
      >
        Add friend
      </FriendsNavButton>
    </div>
  );
}

export default FriendsNav;

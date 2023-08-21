import ProfileIcon from '@/components/Profile/ProfileIcon';
import formatMessageData from '@/helpers/formatMessageData';
import { Friend, Message } from '@/types';
import { User } from 'firebase/auth';

function ChatMessage({
  message,
  messages,
  index,
  currentFriend,
  user,
}: {
  message: Message;
  messages: Message[];
  index: number;
  currentFriend: Friend | null;
  user: User | null;
}) {
  const {
    onlyMessage,
    photo,
    sentBy,
    dateToDisplay,
    time,
    nextDiff,
  } = formatMessageData(
    message,
    messages,
    index,
    currentFriend,
    user
  );

  return (
    <div className={`flex px-4 py-0.5 gap-2 last:mb-2`}>
      {!onlyMessage && (
        <ProfileIcon size='semi-medium' friend src={photo!} />
      )}
      <div className='flex flex-col gap-1'>
        {!onlyMessage && (
          <div className='flex items-baseline gap-2'>
            <div className=' dark:text-grey-100 font-medium'>
              {sentBy}
            </div>
            <p className='text-xs text-grey-400'>
              {dateToDisplay} {time}
            </p>
          </div>
        )}
        <p
          className={`${onlyMessage && 'pl-12'} ${
            messages[index + 1] &&
            messages[index + 1].sender !== message.sender &&
            'mb-4'
          } ${nextDiff! > 3 && 'mb-4'}`}
        >
          {message.message}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;

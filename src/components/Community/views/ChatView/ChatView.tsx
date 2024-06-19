import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage';
import { WholeState } from '@/types';
import { TailSpin } from 'react-loader-spinner';

function ChatView({
  onSubmit,
  onMessageChange,
  dummy,
  value,
  deleteMessage,
  setEditedMessage,
}) {
  const myMessages = useSelector(
    (state: WholeState) => state.chat.myMessages
  );
  const currentFriend = useSelector(
    (state: WholeState) => state.chat.currentFriend
  );
  const isLoadingData = useSelector(
    (state: WholeState) => state.chat.isLoadingData
  );

  return (
    <>
      {myMessages.length > 0 && (
        <div
          // onScroll={functions.handleScroll}
          className='flex flex-col  dark:text-cool-grey-200 overflow-y-scroll max-h-[740px] ml-2 pt-4'
        >
          {isLoadingData && (
            <TailSpin
              height='100'
              width='100'
              color='#d87620'
              ariaLabel='tail-spin-loading'
              radius='0'
              wrapperStyle={{}}
              wrapperClass='m-auto align-middle'
            />
          )}
          {!isLoadingData &&
            myMessages.map((message, index) => {
              return (
                <ChatMessage
                  index={index}
                  message={message}
                  key={message.date}
                  deleteMessage={deleteMessage}
                  setEditedMessage={setEditedMessage}
                />
              );
            })}
          <div ref={dummy} />
        </div>
      )}
      {currentFriend && (
        <form
          onSubmit={onSubmit}
          className='w-full mt-auto px-4 pb-2'
        >
          <input
            value={value}
            onChange={onMessageChange}
            className='w-full border-none bg-orange-vivid-200 text-lg py-1 px-2 rounded placeholder:text-orange-vivid-700 focus:outline-none'
            placeholder={`You are typing with ${currentFriend.displayName}`}
          />
        </form>
      )}
    </>
  );
}

export default ChatView;

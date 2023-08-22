import { RefObject } from 'react';

function ChatInput({
  sendMessage,
  messageRef,
  currentMessage,
  onMessageChange,
  displayName,
}: {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  messageRef: RefObject<HTMLInputElement>;
  currentMessage: string | undefined;
  onMessageChange: () => void;
  displayName: string;
}) {
  return (
    <form
      onSubmit={sendMessage} // w-full / absolute bottom-0 left-0 w-[70%]+
      className='w-full mt-auto px-4 pb-2'
    >
      <input
        ref={messageRef}
        value={currentMessage}
        onChange={onMessageChange}
        className='w-full border-none bg-orange-200 text-lg py-1 px-2 rounded placeholder:text-orange-700 focus:outline-none'
        placeholder={`You are typing with ${displayName}`}
      />
    </form>
  );
}

export default ChatInput;

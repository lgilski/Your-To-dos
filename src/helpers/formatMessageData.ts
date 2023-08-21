import { User } from 'firebase/auth';

function formatMessageData(
  message: {
    message: string;
    date: any;
    sender: string;
    photoURL?: string | undefined;
  },
  messages: {
    message: string;
    date: any;
    sender: string;
    photoURL?: string | undefined;
  }[],
  index: number,
  currentFriend:
    | { displayName: string; photoURL: string; uid: string }
    | null
    | undefined,
  user: User | null
) {
  const date = new Date(message.date).toLocaleDateString('pl-PL');
  let dateToDisplay = date;

  const today = new Date().toLocaleDateString('pl-PL');

  if (
    date.split('.')[2] === today.split('.')[2] &&
    date.split('.')[1] === today.split('.')[1]
  ) {
    if (
      Number(today.split('.')[0]) - Number(date.split('.')[0]) ===
      0
    ) {
      dateToDisplay = 'Today at';
    }
    if (
      Number(today.split('.')[0]) - Number(date.split('.')[0]) ===
      1
    ) {
      dateToDisplay = 'Yesterday at';
    }
  }

  const hours = new Date(message.date).getHours();
  let minutes: string | number = new Date(message.date).getMinutes();

  if (new Date(message.date).getMinutes().toString().length < 2)
    minutes = '0' + new Date(message.date).getMinutes().toString();

  const time = hours + ':' + minutes;

  let onlyMessage = false;
  let nextDiff;

  if (messages[index - 1]) {
    const before = Math.floor(
      new Date(messages[index - 1].date).getTime() / 1000 / 60
    );
    const now = Math.floor(
      new Date(message.date).getTime() / 1000 / 60
    );
    const diff = now - before;

    if (diff <= 3 && messages[index - 1].sender === message.sender) {
      onlyMessage = true;
    } else {
      onlyMessage = false;
    }
  }

  if (messages[index + 1]) {
    const now = Math.floor(
      new Date(message.date).getTime() / 1000 / 60
    );
    const after = Math.floor(
      new Date(messages[index + 1].date).getTime() / 1000 / 60
    );

    nextDiff = after - now;
  }

  let photo: string | null | undefined = currentFriend?.photoURL;

  if (message.sender === user?.uid) {
    photo = user.photoURL;
  }

  const sentBy =
    message.sender === user?.uid
      ? user.displayName
      : currentFriend?.displayName;

  return {
    onlyMessage,
    photo,
    sentBy,
    dateToDisplay,
    time,
    nextDiff,
  };
}

export default formatMessageData;

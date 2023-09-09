import { auth } from '@/config/firebase';
import { Friend, Message } from '@/types';
import { child, get, getDatabase, ref } from 'firebase/database';

function calculateDateDifferenceInDays(targetDate: Date) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24)
  );

  return daysDifference;
}

function addLeadingZero(num: number) {
  return num < 10 ? '0' + num : String(num);
}

function formatMessageData(
  message: Message,
  messages: Message[],
  index: number,
  currentFriend: Friend | null
) {
  const user = auth.currentUser;

  const date = new Date(message.date).toLocaleDateString('pl-PL');
  let dateToDisplay = date;

  const dateDifferenceInDays = calculateDateDifferenceInDays(
    new Date(message.date)
  );

  if (dateDifferenceInDays === -1) {
    dateToDisplay = 'Yesterday at';
  } else if (dateDifferenceInDays === 0) {
    dateToDisplay = 'Today at';
  }

  const hours = new Date(message.date).getHours();
  const minutes = addLeadingZero(new Date(message.date).getMinutes());

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

  // const db = getDatabase();

  // const senderData = await get(
  //   child(ref(db), 'usersPublicData/' + message.sender)
  // );

  // // console.log(senderData.val());

  // const sentBy = senderData.val().displayName;
  // const photo = senderData.val().photoURL;

  const sentBy =
    message.sender === user?.uid
      ? user.displayName
      : currentFriend?.displayName;

  // console.log('bozooooooooooooooo');

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

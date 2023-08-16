import { auth } from '@/config/firebase';
import { Friend } from '@/types';
import { User } from 'firebase/auth';
import {
  Database,
  child,
  get,
  getDatabase,
  onValue,
  ref,
  serverTimestamp,
  set,
  update,
} from 'firebase/database';
import { RefObject, useEffect, useState } from 'react';

async function getMyFriendRequestsOnce({
  user,
  db,
}: {
  user: User;
  db: Database;
}) {
  const requests = await get(
    child(ref(db), 'usersPublicData/' + user?.uid + '/requests')
  );

  return requests;
}

async function getMyFriendsOnce({
  user,
  db,
}: {
  user: User;
  db: Database;
}) {
  const friends = await get(
    child(ref(db), 'usersPublicData/' + user?.uid + '/friends')
  );

  return friends;
}

function useChat({
  currentMessage,
  setCurrentMessage,
  dummy,
}: {
  currentMessage: string | undefined;
  setCurrentMessage: (a: any) => any;
  dummy: RefObject<HTMLDivElement | null>;
}) {
  // const navigate = useNavigation();
  const user = auth.currentUser!;
  const db = getDatabase();

  const [messages, setMessages] = useState<
    | {
        message: string;
        date: any;
        sender: string;
        photoURL?: string;
      }[]
    | []
  >([]);
  const [requests, setRequests] = useState<Friend[] | []>([]);
  const [combinedId, setCombinedId] = useState<string>();
  const [friends, setFriends] = useState<Friend[] | []>([]);
  const [currentFriend, setCurrentfriend] = useState<{
    displayName: string;
    photoURL: string;
  }>();

  const [displayAddFriendsModal, setDisplayAddFriendsModal] =
    useState(false);

  const closeAddFriendsModal = function () {
    setDisplayAddFriendsModal(false);
  };

  const openAddFriendsModal = function () {
    setDisplayAddFriendsModal(true);
  };

  const acceptFriendRequest = async function (sentRequest: Friend) {
    const requests = await getMyFriendRequestsOnce({ user, db });
    const friends = await getMyFriendsOnce({ user, db });

    let currentFriendsArray;
    let senderFriendsArray;
    const currentFriends = friends.val();

    currentFriendsArray = currentFriends;

    if (!currentFriends) {
      currentFriendsArray = [];
    }

    const requestWithoutAcceptedArray = requests
      .val()
      .filter((request: any) => request.uid !== sentRequest.uid);

    update(ref(db, 'usersPublicData/' + user?.uid), {
      requests: [...requestWithoutAcceptedArray],
      friends: [sentRequest, ...currentFriendsArray],
    });

    const senderFriends = await get(
      child(
        ref(db),
        'usersPublicData/' + sentRequest.uid + '/friends'
      )
    );
    senderFriendsArray = senderFriends.val();

    if (!senderFriends.val()) {
      senderFriendsArray = [];
    }

    update(ref(db, 'usersPublicData/' + sentRequest.uid), {
      friends: [
        {
          uid: user?.uid,
        },
        ...senderFriendsArray,
      ],
    });

    return;
  };

  const ingnoreFriendRequest = async function (sentRequest: {
    uid: string;
  }) {
    const myRequests = await getMyFriendRequestsOnce({ user, db });
    const requestWithoutRejected = myRequests
      .val()
      .filter((request: any) => request.uid !== sentRequest.uid);

    update(ref(db, 'usersPublicData/' + user?.uid), {
      requests: [...requestWithoutRejected],
    });
  };

  const goToChat = async function (friend: Friend) {
    const combinedId =
      user.uid > friend.uid
        ? user.uid + friend.uid
        : friend.uid + user.uid;

    setCombinedId(combinedId);
    setCurrentfriend({
      displayName: friend.displayName,
      photoURL: friend.photoURL,
    });
  };

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (!currentMessage) return;

    update(ref(db, 'chats/' + combinedId), {
      messages: [
        ...messages,
        {
          message: currentMessage,
          sender: user.uid,
          date: serverTimestamp(),
        },
      ],
    });

    setCurrentMessage('');
  }

  useEffect(() => {
    onValue(
      ref(
        db,
        'usersPublicData/' + auth!.currentUser!.uid + '/friends'
      ),
      (snapshot) => {
        const myFriends = snapshot.val();

        if (myFriends) {
          myFriends.forEach(async (friend: { uid: string }) => {
            const requestData = await get(
              child(ref(db), 'usersPublicData/' + friend?.uid)
            );

            if (
              friends.some(
                (friendState) => friendState.uid === friend.uid
              )
            )
              return;

            setFriends((prevState: any) => [
              requestData.val(),
              ...prevState,
            ]);
          });
        } else {
          setFriends([]);
        }
      }
    );

    onValue(
      ref(
        db,
        'usersPublicData/' + auth!.currentUser!.uid + '/requests'
      ),
      (snapshot) => {
        const myRequests = snapshot.val();

        if (myRequests) {
          myRequests.forEach(async (request: { uid: string }) => {
            const requesterData = await get(
              child(ref(db), 'usersPublicData/' + request.uid)
            );

            if (
              requests.some(
                (requestState) => requestState.uid === request.uid
              )
            )
              return;

            setRequests((prevState: any) => [
              requesterData.val(),
              ...prevState,
            ]);
          });
        } else {
          setRequests([]);
        }
      }
    );

    onValue(
      ref(db, 'chats/' + combinedId + '/messages'),
      (messagesData) => {
        if (messagesData.exists()) {
          setMessages(messagesData.val());
        } else {
          setMessages([]);
        }

        if (
          messagesData.val()[messagesData.val().length - 1].sender ===
          user.uid
        )
          dummy.current?.scrollIntoView({ behavior: 'smooth' });
      }
    );
  }, [combinedId]);

  return {
    currentFriend,
    messages,
    requests,
    friends,
    displayAddFriendsModal,
    functions: {
      closeAddFriendsModal,
      openAddFriendsModal,
      acceptFriendRequest,
      ingnoreFriendRequest,
      goToChat,
      sendMessage,
    },
  };
}

export default useChat;

import { auth } from '@/config/firebase';
import { Friend, Message, UserChat } from '@/types';
import { User } from 'firebase/auth';
import {
  Database,
  child,
  get,
  getDatabase,
  onValue,
  ref,
  serverTimestamp,
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
  const user = auth.currentUser!;
  const db = getDatabase();

  const [messages, setMessages] = useState<Message[] | []>([]);
  const [requests, setRequests] = useState<Friend[] | []>([]);
  const [combinedId, setCombinedId] = useState<string | null>();
  const [friends, setFriends] = useState<Friend[] | []>([]);
  const [chats, setChats] = useState<UserChat[] | []>([]);
  const [friendsListSection, setFriendsListSection] = useState<
    'All' | 'Requests' | 'Add friend'
  >('All');
  const [currentFriend, setCurrentfriend] = useState<Friend | null>(
    null
  );
  // const [atTheBottom, setAtTheBottom] = useState<boolean>();

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
      friends: [{ uid: sentRequest.uid }, ...currentFriendsArray],
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

  const ingnoreFriendRequest = async function (sentRequest: Friend) {
    const myRequests = await getMyFriendRequestsOnce({ user, db });
    const requestWithoutRejected = myRequests
      .val()
      .filter((request: any) => request.uid !== sentRequest.uid);

    update(ref(db, 'usersPublicData/' + user?.uid), {
      requests: [...requestWithoutRejected],
    });
  };

  const goToChat = async function (friend: Friend) {
    const combinedIdInner =
      user.uid > friend.uid
        ? user.uid + friend.uid
        : friend.uid + user.uid;

    setCombinedId(combinedIdInner);
    setCurrentfriend({
      displayName: friend.displayName,
      photoURL: friend.photoURL,
      uid: friend.uid,
    });

    // const chatData = await get(
    //   child(
    //     ref(db),
    //     'userChats/' + friend!.uid + '/' + combinedIdInner
    //   )
    // );

    // console.log(chatData.exists());

    // console.log(friend.uid, user.uid);

    // if (!chatData.exists()) {
    //   await update(
    //     ref(db, 'userChats/' + user.uid + '/' + combinedIdInner),
    //     {
    //       userInfo: {
    //         uid: currentFriend?.uid,
    //         displayName: currentFriend?.displayName,
    //         // userName: currentFriend?.userName,
    //         photoURL: currentFriend?.photoURL || null,
    //       },
    //       date: serverTimestamp(),
    //     }
    //   );
    //   console.log('owo');
    //   await update(
    //     ref(db, 'userChats/' + friend!.uid + '/' + combinedIdInner),
    //     {
    //       userInfo: {
    //         uid: user?.uid,
    //         displayName: user?.displayName,
    //         // userName: userPublicData.val().userName,
    //         photoURL: user?.photoURL || null,
    //       },
    //       date: serverTimestamp(),
    //     }
    //   );
    //   console.log('uwu');
    // }
  };

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (!currentMessage) return;

    setCurrentMessage('');

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

    // get(child(ref(db), 'usersPublicData/' + user.uid)).then(
    //   (userPublicData) => {}
    // );
    update(
      ref(db, 'userChats/' + currentFriend!.uid + '/' + combinedId),
      {
        userInfo: {
          uid: user?.uid,
          displayName: user?.displayName,
          // userName: userPublicData.val().userName,
          photoURL: user?.photoURL,
        },
        date: serverTimestamp(),
      }
    );
    update(ref(db, 'userChats/' + user.uid + '/' + combinedId), {
      userInfo: {
        uid: currentFriend?.uid,
        displayName: currentFriend?.displayName,
        // userName: currentFriend?.userName,
        photoURL: currentFriend?.photoURL || null,
      },
      date: serverTimestamp(),
    });
  }

  function goToFriendsList() {
    setCurrentfriend(null);
    setMessages([]);
    setCombinedId(null);
  }

  function setCurrentFriendsListSection(e) {
    setFriendsListSection(e.target.innerText);
  }

  // function handleScroll(e) {
  //   setAtTheBottom(
  //     e.target.scrollHeight - e.target.scrollTop ===
  //       e.target.clientHeight
  //   );
  // }

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
        // const bottom = atTheBottom;

        if (messagesData.exists()) {
          setMessages(messagesData.val());
        } else {
          setMessages([]);
        }

        // console.log(friends.sort((a,b) => ));

        // if (
        //   (messagesData.exists() &&
        //     messagesData.val()[messagesData.val().length - 1]
        //       .sender !== user.uid) ||
        //   !bottom
        // )
        //   return;
      }
    );
  }, [combinedId]);

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: 'instant' });
  }, [messages]);

  useEffect(() => {
    onValue(ref(db, 'userChats/' + user.uid), (userChat) => {
      if (userChat.exists()) setChats(Object.values(userChat.val()));
    });
  }, []);

  return {
    currentFriend,
    messages,
    chats,
    requests,
    friends,
    displayAddFriendsModal,
    friendsListSection,
    functions: {
      closeAddFriendsModal,
      openAddFriendsModal,
      acceptFriendRequest,
      ingnoreFriendRequest,
      goToChat,
      sendMessage,
      goToFriendsList,
      setCurrentFriendsListSection,
      // handleScroll,
    },
  };
}

export default useChat;

import {
  getMyFriendRequestsOnce,
  getMyFriendsOnce,
  onMyCurrentChatMessageChange,
  onMyFriendsChange,
  onMyRequestsChange,
  updateMyAndFriendCurrentUserChats,
} from '@/api/chat';
import { auth } from '@/config/firebase';
import { chatActions } from '@/store/chat';
import { Friend, WholeState } from '@/types';
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  serverTimestamp,
  update,
} from 'firebase/database';
import { RefObject, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function useChat({
  dummy,
}: {
  dummy: RefObject<HTMLDivElement | null>;
}) {
  const dispatch = useDispatch();
  const user = auth.currentUser!;
  const db = getDatabase();

  const currentFriend = useSelector(
    (state: WholeState) => state.chat.currentFriend
  );
  const currentCombinedId = useSelector(
    (state: WholeState) => state.chat.currentCombinedId
  );
  const myMessages = useSelector(
    (state: WholeState) => state.chat.myMessages
  );
  const myRequests = useSelector(
    (state: WholeState) => state.chat.myRequests
  );

  const [requestsBeforeUpdate, setRequestsBeforeUpdate] = useState<
    number | null
  >(null);

  const acceptFriendRequest = async function (sentRequest: Friend) {
    // /////////////////////
    // REFACTOR
    // ////////////////////

    const requests = await getMyFriendRequestsOnce(user, db);
    const friends = await getMyFriendsOnce(user, db);

    let currentFriendsArray;
    let senderFriendsArray;
    const currentFriends = friends.val();

    currentFriendsArray = currentFriends;

    if (!currentFriends) {
      currentFriendsArray = [];
    }

    const requestWithoutAcceptedArray = requests.exists()
      ? requests
          .val()
          .filter((request: any) => request.uid !== sentRequest.uid)
      : [];

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
  };

  const ingnoreFriendRequest = async function (sentRequest: Friend) {
    const myRequests = await getMyFriendRequestsOnce(user, db);
    const requestWithoutRejected = myRequests
      .val()
      .filter((request: any) => request.uid !== sentRequest.uid);

    update(ref(db, 'usersPublicData/' + user?.uid), {
      requests: [...requestWithoutRejected],
    });
  };

  const goToChat = async function (e, friend: Friend) {
    if (e) if (e.currentTarget != e.target) return;

    const innerCombinedId =
      user.uid > friend.uid
        ? user.uid + friend.uid
        : friend.uid + user.uid;

    dispatch(chatActions.setCurrentCombinedId(innerCombinedId));
    dispatch(
      chatActions.setCurrentfriend({
        displayName: friend.displayName,
        photoURL: friend.photoURL,
        uid: friend.uid,
      })
    );
  };

  async function sendMessage(messageToSend: string) {
    if (!messageToSend) return;

    // Check if friends

    const myFriends = await getMyFriendsOnce(user, db);

    const hasThisFriend = myFriends
      .val()
      .find((myFriend) => myFriend.uid === currentFriend?.uid);

    if (!hasThisFriend) {
      console.log('nonono');

      dispatch(
        chatActions.setMyMessages([
          ...myMessages,
          {
            message:
              "You can't send message to this user because you are not friends. Send friend request to this user first.",
            sender: user.uid,
            date: Date.now(),
            canNotSendMessage: true,
          },
        ])
      );
      return;
    }

    update(ref(db, 'chats/' + currentCombinedId), {
      messages: [
        ...myMessages,
        {
          message: messageToSend,
          sender: user.uid,
          date: serverTimestamp(),
        },
      ],
    });

    updateMyAndFriendCurrentUserChats({
      currentCombinedId,
      currentFriend,
      db,
      user,
    });
  }

  function goToFriendsList() {
    dispatch(chatActions.setCurrentfriend(null));
    dispatch(chatActions.setCurrentCombinedId(null));
    dispatch(chatActions.setMyMessages([]));
  }

  function setCurrentFriendsViewSection(
    e: React.FormEvent<HTMLFormElement>
  ) {
    dispatch(
      chatActions.setCurrentFriendsViewSection(e.target.innerText)
    );
  }

  function setCurrentSearchedFriend(e) {
    dispatch(chatActions.setSearchedFriend(e.target.value));
  }

  async function deleteFriend(friend: Friend) {
    const myFriendsData = await getMyFriendsOnce(user, db);
    const friendFriendsData = await get(
      child(ref(db), 'usersPublicData/' + friend.uid + '/friends')
    );

    const myFriendsWithoutDeleted: { uid: string }[] | [] = [];
    const friendFriendsWithoutDeleted: { uid: string }[] | [] = [];

    myFriendsData.forEach((myFriend) => {
      myFriend.val().uid !== friend.uid &&
        myFriendsWithoutDeleted.push(myFriend.val());
    });

    friendFriendsData.forEach((friend) => {
      friend.val().uid !== user.uid &&
        friendFriendsWithoutDeleted.push(friend.val());
    });

    update(ref(db, 'usersPublicData/' + user.uid), {
      friends: [...myFriendsWithoutDeleted],
    });
    update(ref(db, 'usersPublicData/' + friend.uid), {
      friends: [...friendFriendsWithoutDeleted],
    });
  }

  useEffect(() => {
    onMyFriendsChange({ dispatch, user, db });
    onMyRequestsChange({ dispatch, user, db });
    onMyCurrentChatMessageChange({ dispatch, currentCombinedId, db });
  }, [currentCombinedId]);

  useEffect(() => {
    if (
      requestsBeforeUpdate !== null &&
      requestsBeforeUpdate < myRequests.length
    ) {
      var audio = new Audio(
        '/src/assets/notifications/MessageNotification.mp3'
      );
      audio.play();
    }
    if (myRequests.length > 0) {
      setRequestsBeforeUpdate(myRequests.length);
    } else setRequestsBeforeUpdate(0);
  }, [myRequests]);

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: 'instant' });
  }, [myMessages]);

  useEffect(() => {
    onValue(ref(db, 'userChats/' + user.uid), (userChat) => {
      if (userChat.exists())
        dispatch(
          chatActions.setUserChats(Object.values(userChat.val()))
        );
    });
  }, []);

  useEffect(() => {
    dispatch(chatActions.setSearchedFriend(null));
  }, [currentFriend]);

  const functions = {
    acceptFriendRequest,
    ingnoreFriendRequest,
    goToChat,
    sendMessage,
    goToFriendsList,
    setCurrentFriendsViewSection,
    setCurrentSearchedFriend,
    deleteFriend,
  };

  return functions;
}

export default useChat;

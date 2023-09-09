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
  off,
  onValue,
  ref,
  serverTimestamp,
  update,
} from 'firebase/database';
import { RefObject, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function useChat({
  dummy,
}: {
  dummy: RefObject<HTMLDivElement | null>;
}) {
  // Clean up!!!!!!

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
  const isLoadingData = useSelector(
    (state: WholeState) => state.chat.isLoadingData
  );
  const userChats = useSelector(
    (state: WholeState) => state.chat.userChats
  );

  const [requestsBeforeUpdate, setRequestsBeforeUpdate] = useState<
    number | null
  >(null);

  const [prevUserChats, setPrevUserChats] = useState<any>(null);

  const acceptFriendRequest = async function (sentRequest: Friend) {
    const requests = await getMyFriendRequestsOnce(user, db);
    const myFriendsData = await getMyFriendsOnce(user, db);
    const senderFriendsData = await get(
      child(
        ref(db),
        'usersPublicData/' + sentRequest.uid + '/friends'
      )
    );

    const requestWithoutAcceptedArray = requests.exists()
      ? requests
          .val()
          .filter((request: any) => request.uid !== sentRequest.uid)
      : [];

    // Update my friends and my requests
    update(ref(db, 'usersPublicData/' + user?.uid), {
      requests: [...requestWithoutAcceptedArray],
      friends: [
        { uid: sentRequest.uid },
        ...(myFriendsData.val() || []),
      ],
    });

    // Add me as a friend to the request sender
    update(ref(db, 'usersPublicData/' + sentRequest.uid), {
      friends: [
        {
          uid: user?.uid,
        },
        ...(senderFriendsData.val() || []),
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

    off(ref(db, 'userChats/' + user.uid));
    off(ref(db, 'chats/' + currentCombinedId + '/messages'));

    if (innerCombinedId !== currentCombinedId)
      dispatch(chatActions.setLoadingData(true));

    dispatch(chatActions.setCurrentCombinedId(innerCombinedId));
    dispatch(
      chatActions.setCurrentFriend({
        displayName: friend.displayName,
        photoURL: friend.photoURL,
        uid: friend.uid,
      })
    );

    const currentUserChat = await get(
      child(ref(db), 'userChats/' + user!.uid + '/' + innerCombinedId)
    );

    if (currentUserChat.exists())
      update(
        ref(db, 'userChats/' + user!.uid + '/' + innerCombinedId),
        {
          lastCheck: serverTimestamp(),
        }
      );
    // dispatch(chatActions.setLoadingData(false));
  };

  async function sendMessage(messageToSend: string) {
    if (!messageToSend) return;

    const myFriends = await getMyFriendsOnce(user, db);
    const hasThisFriend = myFriends
      .val()
      .find((myFriend) => myFriend.uid === currentFriend?.uid);

    if (!hasThisFriend) {
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
    off(ref(db, 'userChats/' + user.uid));
    off(ref(db, 'chats/' + currentCombinedId + '/messages'));
    dispatch(chatActions.setCurrentFriend(null));
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
  }, []);

  useEffect(() => {
    onMyCurrentChatMessageChange({
      dispatch,
      currentCombinedId,
      db,
    });
  }, [currentCombinedId]);

  useEffect(() => {
    if (currentCombinedId) {
      update(
        ref(db, 'userChats/' + user!.uid + '/' + currentCombinedId),
        {
          lastCheck: serverTimestamp(),
        }
      );
    }
  }, [myMessages, currentCombinedId]);

  useEffect(() => {
    if (
      requestsBeforeUpdate !== null &&
      requestsBeforeUpdate < myRequests.length
    ) {
      const audio = new Audio(
        '/src/assets/notifications/mixkit-long-pop-2358.wav'
      );
      audio.play();
    }
    if (myRequests.length > 0) {
      setRequestsBeforeUpdate(myRequests.length);
    } else setRequestsBeforeUpdate(0);
  }, [myRequests]);

  useEffect(() => {
    if (!prevUserChats) return setPrevUserChats(userChats);

    userChats.forEach((userChat) => {
      const prevVersion = prevUserChats.find(
        (prevUserChat) =>
          prevUserChat.userInfo.uid === userChat.userInfo.uid
      );

      if (
        prevVersion &&
        (userChat.newMessages > prevVersion.newMessages ||
          (!prevVersion.newMessages && userChat.newMessages))
      ) {
        const audio = new Audio(
          '/src/assets/notifications/mixkit-long-pop-2358.wav'
        );
        audio.play();
      }
    });

    setPrevUserChats(userChats);
  }, [userChats]);

  useEffect(() => {
    dispatch(chatActions.setLoadingData(false));
  }, [myMessages]);

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: 'instant' });
  }, [myMessages, isLoadingData]);

  useEffect(() => {
    let a = 0;

    onValue(ref(db, 'userChats/' + user.uid), (userChats) => {
      if (userChats.exists() && a === 0)
        dispatch(
          chatActions.setUserChats(Object.values(userChats.val()))
        );

      a++;

      userChats.forEach((userChat) => {
        let i = 0;
        let itemProcessed = 0;
        get(child(ref(db), 'chats/' + userChat.key)).then((chat) => {
          chat.val().messages.forEach((message) => {
            itemProcessed++;
            if (
              message.date > userChat.val().lastCheck &&
              message.sender !== user.uid
            ) {
              i++;

              if (itemProcessed === chat.val().messages.length)
                dispatch(
                  chatActions.setNewMessages({
                    numberOfNewMessages: i,
                    userChatWith: userChat.val().userInfo.uid,
                  })
                );
            }
          });
        });
      });
    });
  }, [currentFriend]);

  useEffect(() => {
    // Clear the search bar
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

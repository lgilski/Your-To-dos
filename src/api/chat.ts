import { chatActions } from '@/store/chat';
import { Friend } from '@/types';
import { AnyAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import {
  Database,
  child,
  get,
  onValue,
  ref,
  serverTimestamp,
  update,
} from 'firebase/database';
import { Dispatch } from 'react';

export function onMyFriendsChange({
  dispatch,
  user,
  db,
}: {
  dispatch: Dispatch<AnyAction>;
  user: User | null;
  db: Database;
}) {
  onValue(
    ref(db, 'usersPublicData/' + user!.uid + '/friends'),
    (snapshot) => {
      const myFriendsData = snapshot.val();

      if (myFriendsData) {
        myFriendsData.forEach(async (friend: { uid: string }) => {
          const requestData = await get(
            child(ref(db), 'usersPublicData/' + friend?.uid)
          );

          dispatch(chatActions.setMyFriends(requestData.val()));
        });
      }
    }
  );
}

export function onMyRequestsChange({
  dispatch,
  user,
  db,
}: {
  dispatch: Dispatch<AnyAction>;
  user: User | null;
  db: Database;
}) {
  onValue(
    ref(db, 'usersPublicData/' + user!.uid + '/requests'),
    (snapshot) => {
      const myRequestsData = snapshot.val();

      if (myRequestsData) {
        myRequestsData.forEach(async (request: { uid: string }) => {
          const requesterData = await get(
            child(ref(db), 'usersPublicData/' + request.uid)
          );

          dispatch(chatActions.setMyRequests(requesterData.val()));
        });
      } else dispatch(chatActions.setMyRequests(null));
    }
  );
}

export function onMyCurrentChatMessageChange({
  dispatch,
  currentCombinedId,
  db,
}: {
  dispatch: Dispatch<AnyAction>;
  currentCombinedId: string | null;
  db: Database;
}) {
  onValue(
    ref(db, 'chats/' + currentCombinedId + '/messages'),
    (messagesData) => {
      if (messagesData.exists()) {
        dispatch(chatActions.setMyMessages(messagesData.val()));
      } else {
        dispatch(chatActions.setMyMessages([]));
      }
    }
  );
}

export function updateMyAndFriendCurrentUserChats({
  currentFriend,
  currentCombinedId,
  user,
  db,
}: {
  currentFriend: Friend | null;
  currentCombinedId: string | null;
  user: User | null;
  db: Database;
}) {
  update(
    ref(
      db,
      'userChats/' + currentFriend!.uid + '/' + currentCombinedId
    ),
    {
      userInfo: {
        uid: user?.uid,
        displayName: user?.displayName,
        // userName: userPublicData.val().userName,
        photoURL: user?.photoURL || null,
      },
      date: serverTimestamp(),
    }
  );

  update(
    ref(db, 'userChats/' + user!.uid + '/' + currentCombinedId),
    {
      userInfo: {
        uid: currentFriend?.uid,
        displayName: currentFriend?.displayName,
        // userName: currentFriend?.userName,
        photoURL: currentFriend?.photoURL || null,
      },
      date: serverTimestamp(),
    }
  );
}

export async function getMyFriendRequestsOnce(
  user: User,
  db: Database
) {
  const requests = await get(
    child(ref(db), 'usersPublicData/' + user?.uid + '/requests')
  );
  return requests;
}

export async function getMyFriendsOnce(user: User, db: Database) {
  const friends = await get(
    child(ref(db), 'usersPublicData/' + user?.uid + '/friends')
  );
  return friends;
}

import { Message } from './../types';
import { ChatState, Friend } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ChatState = {
  myMessages: [],
  myRequests: [],
  myFriends: [],
  userChats: [],
  currentFriend: null,
  currentCombinedId: null,
  searchedFriend: null,
  currentFriendListSecton: 'All',
  isLoadingData: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMyFriends(state, action: PayloadAction<Friend[] | []>) {
      if (
        state.myFriends.some(
          (myFriendState) => myFriendState.uid === action.payload.uid
        )
      )
        return state;

      state.myFriends.push(action.payload);

      if (state.myFriends.length > 0)
        state.myFriends.sort((a, b) => {
          if (
            a.displayName.toLowerCase() < b.displayName.toLowerCase()
          )
            return -1;

          if (
            a.displayName.toLowerCase() > b.displayName.toLowerCase()
          )
            return 1;

          return 0;
        });

      return state;
    },
    clearMyFriends(state) {
      state.myFriends = [];

      return state;
    },
    setMyRequests(state, action: PayloadAction<Friend | null>) {
      if (!action.payload) {
        state.myRequests = [];
        return state;
      } else if (
        state.myRequests.some(
          (myRequestState) =>
            myRequestState.uid === action.payload!.uid
        )
      )
        return state;

      state.myRequests.push(action.payload);

      return state;
    },
    setMyMessages(state, action: PayloadAction<Message[] | []>) {
      state.myMessages = action.payload;
      return state;
    },
    setNewMessages(
      state,
      action: PayloadAction<{
        numberOfNewMessages: number;
        userChatWith: string;
      }>
    ) {
      state.userChats.find(
        (userChat) =>
          userChat.userInfo.uid === action.payload.userChatWith
      )!.newMessages = action.payload.numberOfNewMessages;

      return state;
    },
    setUserChats(state, action) {
      state.userChats = action.payload;

      state.userChats.sort((a, b) => b.date - a.date);
      return state;
    },
    setLoadingData(state, action: PayloadAction<boolean>) {
      state.isLoadingData = action.payload;

      return state;
    },
    setCurrentFriend(state, action: PayloadAction<Friend | null>) {
      state.currentFriend = action.payload;

      return state;
    },
    setCurrentCombinedId(
      state,
      action: PayloadAction<string | null>
    ) {
      state.currentCombinedId = action.payload;
      return state;
    },
    setSearchedFriend(state, action: PayloadAction<string | null>) {
      state.searchedFriend = action.payload;
      return state;
    },
    setCurrentFriendsViewSection(
      state,
      action: PayloadAction<'All' | 'Requests' | 'Add friend'>
    ) {
      state.currentFriendListSecton = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;

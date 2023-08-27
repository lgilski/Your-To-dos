import { configureStore, createSlice } from '@reduxjs/toolkit';
import timerReducer from './timer';
import weatherReducer from './weather';
import cardReducer from './card';
import stopwatchReducer from './stopwatch';
import chatReducer from './chat';

const initialState = {
  loading: true,
  isSidenavOpen: true,
  areSettingsOpen: false,
  currentSettingsPage: 'My account',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    isLoading(state, action) {
      state.loading = action.payload;
    },

    isSidenavOpen(state) {
      state.isSidenavOpen = !state.isSidenavOpen;
    },

    openSettings(state) {
      state.areSettingsOpen = true;
    },

    closeSettings(state) {
      state.areSettingsOpen = false;
    },

    setCurrentSettingsPage(state, action) {
      state.currentSettingsPage = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    cards: cardReducer,
    timers: timerReducer,
    weather: weatherReducer,
    stopwatch: stopwatchReducer,
    chat: chatReducer,
  },
});

export const dataActions = dataSlice.actions;

// store.getState();
// store.dispatch();

export default store;

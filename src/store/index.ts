import { configureStore, createSlice } from '@reduxjs/toolkit';
import timerReducer from './timer';
import weatherReducer from './weather';
import cardReducer from './card';

const initialState = {
  loading: true,
  isSidenavOpen: true,
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
  },
});

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    cards: cardReducer,
    timers: timerReducer,
    weather: weatherReducer,
  },
});

export const dataActions = dataSlice.actions;

export default store;

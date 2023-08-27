import { StopwatchState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: StopwatchState = {
  isCounting: false,
  currentTime: 0,
  lapTimes: [],
};

const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    setIsCounting(state, action) {
      state.isCounting = action.payload;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    addLapTimes(state, action) {
      state.lapTimes.push(action.payload);
    },
    resetLapTimes(state) {
      state.lapTimes = [];
    },
  },
});

export const stopwatchActions = stopwatchSlice.actions;

export default stopwatchSlice.reducer;

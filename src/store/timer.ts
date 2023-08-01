import { Timer, TimerState } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: TimerState = {
  timers: [],
  countDownMethod: 'Manually',
  startAllTimers: false,
  resetAllTimers: false,
  activeIndex: -1,
  startSequence: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer(state, action: PayloadAction<{ timerId: string }>) {
      state.timers.find(
        (timer) => timer.id === action.payload.timerId
      )!.isCounting = true;

      localStorage.setItem('timers', JSON.stringify(state.timers));
    },

    stopTimer(state, action: PayloadAction<{ timerId: string }>) {
      console.log('stoooop');

      state.timers.find(
        (timer) => timer.id === action.payload.timerId
      )!.isCounting = false;

      localStorage.setItem('timers', JSON.stringify(state.timers));
    },

    setRemainingTime(
      state,
      action: PayloadAction<{
        timerId: string;
        timeRemaining: number;
      }>
    ) {
      state.timers.find(
        (timer) => timer.id === action.payload.timerId
      )!.timeRemaining = action.payload.timeRemaining;

      localStorage.setItem('timers', JSON.stringify(state.timers));
    },

    /////////////////////////////////////
    setTimers(state, action: PayloadAction<Timer[]>) {
      state.timers = action.payload;

      return state;
    },

    createTimer(state, action: PayloadAction<Timer>) {
      state.timers.push(action.payload);

      localStorage.setItem('timers', JSON.stringify(state.timers));

      return state;
    },

    editTimer(
      state,
      action: PayloadAction<{
        timerId: string;
        hours: number | string;
        minutes: number | string;
        seconds: number | string;
        timeInSeconds: number;
        timerName: string;
      }>
    ) {
      state.timers.forEach((timer: Timer) => {
        if (timer.id !== action.payload.timerId) return timer;

        timer.hours = action.payload.hours;
        timer.minutes = action.payload.minutes;
        timer.seconds = action.payload.seconds;
        timer.timerName = action.payload.timerName;
        timer.timeInSeconds = action.payload.timeInSeconds;

        if (timer.timeRemaining! > timer.timeInSeconds) {
          timer.timeRemaining = action.payload.timeInSeconds;
        }

        localStorage.setItem('timers', JSON.stringify(state.timers));
      });
    },

    deleteTimer(state, action: PayloadAction<string>) {
      state.timers = state.timers.filter(
        (timer: Timer) => timer.id !== action.payload
      );

      localStorage.setItem('timers', JSON.stringify(state.timers));

      return state;
    },

    /////////////////////////////////////////

    // Implement counting down timers in sequence, one after another

    setTimerCountDownMethod(state, action: PayloadAction<string>) {
      state.countDownMethod = action.payload;
    },

    startTimers(state, action) {
      state.startAllTimers = action.payload;
    },

    resetTimers(state, action: PayloadAction<boolean>) {
      state.resetAllTimers = action.payload;
      state.activeIndex = -1;
    },

    startTimersInSquence(state) {
      state.startSequence = true;
      if (state.activeIndex === -1) {
        state.activeIndex = 0;
      }
    },

    stopTimersInSquence(state) {
      state.startSequence = false;
    },

    incrementActiveIndexInSequence(state) {
      state.activeIndex += 1;
    },

    moveTimers(state, action) {
      const { destination, source } = action.payload;

      const timerToMove = state.timers[source.index];

      state.timers.splice(source.index, 1);
      state.timers.splice(destination.index, 0, timerToMove);

      localStorage.setItem('timers', JSON.stringify(state.timers));

      return state;
    },
  },
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;

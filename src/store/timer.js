import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
  timers: [],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimers(state, action) {
      state.timers = action.payload;

      return state;
    },
    createTimer(state, action) {
      state.timers.push(action.payload);

      localStorage.setItem('timers', JSON.stringify(state.timers));

      return state;
    },
    editTimer(state, action) {
      console.log(action.payload);

      state.timers.forEach(timer => {
        if (timer.id !== action.payload.timerId) return timer;

        timer.hours = action.payload.hours;
        timer.minutes = action.payload.minutes;
        timer.seconds = action.payload.seconds;
        timer.timerName = action.payload.timerName;
        // card.tasks = [action.payload.task, ...card.tasks];

        localStorage.setItem('timers', JSON.stringify(state.timers));

        // return { ...card, tasks: [...card.tasks, action.payload.task] };
      });
    },
    deleteTimer(state, action) {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);

      localStorage.setItem('timers', JSON.stringify(state.timers));

      return state;
    },
  },
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;

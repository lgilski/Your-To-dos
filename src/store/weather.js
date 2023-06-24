import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  error: null,
  showOnCards: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    createWeatherCard(state, action) {
      state.data.push(action.payload);

      localStorage.setItem('weather', JSON.stringify(state.data));
    },

    loadWeather(state, action) {
      state.data = action.payload;
    },

    deleteWeather(state, action) {
      state.data = state.data.filter(weather => weather !== action.payload);

      localStorage.setItem('weather', JSON.stringify(state.data));
    },

    setError(state, action) {
      state.error = action.payload;
    },

    showOnCards(state, action) {
      state.showOnCards = action.payload;
    },

    stopShowingOnCards(state, action) {
      state.showOnCards = '';
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;

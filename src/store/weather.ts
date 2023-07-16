import { WeatherState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WeatherState = {
  data: [],
  error: null,
  showOnCards: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    createWeatherCard(state, action: PayloadAction<string>) {
      state.data.push(action.payload);

      localStorage.setItem('weather', JSON.stringify(state.data));
    },

    loadWeather(state, action: PayloadAction<string[]>) {
      state.data = action.payload;
    },

    deleteWeather(state, action: PayloadAction<string>) {
      state.data = state.data.filter((weather) => weather !== action.payload);

      localStorage.setItem('weather', JSON.stringify(state.data));
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    showOnCards(state, action: PayloadAction<string>) {
      state.showOnCards = action.payload;

      localStorage.setItem('favorite', JSON.stringify(state.showOnCards));
    },

    stopShowingOnCards(state) {
      state.showOnCards = null;

      localStorage.setItem('favorite', JSON.stringify(state.showOnCards));
    },
  },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;

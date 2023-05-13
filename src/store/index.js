import { configureStore, createSlice } from '@reduxjs/toolkit';

/**
 * @type {DataState}
 */
const initialState = {
  cards: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    /**
     * @param {DataState} state
     * @param {{ payload: Card[] }} action
     */
    setCards(state, action) {
      state.cards = action.payload;
      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: Card }} action
     */
    createCard(state, action) {
      // console.log('createCard', action);
      state.cards.push(action.payload);

      state.cards.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: { id: string } }} action
     */
    deleteCard(state, action) {
      state.cards = state.cards.filter(card => card.id !== action.payload.id);

      localStorage.setItem('cards', JSON.stringify(state.cards));

      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: { cardId: string, task: Task } }} action
     */
    createTask(state, action) {
      // console.log('createTask', action);

      state.cards.filter(card => {
        if (card.id !== action.payload.cardId) return card;

        card.tasks = [action.payload.task, ...card.tasks];

        // return { ...card, tasks: [...card.tasks, action.payload.task] };
      });

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: { cardId: string, taskId: string } }} action
     */
    deleteTask(state, action) {
      state.cards = state.cards.map(card => {
        if (card.id !== action.payload.cardId) return card;

        card.tasks = card.tasks.filter(
          task => task.id !== action.payload.taskId
        );
        return card;
      });

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },
  },
});

const store = configureStore({
  reducer: dataSlice.reducer,
});

export const dataActions = dataSlice.actions;

export default store;

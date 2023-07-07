import { configureStore, createSlice } from '@reduxjs/toolkit';
import timerReducer from './timer';
import weatherReducer from './weather';
import { auth } from '../config/firebase';

/**
 * @type {DataState}
 */
const initialState = {
  cards: [],
  searched: null,
  loading: true,
  isSidenavOpen: true,
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
      if (action.payload === null) {
        state.cards = [];
        return state;
      }

      state.cards = action.payload;
      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: Card }} action
     */
    createCard(state, action) {
      state.cards.push(action.payload);

      state.cards.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      fetch(
        process.env.REACT_APP_FIREBASE_LINK +
          auth.currentUser.uid +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: { id: string } }} action
     */
    deleteCard(state, action) {
      state.cards = state.cards.filter(card => card.id !== action.payload.id);

      fetch(
        process.env.REACT_APP_FIREBASE_LINK +
          auth.currentUser.uid +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));

      return state;
    },

    /**
     * @param {DataState} state
     * @param {{ payload: { cardId: string, task: Task } }} action
     */
    createTask(state, action) {
      state.cards.forEach(card => {
        if (card.id !== action.payload.cardId) return card;

        card.tasks = [action.payload.task, ...card.tasks];

        // return { ...card, tasks: [...card.tasks, action.payload.task] };
      });

      fetch(
        process.env.REACT_APP_FIREBASE_LINK +
          auth.currentUser.uid +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

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

      fetch(
        process.env.REACT_APP_FIREBASE_LINK +
          auth.currentUser.uid.split('.').join('-') +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },

    markTaskAsDone(state, action) {
      state.cards = state.cards.map(card => {
        if (card.id !== action.payload.cardId) return card;

        const task = card.tasks.find(
          task => task.id === action.payload.taskId
        ).done;

        if (task) {
          card.tasks.find(
            task => task.id === action.payload.taskId
          ).done = false;
        } else {
          card.tasks.find(
            task => task.id === action.payload.taskId
          ).done = true;
        }

        return card;
      });

      fetch(
        process.env.REACT_APP_FIREBASE_LINK +
          auth.currentUser.uid +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));
      return state;
    },

    searchTask(state, action) {
      if (action.payload.length < 1) {
        state.searched = null;
        return state;
      }

      state.searched = action.payload;
      return state;
    },

    moveTaskBetweenCards(state, action) {
      // TODO: Make it better one day!!!

      const { destination, source, draggableId } = action.payload;

      const cardDraggedFrom = state.cards.find(
        card => card.id === source.droppableId
      );
      const taskToMove = cardDraggedFrom.tasks.find(
        task => task.id === draggableId
      );

      const tasksWithoutDragged = Array.from(cardDraggedFrom.tasks);
      tasksWithoutDragged.splice(source.index, 1);

      state.cards.find(card => card.id === source.droppableId).tasks =
        tasksWithoutDragged;

      const cardWithDragged = state.cards.find(
        card => card.id === destination.droppableId
      );

      let tasksWithDragged;
      if (cardWithDragged.tasks) {
        tasksWithDragged = Array.from(cardWithDragged.tasks);
        tasksWithDragged.splice(destination.index, 0, taskToMove);
      } else {
        tasksWithDragged = [taskToMove];
      }

      state.cards.find(card => card.id === destination.droppableId).tasks =
        tasksWithDragged;

      fetch(
        process.env.REACT_APP_FIREBASE_LINK +
          auth.currentUser.uid +
          '/cards.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.cards),
        }
      );

      localStorage.setItem('cards', JSON.stringify(state.cards));

      return state;
    },

    // Just data

    isLoading(state, action) {
      state.loading = action.payload;
    },

    isSidenavOpen(state, action) {
      state.isSidenavOpen = !state.isSidenavOpen;
    },
  },
});

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    timers: timerReducer,
    weather: weatherReducer,
  },
});

export const dataActions = dataSlice.actions;

export default store;

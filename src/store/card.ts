import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../config/firebase';
import { getDatabase, ref, set } from 'firebase/database';

const initialState: CardState = {
  cards: [],
  searched: null,
};

const sortByDate = (a: Card, b: Card) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
};

const saveCards = (cards: Card[]) => {
  console.log(cards);

  if (auth.currentUser) {
    const db = getDatabase();
    set(ref(db, 'users/' + auth.currentUser.uid), {
      cards: cards,
    });

    localStorage.setItem('cards', JSON.stringify(cards));
  }
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<Card[]>) {
      if (action.payload === null) {
        state.cards = [];
        return state;
      }

      state.cards = action.payload;
      return state;
    },

    createCard(state, action: PayloadAction<Card>) {
      state.cards.push(action.payload);
      state.cards.sort(sortByDate);
      saveCards(state.cards);
      return state;
    },

    deleteCard(state, action: PayloadAction<{ id: string }>) {
      state.cards = state.cards.filter(card => card.id !== action.payload.id);
      saveCards(state.cards);
      return state;
    },

    createTask(state, action: PayloadAction<{ cardId: string; task: Task }>) {
      state.cards.forEach(card => {
        if (card.id !== action.payload.cardId) return card;

        card.tasks = [action.payload.task, ...card.tasks];
      });

      saveCards(state.cards);
      return state;
    },

    deleteTask(
      state,
      action: PayloadAction<{ cardId: string; taskId: string }>
    ) {
      state.cards = state.cards.map(card => {
        if (card.id !== action.payload.cardId) return card;

        card.tasks = card.tasks.filter(
          task => task.id !== action.payload.taskId
        );
        return card;
      });

      saveCards(state.cards);
      return state;
    },

    markTaskAsDone(
      state,
      action: PayloadAction<{ taskId: string; cardId: string }>
    ) {
      state.cards = state.cards.map(card => {
        if (card.id !== action.payload.cardId) return card;

        const task = card.tasks.find(
          task => task.id === action.payload.taskId
        )?.done;

        if (task) {
          card.tasks.find(task => task.id === action.payload.taskId)!.done =
            false;
        } else {
          card.tasks.find(task => task.id === action.payload.taskId)!.done =
            true;
        }

        return card;
      });

      saveCards(state.cards);
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

      // const resultDrop = {
      //   draggableId: task.id,
      //   type: 'TYPE',
      //   reason: 'DROP',
      //   source: {
      //     droppableId: card.id,
      //     index: 0,
      //   },
      //   destination: {
      //     droppableId: card.id,
      //     index: 1,
      //   },
      // };

      const { destination, source, draggableId } = action.payload;

      const cardDraggedFrom = state.cards.find(
        card => card.id === source.droppableId
      );

      const taskToMove = cardDraggedFrom!.tasks.find(
        task => task.id === draggableId
      )!;

      const tasksWithoutDragged = Array.from(cardDraggedFrom!.tasks);
      tasksWithoutDragged.splice(source.index, 1);

      state.cards.find(card => card.id === source.droppableId)!.tasks =
        tasksWithoutDragged;

      const cardWithDragged = state.cards.find(
        card => card.id === destination.droppableId
      );

      let tasksWithDragged: Task[];
      if (cardWithDragged?.tasks && taskToMove) {
        tasksWithDragged = Array.from(cardWithDragged.tasks);
        tasksWithDragged.splice(destination.index, 0, taskToMove);
      } else {
        // tasksWithDragged = [taskToMove];
        tasksWithDragged = Array(taskToMove);
      }
      state.cards.find(card => card.id === destination.droppableId)!.tasks =
        tasksWithDragged;

      saveCards(state.cards);

      return state;
    },
  },
});

export const cardActions = cardSlice.actions;

export default cardSlice.reducer;

import Card from '../Card/Card';
import classes from './Cards.module.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import cardClasses from '../Card/Card.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { dataActions } from '../../../store';
import { useQuery } from '@tanstack/react-query';
import { fetchForecast } from '../../../api/api';

import { DragDropContext } from 'react-beautiful-dnd';
import { flushSync } from 'react-dom';

const Cards = function () {
  const dispatch = useDispatch();

  const cards = useSelector(state => state.data.cards);
  let favorite = useSelector(state => state.weather.showOnCards);
  const searched = useSelector(state => state.data.searched);
  const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

  const [cardsWchichContainsSearched, setCardsWchichContainsSearched] =
    useState([]);

  const { data: forecastData } = useQuery(
    ['forecast', favorite],
    () => {
      if (!favorite) return null;

      return fetchForecast({ city: favorite });
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 12,
    }
  );

  useEffect(() => {
    if (cardsFromLocalStorage !== null) {
      dispatch(dataActions.setCards(cardsFromLocalStorage));
    } else {
      dispatch(dataActions.setCards([]));
    }
  }, []);

  useEffect(() => {
    // Fix the jumps while dropping on other card

    const foundCards = cards?.filter(card =>
      card.tasks?.find(task => {
        return task.content.toLowerCase().includes(searched?.toLowerCase());
      })
    );

    setCardsWchichContainsSearched(foundCards);
  }, [searched, cards]);

  const hasCards = cards.length > 0;

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

  const onDragEnd = function (result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Maybe not the best, but works fine and fixes the issue
    flushSync(() => {
      dispatch(
        dataActions.moveTaskBetweenCards({ destination, source, draggableId })
      );
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.plansContainer}>
        <TransitionGroup>
          {!hasCards && (
            <CSSTransition
              classNames={{
                enterActive: classes['message-enter-active'],
                enter: classes['message-enter'],
                exitActive: classes['message-exit-active'],
                exit: classes['message-exit'],
              }}
              timeout={300}
            >
              <h4 className={classes.message}>There are no plans yet</h4>
            </CSSTransition>
          )}
        </TransitionGroup>
        <TransitionGroup component='div' className={classes.plans}>
          {searched &&
            cardsWchichContainsSearched.map(card => (
              <CSSTransition
                key={card.id}
                classNames={{
                  enterActive: cardClasses['fade-enter-active'],
                  enter: cardClasses['fade-enter'],
                  exitActive: cardClasses['fade-exit-active'],
                  exit: cardClasses['fade-exit'],
                }}
                timeout={300}
              >
                <Card
                  key={card.id}
                  card={card}
                  forecastDay={
                    !forecastData?.message && forecastData?.forecast.forecastday
                  }
                />
              </CSSTransition>
            ))}
          {!searched &&
            cards.map(card => (
              <CSSTransition
                key={card.id}
                classNames={{
                  enterActive: cardClasses['fade-enter-active'],
                  enter: cardClasses['fade-enter'],
                  exitActive: cardClasses['fade-exit-active'],
                  exit: cardClasses['fade-exit'],
                }}
                timeout={300}
              >
                <Card
                  key={card.id}
                  card={card}
                  forecastDay={
                    !forecastData?.message && forecastData?.forecast.forecastday
                  }
                />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </DragDropContext>
  );
};

export const loader = function () {
  const cards = localStorage.getItem('cards');
  return cards;
};

export default Cards;

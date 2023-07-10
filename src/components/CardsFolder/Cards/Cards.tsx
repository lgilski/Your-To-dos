import Card from '../Card/Card';
import classes from './Cards.module.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import cardClasses from '../Card/Card.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchForecast } from '../../../api/api';

import { DragDropContext } from 'react-beautiful-dnd';
import { flushSync } from 'react-dom';
import clsx from '../../../utils/clsx';
import Toolbar from '../Toolbar/Toolbar';
import FormCards from '../FormCard/FormCard';

import 'react-toastify/dist/ReactToastify.css';
import { cardActions } from '../../../store/card';

const Cards = function () {
  const dispatch = useDispatch();

  const cards = useSelector((state: WholeState) => state.cards.cards);
  let favorite = useSelector((state: WholeState) => state.weather.showOnCards);
  const searched = useSelector((state: WholeState) => state.cards.searched);
  const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards')!);

  const [searchedIds, setSearchedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

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
      dispatch(cardActions.setCards(cardsFromLocalStorage));
    } else {
      dispatch(cardActions.setCards([]));
    }
  }, []);

  useEffect(() => {
    const foundCards = cards?.filter(card =>
      card.tasks?.find(task => {
        return task.content.toLowerCase().includes(searched?.toLowerCase()!);
      })
    );

    const cardsIds: string[] = [];

    foundCards.forEach(card => {
      cardsIds.push(card.id);
    });

    setSearchedIds(cardsIds);
  }, [searched, cards]);

  const hasCards = cards?.length > 0;

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

  const onDragEnd = function (result: any) {
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
        cardActions.moveTaskBetweenCards({ destination, source, draggableId })
      );
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.contentWrapper}>
        <div className={classes.plansContainer}>
          <Toolbar setShowForm={setShowForm} />
          {/* <FormCards
          setShowForm={setShowForm}
          className={!showForm && classes.hideForm}
        /> */}
          {showForm && <FormCards className={null} setShowForm={setShowForm} />}
          <TransitionGroup
            component='div'
            className={clsx(classes.plans, !hasCards && classes.withoutCards)}
          >
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
            {cards.map(card => {
              if (searched && searchedIds.indexOf(card.id) === -1) {
                return null;
              }

              return (
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
                      forecastData?.message &&
                      forecastData?.forecast.forecastday
                    }
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    </DragDropContext>
  );
};

export const loader = function () {
  const cards = localStorage.getItem('cards');
  return cards;
};

export default Cards;

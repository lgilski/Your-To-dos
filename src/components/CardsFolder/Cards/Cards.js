import Card from '../Card/Card';
import classes from './Cards.module.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import cardClasses from '../Card/Card.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dataActions } from '../../../store';

const Cards = function () {
  const dispatch = useDispatch();

  const cards = useSelector(state => state.data.cards);
  const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

  useEffect(() => {
    if (cardsFromLocalStorage !== null) {
      dispatch(dataActions.setCards(cardsFromLocalStorage));
    } else {
      dispatch(dataActions.setCards([]));
    }
  }, []);

  const hasCards = cards.length > 0;

  return (
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
        {cards.map(card => (
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
            <Card key={card.id} card={card} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export const loader = function () {
  const cards = localStorage.getItem('cards');
  return cards;
};

export default Cards;

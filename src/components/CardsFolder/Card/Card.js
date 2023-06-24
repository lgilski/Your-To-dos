import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classes from './Card.module.css';
import CardElement from '../TaskComponent/TaskComponent';

import TaskComponentClasses from '../TaskComponent/TaskComponent.module.css';
import { dataActions } from '../../../store';
import { useDispatch } from 'react-redux';
import CloseButton from '../../common/CloseButton/CloseButton';
import { useEffect, useState } from 'react';

/**
 * @param {Object} props
 * @param {Card} props.card
 * @param {forecastData} props.forecast
 */
const Card = function ({ card, forecastDay }) {
  console.log(forecastDay);

  const dispatch = useDispatch();

  const onCardDelete = function () {
    dispatch(dataActions.deleteCard({ id: card.id }));
  };

  const [currentWeather, setCurrentWeather] = useState(null);

  const date = new Date(card.date);
  const now = new Date();

  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  const happened = diffDays < 0 ? 'true' : '';
  const withinThreeDays =
    diffDays <= 2 && diffDays >= 0 && diffDays !== 0 ? 'true' : '';
  const today = diffDays === 0 ? 'true' : '';

  useEffect(() => {
    if (forecastDay) {
      setCurrentWeather(
        forecastDay.find(day => day.date === card.date.split('T')[0])
      );
    }
  }, [forecastDay, card.date]);

  console.log(currentWeather);

  return (
    <div
      className={`${classes.card} ${
        happened === 'true' ? classes['card-black'] : ''
      }`}
    >
      <CloseButton
        className={classes.btnClose}
        onClick={onCardDelete}
        color={'orange'}
        size={'big'}
      />
      {currentWeather && (
        <img
          className={classes.weatherIcon}
          src={currentWeather.day.condition.icon}
          alt=''
        />
      )}
      <div className={classes.date}>
        <h3
          className={
            today === 'true'
              ? classes.withinSevenDays
              : withinThreeDays === 'true'
              ? classes.withinSevenDays
              : ''
          }
        >
          {today === 'true' ? 'TODAY' : dayName}
        </h3>
        {/* ID here is a date */}
        <h4>{card.id}</h4>
      </div>
      <TransitionGroup component='ul' className={classes.list}>
        {card.tasks.map(task => (
          <CSSTransition
            key={task.id}
            classNames={{
              enterActive: TaskComponentClasses['fade-small-enter-active'],
              enter: TaskComponentClasses['fade-small-enter'],
              exitActive: TaskComponentClasses['fade-small-exit-active'],
              exit: TaskComponentClasses['fade-small-exit'],
            }}
            timeout={300}
          >
            <CardElement task={task} cardId={card.id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Card;

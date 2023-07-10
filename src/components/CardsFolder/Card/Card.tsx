import classes from './Card.module.css';
import CardElement from '../TaskComponent/TaskComponent';

import { useDispatch } from 'react-redux';
import CloseButton from '../../common/CloseButton/CloseButton';
import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import clsx from '../../../utils/clsx';
import { cardActions } from '../../../store/card';

const Card = function ({
  card,
  forecastDay,
}: {
  card: Card;
  forecastDay: Forecastday | '' | undefined;
}): JSX.Element {
  const dispatch = useDispatch();

  const onCardDelete = function () {
    dispatch(cardActions.deleteCard({ id: card.id }));
  };

  // const [isBig, setIsBig] = useState(false);

  const [currentWeather, setCurrentWeather] = useState<
    | { date: string; data_epoch: number; day: Day; astro: Astro; hour: Hour }
    | undefined
  >(undefined);

  const date = new Date(card.date);
  const now = new Date();

  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  const happened = diffDays < 0 ? 'true' : '';
  const withinThreeDays =
    diffDays <= 2 && diffDays >= 0 && diffDays !== 0 ? 'true' : '';
  const today = diffDays === 0 ? 'true' : '';

  useEffect(() => {
    if (forecastDay) {
      console.log(
        forecastDay.find(day => day.date === card.date.split('T')[0])
      );

      setCurrentWeather(
        forecastDay.find(day => day.date === card.date.split('T')[0])
      );
    }
  }, [forecastDay, card.date]);

  return (
    <div
      className={clsx(
        classes.card,
        happened === 'true' && classes['card-black'],
        today === 'true' && classes.withinThreeDays,
        withinThreeDays === 'true' && classes.withinThreeDays
      )}
    >
      <CloseButton
        className={classes.btnClose}
        onClick={onCardDelete}
        color={'orange'}
        size={'big'}
      />
      {/* Type '{ className: any; onClick: () => void; color: string; size: "big"; }' is not assignable to type 'IntrinsicAttributes & { color: string; size: "big" | "small"; className: string; }'.
  Property 'onClick' does not exist on type 'IntrinsicAttributes & { color: string; size: "big" | "small"; className: string; }'. */}
      {currentWeather && (
        <img
          className={classes.weatherIcon}
          src={currentWeather.day.condition.icon}
          alt=''
        />
      )}
      <div className={classes.date}>
        <h3>{today === 'true' ? 'TODAY' : dayName}</h3>
        {/* ID here is a date */}
        <h4>{card.id}</h4>
      </div>
      <Droppable droppableId={card.id}>
        {(provided: any, snapshot: any) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes.list}
          >
            {/* <TransitionGroup component={null} className={classes.list}> */}
            {card.tasks?.map((task, index) => (
              // <CSSTransition
              //   key={task.id}
              //   classNames={{
              //     enterActive: TaskComponentClasses['fade-small-enter-active'],
              //     enter: TaskComponentClasses['fade-small-enter'],
              //     exitActive: TaskComponentClasses['fade-small-exit-active'],
              //     exit: TaskComponentClasses['fade-small-exit'],
              //   }}
              //   timeout={300}
              // >
              <CardElement
                key={task.id}
                task={task}
                cardId={card.id}
                index={index}
              />
              // </CSSTransition>
            ))}
            {provided.placeholder}
            {/* </TransitionGroup> */}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Card;

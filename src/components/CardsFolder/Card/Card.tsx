// import classes from './Card.module.css';
import CardElement from '../TaskComponent/TaskComponent';

import { useDispatch } from 'react-redux';
import CloseButton from '../../common/CloseButton/CloseButton';
import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import clsx from '../../../utils/clsx';
import { cardActions } from '../../../store/card';
import { Astro, Card, Day, ForecastdayArray, Hour } from '@/types';

const CardComponent = function ({
  card,
  forecastDay,
}: {
  card: Card;
  forecastDay: ForecastdayArray | '' | undefined;
}): JSX.Element {
  const dispatch = useDispatch();

  const onCardDelete = function () {
    dispatch(cardActions.deleteCard({ id: card.id }));
  };

  const [currentWeather, setCurrentWeather] = useState<
    | {
        date: string;
        data_epoch: number;
        day: Day;
        astro: Astro;
        hour: Hour[];
      }
    | undefined
  >(undefined);

  const date = new Date(card.date);
  const now = new Date();

  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dayName = date.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const happened = diffDays < 0 ? 'true' : '';
  const withinThreeDays =
    diffDays <= 2 && diffDays >= 0 && diffDays !== 0 ? 'true' : '';
  const today = diffDays === 0 ? 'true' : '';

  useEffect(() => {
    if (forecastDay) {
      setCurrentWeather(
        forecastDay.find(
          (day) => day.date === card.date.split('T')[0]
        )
      );
    }
  }, [forecastDay, card.date]);

  return (
    <div
      className={clsx(
        `relative flex flex-col w-[270px] p-4 text-lg text-grey-900 max-[300px]:w-[230px] ${
          happened
            ? 'bg-grey-warm-300'
            : today
            ? 'bg-orange-300'
            : withinThreeDays
            ? 'bg-orange-200'
            : 'bg-orange-100'
        } rounded-lg shadow-md duration-500 items-center`
      )}
    >
      <CloseButton
        // className='absolute top-1 right-1 hover:text-orange-900 bg-orange-50'
        className='absolute top-1 right-1'
        onClick={onCardDelete}
        color={'orange'}
        size={'big'}
      />
      {currentWeather && (
        <img
          className='absolute -top-3 -left-3 w-12 h-12 bg-white rounded-full shadow-lg'
          src={currentWeather.day.condition.icon}
          alt=''
        />
      )}
      <div className='flex flex-col items-center pb-4'>
        <h3
          className={`text-4xl font-extrabold ${
            withinThreeDays && 'text-orange-900'
          }`}
        >
          {today === 'true' ? 'TODAY' : dayName}
        </h3>
        {/* ID here is a date */}
        <h4 className='text-2xl font-semibold'>{card.id}</h4>
      </div>
      <Droppable droppableId={card.id}>
        {(provided: any) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='flex flex-col flex-grow font-medium list-none w-full items-center'
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

export default CardComponent;

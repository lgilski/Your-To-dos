import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classes from './Card.module.css';
import CardElement from '../TaskComponent/TaskComponent';

import TaskComponentClasses from '../TaskComponent/TaskComponent.module.css';
import { dataActions } from '../../../store';
import { useDispatch } from 'react-redux';
import CloseButton from '../../UI/CloseButton/CloseButton';

/**
 * @param {{ card: Card }} props
 */
const Card = function (props) {
  const { card } = props;

  const dispatch = useDispatch();

  const onCardDelete = function () {
    dispatch(dataActions.deleteCard({ id: card.id }));
  };

  const date = new Date(card.date);
  const now = new Date();

  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

  const happened = diffDays < 0 ? 'true' : '';
  const withinThreeDays =
    diffDays <= 2 && diffDays >= 0 && diffDays !== 0 ? 'true' : '';
  const today = diffDays === 0 ? 'true' : '';

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

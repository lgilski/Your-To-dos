import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classes from './Card.module.css';
import CardElement from './CardElement';

const Card = function (props) {
  const onDeleteHandler = function () {
    props.onDelete(props.id);
  };

  return (
    <div
      key={props.id}
      className={`${classes.card} ${
        props.happened === 'true' ? classes['card-black'] : ''
      }`}
    >
      <button onClick={onDeleteHandler} className={classes.btnClose}>
        &#10006;
      </button>
      <div className={classes.date}>
        <h3
          className={
            props.today === 'true'
              ? classes.withinSevenDays
              : props.withinThreeDays === 'true'
              ? classes.withinSevenDays
              : ''
          }
        >
          {props.today === 'true' ? 'TODAY' : props.dayName}
        </h3>
        <h4>{props.date}</h4>
      </div>
      <TransitionGroup component='ul' className={classes.list}>
        {props.text.map(task => (
          <CSSTransition key={task.idTask} classNames='fade' timeout={300}>
            <CardElement
              key={task.idTask}
              id={props.id}
              text={task}
              onTaskDelete={props.onTaskDelete}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Card;

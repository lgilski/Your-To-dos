import { Fragment } from 'react';
import classes from './Card.module.css';
import CardElement from './CardElement';

const Card = function (props) {
  const onDeleteHandler = function () {
    props.onDelete(props.id);
  };

  return (
    <Fragment>
      {props.withinThreeDays === 'true' && (
        <div key={props.id} className={classes.card}>
          <button onClick={onDeleteHandler} className={classes.btnClose}>
            &#10006;
          </button>
          <div className={classes.date}>
            <h3 className={classes.withinSevenDays}>{props.dayName}</h3>
            <h4>{props.date}</h4>
          </div>
          <ul className={classes.list}>
            {props.text.map(task => (
              <CardElement
                key={task.idTask}
                id={props.id}
                text={task}
                onTaskDelete={props.onTaskDelete}
              />
            ))}
          </ul>
        </div>
      )}

      {props.happened === 'true' && (
        <div
          key={props.id}
          className={`${classes.card} ${classes['card-black']}`}
        >
          <button onClick={onDeleteHandler} className={classes.btnClose}>
            &#10006;
          </button>
          <div className={classes.date}>
            <h3>{props.dayName}</h3>
            <h4>{props.date}</h4>
          </div>
          <ul className={classes.list}>
            {props.text.map(task => (
              <CardElement
                key={task.idTask}
                id={props.id}
                text={task}
                onTaskDelete={props.onTaskDelete}
              />
            ))}
          </ul>
        </div>
      )}

      {props.today === 'true' && (
        <div key={props.id} className={`${classes.card}`}>
          <button onClick={onDeleteHandler} className={classes.btnClose}>
            &#10006;
          </button>
          <div className={classes.date}>
            <h3 className={classes.withinSevenDays}>TODAY</h3>
            <h4>{props.date}</h4>
          </div>
          <ul className={classes.list}>
            {props.text.map(task => (
              <CardElement
                key={task.idTask}
                id={props.id}
                text={task}
                onTaskDelete={props.onTaskDelete}
              />
            ))}
          </ul>
        </div>
      )}

      {/* {props.tomorrow === 'true' && (
        <div key={props.id} className={`${classes.card}`}>
          <button onClick={onDeleteHandler} className={classes.btnClose}>
            &#10006;
          </button>
          <div className={classes.date}>
            <h3 className={classes.withinSevenDays}>TOMORROW</h3>
            <h4>{props.date}</h4>
          </div>
          <ul className={classes.list}>
            {props.text.map(task => (
              <CardElement
                key={task.idTask}
                id={props.id}
                text={task}
                onTaskDelete={props.onTaskDelete}
              />
            ))}
          </ul>
        </div>
      )} */}

      {props.withinThreeDays !== 'true' &&
        props.happened !== 'true' &&
        props.today !== 'true' && (
          // props.tomorrow !== 'true' &&
          <div key={props.id} className={classes.card}>
            <button onClick={onDeleteHandler} className={classes.btnClose}>
              &#10006;
            </button>
            <div className={classes.date}>
              <h3>{props.dayName}</h3>
              <h4>{props.date}</h4>
            </div>
            <ul className={classes.list}>
              {props.text.map(task => (
                <CardElement
                  key={task.idTask}
                  id={props.id}
                  text={task}
                  onTaskDelete={props.onTaskDelete}
                />
              ))}
            </ul>
          </div>
        )}
    </Fragment>
  );
};

export default Card;

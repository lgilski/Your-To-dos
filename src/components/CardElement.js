import classes from './CardElement.module.css';

const CardElement = function (props) {
  const onDeleteTaskFromCardHandler = function () {
    props.onTaskDelete(props.text.idTask, props.id);
  };

  return (
    <div className={classes['list-element']}>
      <li key={props.text.idTask}>{props.text.goal}</li>
      <button
        onClick={onDeleteTaskFromCardHandler}
        className={classes['btnClose-small']}
      >
        &#10006;
      </button>
    </div>
  );
};

export default CardElement;

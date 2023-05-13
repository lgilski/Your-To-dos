import { dataActions } from '../store';
import classes from './TaskComponent.module.css';

import { useDispatch } from 'react-redux';

/**
 * @param {{ task: Task, cardId: string }} props
 */
const CardElement = function (props) {
  const { task, cardId } = props;
  const dispatch = useDispatch();

  const onDeleteTask = function () {
    dispatch(dataActions.deleteTask({ taskId: task.id, cardId }));
  };

  return (
    <div className={classes['list-element']}>
      <li>{task.content}</li>
      <button onClick={onDeleteTask} className={classes['btnClose-small']}>
        &#10006;
      </button>
    </div>
  );
};

export default CardElement;

import { dataActions } from '../../../store';
import CloseButton from '../../common/CloseButton/CloseButton';
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
      <CloseButton
        onClick={onDeleteTask}
        color={'darkBlue'}
        size={'small'}
        className={classes['btnClose-small']}
      />
      {/* <button onClick={onDeleteTask} className={classes['btnClose-small']}>
        &#10006;
      </button> */}
    </div>
  );
};

export default CardElement;

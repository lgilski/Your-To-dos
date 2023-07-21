import clsx from '../../../utils/clsx';
import CloseButton from '../../common/CloseButton/CloseButton';
import classes from './TaskComponent.module.css';

import { useDispatch } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd';
import { cardActions } from '../../../store/card';
import { Task } from '@/types';

const CardElement = function ({
  task,
  cardId,
  index,
}: {
  task: Task;
  cardId: string;
  index: number;
}) {
  const dispatch = useDispatch();

  const onDeleteTask = function () {
    dispatch(cardActions.deleteTask({ taskId: task.id, cardId }));
  };

  const markAsDone = function () {
    dispatch(cardActions.markTaskAsDone({ taskId: task.id, cardId }));
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={classes.listElement}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          data-isdragging={snapshot.isDragging.toString()}
        >
          <button
            onClick={markAsDone}
            className={clsx(
              classes.checkBox,
              task.done && classes.done
            )}
          >
            <ion-icon name='checkmark-outline' />
            {/* <CheckmarkOutline
              cssClasses={classes.icon}
              color={'#fff'}
              height='20px'
              width='20px'
            /> */}
          </button>
          <li className={clsx(task.done && classes.doneText)}>
            {task.content}
          </li>
          <CloseButton
            onClick={onDeleteTask}
            color={'darkBlue'}
            size={'small'}
            className={classes.btnCloseSmall}
          />
        </div>
      )}
    </Draggable>
  );
};

export default CardElement;

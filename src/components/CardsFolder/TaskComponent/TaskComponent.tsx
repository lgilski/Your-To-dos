import clsx from '../../../utils/clsx';

import { useDispatch } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd';
import { cardActions } from '../../../store/card';
import { Task } from '@/types';
import { useRef, useEffect, useState } from 'react';

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

  const [editable, setEditable] = useState(false);
  const textAreaRef = useRef<HTMLParagraphElement>(null);

  const onDeleteTask = function () {
    dispatch(cardActions.deleteTask({ taskId: task.id, cardId }));
  };

  const markAsDone = function () {
    dispatch(cardActions.markTaskAsDone({ taskId: task.id, cardId }));
  };

  const editTask = function () {
    setEditable((prevState) => !prevState);
  };

  const EnterPress = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      editTask();

      dispatch(
        cardActions.updateTask({
          taskId: task.id,
          cardId,
          value: e.target.innerText,
        })
      );
    }
  };

  const onBlur = (e: any) => {
    editTask();

    dispatch(
      cardActions.updateTask({
        taskId: task.id,
        cardId,
        value: e.target.innerText,
      })
    );
  };

  const handleDoubleClick = function (e: any) {
    if (e.detail === 2) {
      editTask();
    }
  };

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current!.focus();

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(textAreaRef.current!);
      range.collapse(false);
      selection!.removeAllRanges();
      selection!.addRange(range);
    }
  }, [editable]);

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          className={clsx(
            'relative flex flex-row gap-1 w-[95%] pt-3 px-2 pb-2.5 mb-2 text-lg text-grey-900 break-words group bg-white border border-solid border-grey-200 rounded-lg shadow-sm hover:bg-grey-050 hover:shadow-md dark:hover:bg-grey-700 dark:bg-grey-800 dark:text-grey-050 dark:border-grey-600 transition-colors duration-300'
          )}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          data-isdragging={snapshot.isDragging.toString()}
        >
          <button
            onClick={markAsDone}
            className={clsx(
              'cursor-pointer  border-2 border-solid border-black dark:border-white rounded transition-colors w-5 h-5 [&_ion-icon]:w-5 [&_ion-icon]:h-5 [&_ion-icon]:text-white',
              task.done
                ? 'border-none [&_ion-icon]:opacity-100 bg-orange-400'
                : 'border-2 [&_ion-icon]:opacity-0 bg-transparent'
            )}
          >
            <ion-icon name='checkmark-outline' />
          </button>
          <p
            className={clsx(
              task.done && 'text-grey-400 line-through',
              `leading-[22px] h-full border-none text-lg w-[100%] resize-none font-['Roboto'] outline-none min-w-[40%] ${
                editable && 'cursor-text'
              }`
            )}
            suppressContentEditableWarning={true}
            contentEditable={editable}
            onKeyDown={EnterPress}
            ref={textAreaRef}
            onBlur={onBlur}
            onClick={handleDoubleClick}
          >
            {task.content}
          </p>
          {!editable && (
            <div className='absolute top-2 right-2 flex duration-300 opacity-0 group-hover:opacity-100 [&_ion-icon]:align-middle [&_ion-icon]:text-xl [&_ion-icon]:py-0.5 [&_ion-icon]:px-1 shadow'>
              <button
                className='border border-solid border-grey-200 text-base leading-none border-r bg-white rounded-l duration-300 hover:bg-lime-green-100 hover:text-lime-green-900 cursor-pointer'
                onClick={editTask}
              >
                <ion-icon name='create-outline' />
              </button>
              <button
                className='border border-solid border-grey-200 bg-white border-l-0 text-base leading-none rounded-r hover:text-red-500 hover:bg-red-100 duration-300 cursor-pointer'
                onClick={onDeleteTask}
              >
                <ion-icon name='close-outline' />
              </button>
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default CardElement;

import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../../store/timer';
import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import TimerComponent from '../TimerComponent/TimerComponent';

import classes from './Timers.module.css';
import { flushSync } from 'react-dom';

function Timers() {
  const dispatch = useDispatch();

  const timers = useSelector(state => state.timers.timers);
  const formatedTimers = JSON.parse(localStorage.getItem('timers'));
  const countDownMethod = useSelector(state => state.timers.countDownMethod);

  // const resultDrop = {
  //   draggableId: timer.id,
  //   type: 'TYPE',
  //   reason: 'DROP',
  //   source: {
  //     droppableId: column,
  //     index: 0,
  //   },
  //   destination: {
  //     droppableId: column,
  //     index: 1,
  //   },
  // };

  const onDragEnd = function (result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Same as cards in this case
    flushSync(() => {
      dispatch(timerActions.moveTimers({ destination, source, draggableId }));
    });
  };

  const onDragStart = function (result) {
    if (countDownMethod === 'Start in sequence') {
      dispatch(timerActions.stopTimersInSquence());
    }
  };

  useEffect(() => {
    if (formatedTimers !== null) {
      dispatch(timerActions.setTimers(formatedTimers));
    } else {
      dispatch(timerActions.setTimers([]));
    }
  }, []);

  return (
    // <DndProvider backend={HTML5Backend}>
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId={'timersColumn'}>
        {(provided, snapshot) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes.timersWrapper}
          >
            {timers.map((timer, index) => (
              <TimerComponent key={timer.id} timerData={timer} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
    // </DndProvider>
  );
}

export default Timers;

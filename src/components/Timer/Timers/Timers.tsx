import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../../store/timer';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import TimerComponent from '../TimerComponent/TimerComponent';

import classes from './Timers.module.css';
import { flushSync } from 'react-dom';
import TimerCountDownMethod from '../ChoseCountDownMethod/ChoseCountDownMethod';
import Button from '../../common/Button/Button';

import TimerForm from '../TimerForm/TimerForm';
import { WholeState } from '@/types';

function Timers() {
  const dispatch = useDispatch();

  const formatedTimers = JSON.parse(localStorage.getItem('timers')!);

  const timers = useSelector((state: WholeState) => state.timers.timers);
  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );

  const [showForm, setShowForm] = useState(false);
  const [checkFirst, setCheckFirst] = useState(1);

  const showFormHandler = function () {
    setShowForm((prevState) => !prevState);
  };

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

  const onDragEnd = function (result: any) {
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

  const onDragStart = function () {
    if (countDownMethod === 'Start in sequence') {
      dispatch(timerActions.stopTimersInSquence());
    }
  };

  useEffect(() => {
    if (formatedTimers !== null && checkFirst === 1) {
      dispatch(timerActions.setTimers(formatedTimers));
      setCheckFirst((preavState) => preavState++);
    } else {
      dispatch(timerActions.setTimers([]));
    }
  }, [dispatch, formatedTimers, checkFirst]);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className={classes.contentWrapper}>
        {showForm && (
          <TimerForm modal={false} showFormHandler={showFormHandler} />
        )}
        <div className={classes.timerToolbar}>
          <TimerCountDownMethod />
          <Button
            onClick={showFormHandler}
            className={classes.timerAddBtn}
            color='Green'
            variant='RoundedSquare'
          >
            Add
          </Button>
        </div>
        <Droppable droppableId={'timersColumn'}>
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={classes.timersWrapper}
            >
              {timers.map((timer, index) => (
                <TimerComponent
                  key={timer.id}
                  timerData={timer}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default Timers;

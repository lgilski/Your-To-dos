import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../../../store/timer';
import { useEffect, useState, useMemo } from 'react';
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
  const [totalTime, setTotalTime] = useState<number>(0);
  const totalHours = Math.floor(totalTime / 3600);
  const totalMinutes = Math.floor(
    (totalTime - totalHours * 3600) / 60
  );
  const totalSeconds =
    totalTime - totalHours * 3600 - totalMinutes * 60;

  const timers = useSelector(
    (state: WholeState) => state.timers.timers
  );
  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );

  const [showForm, setShowForm] = useState(false);

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
      dispatch(
        timerActions.moveTimers({ destination, source, draggableId })
      );
    });
  };

  const onDragStart = function () {
    if (countDownMethod === 'Start in sequence') {
      dispatch(timerActions.stopTimersInSquence());
    }
  };

  // /////////////////////////////
  useEffect(() => {
    if (formatedTimers !== null) {
      dispatch(timerActions.setTimers(formatedTimers));
    } else {
      dispatch(timerActions.setTimers([]));
    }
  }, [dispatch]);

  // .timersWrapper {
  //   display: flex;
  //   flex-direction: column;
  //   max-width: 700px;
  //   padding-top: 16px;
  //   margin: auto;
  //   /* gap: 32px; */
  // }

  // .timerToolbar {
  //   /* width: 90%; */
  //   display: flex;
  //   justify-content: space-between;
  //   padding: 0 8px 8px;
  //   margin: auto;
  //   border-bottom: 1px solid var(--cool-grey-200);
  // }

  // .timerAddBtn {
  //   font-size: var(--text-big);
  // }

  // .buttonsContainer {
  //   justify-content: center;
  //   margin-top: 12px;
  // }

  useEffect(() => {
    const time = timers.reduce(
      (acc, currentValue) => acc + currentValue.timeInSeconds,
      0
    );

    setTotalTime(time);
  }, [timers]);

  console.log(timers);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className='max-w-2xl py-2 px-8 m-auto bg-white border border-solid border-cool-grey-200 rounded-md dark:bg-cool-grey-900 dark:border-cool-grey-600'>
        {showForm && (
          <TimerForm
            modal={false}
            showFormHandler={showFormHandler}
          />
        )}
        <div
          className={
            'flex justify-between px-2 pb-2 mx-auto border-x-0 border-t-0 border-b border-solid border-cool-grey-200 dark:border-cool-grey-600'
          }
        >
          <TimerCountDownMethod />
          {/* <Button
            onClick={showFormHandler}
            className={classes.timerAddBtn}
            color='Green'
            variant='RoundedSquare'
          >
            Add
          </Button> */}
          <button
            onClick={showFormHandler}
            className={
              'px-4 py-2 text-lg rounded-md border-none bg-orange-vivid-700 hover:bg-orange-vivid-800 duration-300 cursor-pointer text-orange-vivid-050'
            }
            // color='Green'
            // variant='RoundedSquare'
          >
            Add
          </button>
        </div>
        {totalTime > 0 && (
          <div className='flex dark:text-white bg-orange-vivid-050 dark:bg-cool-grey-800 mt-4 rounded-md py-2 justify-center text-lg gap-2'>
            <p className=''>Total time</p>
            <p className=''>
              {totalHours}:
              {totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes}:
              {totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}
            </p>
          </div>
        )}
        {timers.length > 0 ? (
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
        ) : (
          <div className=' text-center py-20'>
            <h4 className='py-4 text-5xl text-cool-grey-800 dark:text-white text-center rounded-lg '>
              There are no timers yet
            </h4>
            <p className='text-lg mb-6 dark:text-cool-grey-400'>
              So why don&apos;t you try one out?
            </p>
            <button
              onClick={showFormHandler}
              className='rounded-md border-none px-4 py-2 bg-orange-vivid-700 hover:bg-orange-vivid-800 duration-300 text-lg cursor-pointer text-orange-vivid-050'
            >
              Create timer
            </button>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}

export default Timers;

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { timerActions } from '../../store/timer';

import ProgressBar from './ProgressBar';
import TimerForm from './TimerForm';

import classes from './TimerComponent.module.css';

import { useDrag, useDrop } from 'react-dnd';

const ModalWindow = function ({ timerId, timerData }) {
  return <TimerForm modal={true} timerId={timerId} timerData={timerData} />;
};

const TimerComponent = props => {
  const countDownTime = useRef(null);
  const dispatch = useDispatch();

  const countDownMethod = useSelector(state => state.timers.countDownMethod);
  const resetAllTimers = useSelector(state => state.timers.resetAllTimers);
  const startSequence = useSelector(state => state.timers.startSequence);
  const activeIndex = useSelector(state => state.timers.activeIndex);

  const [started, setStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const timerData = props.timerData;
  const index = props.index;

  const completeTimeInSeconds =
    timerData.hours * 60 * 60 + timerData.minutes * 60 + timerData.seconds * 1;

  const [timeInSeconds, setTimeInSeconds] = useState(completeTimeInSeconds);

  let currentHours = Math.floor(timeInSeconds / (60 * 60));
  let currentMinutes = Math.floor(timeInSeconds / 60 - currentHours * 60);
  let currentSeconds = Math.floor(
    timeInSeconds - (currentHours * 60 * 60 + currentMinutes * 60)
  );

  const startTimer = () => {
    if (timeInSeconds === 0) {
      resetTimer();
    }

    setStarted(true);

    countDownTime.current = setInterval(() => {
      setTimeInSeconds(prevstate => prevstate - 1);
    }, 1000);
  };

  const stopTimer = function () {
    clearInterval(countDownTime.current);
    setStarted(false);
  };

  const resetTimer = function () {
    setTimeInSeconds(completeTimeInSeconds);
    setStarted(false);
  };

  const deleteHandler = function () {
    dispatch(timerActions.deleteTimer(timerData.id));
  };

  const editTimerHandler = function () {
    if (countDownMethod === 'Start in sequence') {
      dispatch(timerActions.stopTimersInSquence());
    }

    stopTimer();
    setShowModal(true);
  };

  const closeModal = function () {
    setShowModal(false);
  };

  useEffect(() => {
    if (!startSequence) {
      stopTimer();
    } else if (index === activeIndex) {
      startTimer();
    }
  }, [activeIndex, startSequence]);

  useEffect(() => {
    if (timeInSeconds === 0) {
      stopTimer();
    }

    if (resetAllTimers) {
      resetTimer();
      dispatch(timerActions.resetTimers(false));
    }

    if (
      timeInSeconds === 0 &&
      countDownMethod === 'Start in sequence' &&
      index === activeIndex
    ) {
      dispatch(timerActions.incrementActiveIndexInSequence());
    }
  }, [
    timeInSeconds,
    countDownMethod,
    index,
    activeIndex,
    dispatch,
    resetAllTimers,
  ]);

  useEffect(() => {
    resetTimer();
  }, [timerData]);

  ////////////////////////////////

  // Drag implementation

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'timer',
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action

      if (countDownMethod === 'Start in sequence') {
        dispatch(timerActions.stopTimersInSquence());
      }

      dispatch(timerActions.dragedTimer({ dragIndex, hoverIndex }));

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const id = timerData.id;

  const [{ isDragging }, drag] = useDrag({
    type: 'timer',
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      style={{ opacity }}
      ref={ref}
      data-handler-id={handlerId}
      className={classes.timer}
    >
      {showModal && (
        <>
          {createPortal(
            <ModalWindow
              timerId={timerData.id}
              timerData={{
                hours: timerData.hours,
                minutes: timerData.minutes,
                seconds: timerData.seconds,
                timerName: timerData.timerName,
                closeModal,
              }}
            />,
            document.getElementById('modal-root')
          )}
          {createPortal(
            <div
              onClick={closeModal}
              className={classes['timer--modal-blur']}
            />,
            document.getElementById('overlay-root')
          )}
        </>
      )}
      <button onClick={deleteHandler} className={classes['timer-close--btn']}>
        &#10006;
      </button>
      <div className={classes['timer-wrapper']}>
        <div>
          <h4 onClick={editTimerHandler} className={classes['timer-time']}>
            {currentHours.toString().length === 1
              ? `0${currentHours}`
              : currentHours}
            :
            {currentMinutes.toString().length === 1
              ? `0${currentMinutes}`
              : currentMinutes}
            :
            {currentSeconds.toString().length === 1
              ? `0${currentSeconds}`
              : currentSeconds}
          </h4>
          <p className={classes['timer-name']}>
            {timerData.timerName} (
            {timerData.hours.length === 0
              ? '00'
              : timerData.hours.toString().length <= 1
              ? `0${timerData.hours}`
              : timerData.hours}
            :
            {timerData.minutes.length === 0
              ? '00'
              : timerData.minutes.toString().length <= 1
              ? `0${timerData.minutes}`
              : timerData.minutes}
            :
            {timerData.seconds.length === 0
              ? '00'
              : timerData.seconds.toString().length <= 1
              ? `0${timerData.seconds}`
              : timerData.seconds}
            )
          </p>
        </div>
        {countDownMethod === 'Manually' && (
          <div className={classes['timer-buttons']}>
            {!started && (
              <button
                className={classes['timer-buttons--start']}
                onClick={startTimer}
              >
                start
              </button>
            )}
            {started && (
              <button
                className={classes['timer-buttons--stop']}
                onClick={stopTimer}
              >
                stop
              </button>
            )}
            {!started && (
              <button
                className={classes['timer-buttons--reset']}
                onClick={resetTimer}
              >
                reset
              </button>
            )}
          </div>
        )}
      </div>
      <ProgressBar
        bgcolor={'#3ab09e'}
        completed={(timeInSeconds / completeTimeInSeconds) * 100}
      />
    </div>
  );
};

export default TimerComponent;

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import ProgressBar from './ProgressBar';

import classes from './TimerComponent.module.css';
import { useDispatch } from 'react-redux';
import { timerActions } from '../store/timer';
import TimerForm from './TimerForm';

const ModalWindow = function ({ timerId, timerData }) {
  console.log(timerData);

  return <TimerForm modal={true} timerId={timerId} timerData={timerData} />;
};

const TimerComponent = props => {
  const dispatch = useDispatch();

  const countDownTime = useRef(null);
  const timerData = props.timerData;

  const completeTimeInSeconds =
    timerData.hours * 60 * 60 + timerData.minutes * 60 + timerData.seconds * 1;

  const [started, setStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    // clearInterval(countDownTime.current);
    setTimeInSeconds(completeTimeInSeconds);
    setStarted(false);
  };

  const deleteHandler = function () {
    dispatch(timerActions.deleteTimer(timerData.id));
  };

  const editTimerHandler = function () {
    stopTimer();
    setShowModal(true);
  };

  const closeModal = function () {
    setShowModal(false);
  };

  useEffect(() => {
    if (timeInSeconds === 0) {
      stopTimer();
    }
  }, [timeInSeconds]);

  useEffect(() => {
    resetTimer();
  }, [timerData]);

  return (
    <div className={classes.timer}>
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
          <div onClick={closeModal} className={classes['timer--modal-blur']} />
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
          {/* timerData.hours.length === 0 ? */}
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
      </div>

      <ProgressBar
        bgcolor={'#3ab09e'}
        completed={(timeInSeconds / completeTimeInSeconds) * 100}
      />
    </div>
  );
};

export default TimerComponent;

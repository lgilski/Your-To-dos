import { useDispatch, useSelector } from 'react-redux';

import classes from './ChoseCountDownMethod.module.css';

import { timerActions } from '../../../store/timer';
import Button from '../../common/Button/Button';

import * as React from 'react';

function TimerCountDownMethod() {
  const dispatch = useDispatch();

  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );
  const startedSequence = useSelector(
    (state: WholeState) => state.timers.startSequence
  );

  const startSequence = function () {
    dispatch(timerActions.startTimersInSquence(null));
  };

  const stopTimers = function () {
    dispatch(timerActions.stopTimersInSquence(null));
  };

  const resetTimers = function () {
    dispatch(timerActions.resetTimers(true));
  };

  const setMethod = function (e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(timerActions.setTimerCountDownMethod(e.target.value));
    dispatch(timerActions.stopTimersInSquence(null));
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.chooseCountDownType}>
        <div>
          <select
            defaultValue={countDownMethod}
            onChange={setMethod}
            id='countDownType'
            name='countDownType'
          >
            <option>Manually</option>
            <option>Start in sequence</option>
          </select>
        </div>
      </form>
      {countDownMethod === 'Start in sequence' && (
        <div className={classes.btns}>
          {!startedSequence && (
            <Button variant='circle' color='start' onClick={startSequence}>
              <ion-icon name='play' />
            </Button>
          )}
          {startedSequence && (
            <Button variant='circle' color='stop' onClick={stopTimers}>
              <ion-icon name='pause' />
            </Button>
          )}
          {!startedSequence && (
            <Button variant='circle' color='reset' onClick={resetTimers}>
              <ion-icon name='refresh' />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default TimerCountDownMethod;

import { useDispatch, useSelector } from 'react-redux';

import classes from './ChoseCountDownMethod.module.css';

import { timerActions } from '../../../store/timer';
import Button from '../../common/Button/Button';

import { WholeState } from '@/types';

function TimerCountDownMethod() {
  const dispatch = useDispatch();

  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );
  const startedSequence = useSelector(
    (state: WholeState) => state.timers.startSequence
  );

  const startSequence = function () {
    dispatch(timerActions.startTimersInSquence());
  };

  const stopTimers = function () {
    dispatch(timerActions.stopTimersInSquence());
  };

  const resetTimers = function () {
    dispatch(timerActions.resetTimers(true));
  };

  const setMethod = function (
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    dispatch(timerActions.setTimerCountDownMethod(e.target.value));
    dispatch(timerActions.stopTimersInSquence());
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
            <Button
              variant='Circle'
              color='Start'
              onClick={startSequence}
            >
              <ion-icon name='play' />
            </Button>
          )}
          {startedSequence && (
            <Button
              variant='Circle'
              color='Stop'
              onClick={stopTimers}
            >
              <ion-icon name='pause' />
            </Button>
          )}
          {!startedSequence && (
            <Button
              variant='Circle'
              color='Reset'
              onClick={resetTimers}
            >
              <ion-icon name='refresh' />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default TimerCountDownMethod;

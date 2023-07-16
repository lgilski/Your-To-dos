import { useSelector } from 'react-redux';
import DisplayTime from '../DisplayTime';

import classes from './TimerContent.module.css';
import Button from '../../common/Button/Button';
import { Timer, WholeState } from '@/types';

function TimerContent({
  functions,
  timerData,
  isCounting,
  currentTime,
}: {
  functions: {
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
    deleteTimer: () => void;
    editTimer: () => void;
    closeModal: () => void;
  };
  timerData: Timer;
  isCounting: boolean;
  currentTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}) {
  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );

  return (
    <div className={classes.timerWrapper}>
      <div>
        <h4 onClick={functions.editTimer} className={classes.timerTime}>
          <DisplayTime time={currentTime.hours} />
          :
          <DisplayTime time={currentTime.minutes} />
          :
          <DisplayTime time={currentTime.seconds} />
        </h4>
        <p className={classes.timerName}>
          {timerData.timerName} (
          <DisplayTime time={timerData.hours.toString()} startingTime={true} />
          :
          <DisplayTime time={timerData.minutes} startingTime={true} />
          :
          <DisplayTime time={timerData.seconds} startingTime={true} />)
        </p>
      </div>
      {countDownMethod === 'Manually' && (
        <div className={classes.timerButtons}>
          {!isCounting && (
            <Button
              variant='Circle'
              color='Start'
              onClick={functions.startTimer}
              className={classes.timerButton}
            >
              <ion-icon name='play' />
            </Button>
          )}
          {isCounting && (
            <Button
              variant='Circle'
              color='Stop'
              onClick={functions.stopTimer}
              className={classes.timerButton}
            >
              <ion-icon name='pause' />
            </Button>
          )}
          {!isCounting && (
            <Button
              variant='Circle'
              color='Reset'
              onClick={functions.resetTimer}
              className={classes.timerButton}
            >
              <ion-icon name='refresh' />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default TimerContent;

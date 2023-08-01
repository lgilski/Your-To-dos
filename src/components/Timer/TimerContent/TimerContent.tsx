import { useSelector } from 'react-redux';
import DisplayTime from '../DisplayTime';

import classes from './TimerContent.module.css';
import Button from '../../common/Button/Button';
import { Timer, WholeState } from '@/types';

function TimerContent({
  functions,
  timerData,
  currentTime,
  isCounting,
  index,
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
  currentTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  isCounting: boolean;
  index: number;
}) {
  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );
  // const isCounting = useSelector(
  //   (state: WholeState) => state.timers.timers[index].isCounting
  // );
  const timeRemaining = useSelector(
    (state: WholeState) => state.timers.timers[index].timeRemaining
  );

  // .timerButton {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }

  return (
    <div className={classes.timerWrapper}>
      <div>
        <h4
          onClick={functions.editTimer}
          className={classes.timerTime}
        >
          <DisplayTime time={currentTime.hours} />
          :
          <DisplayTime time={currentTime.minutes} />
          :
          <DisplayTime time={currentTime.seconds} />
        </h4>
        <p className={classes.timerName}>
          {timerData.timerName} (
          <DisplayTime
            time={timerData.hours.toString()}
            startingTime={true}
          />
          :
          <DisplayTime time={timerData.minutes} startingTime={true} />
          :
          <DisplayTime time={timerData.seconds} startingTime={true} />
          )
        </p>
      </div>
      {countDownMethod === 'Manually' && (
        <div className={classes.timerButtons}>
          {!isCounting && (
            <Button
              variant='Circle'
              color='Start'
              onClick={functions.startTimer}
              className={`${
                !timeRemaining ? 'hidden' : 'flex'
              } items-center justify-center`}
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

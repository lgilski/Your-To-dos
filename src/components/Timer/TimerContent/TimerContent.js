import { useSelector } from 'react-redux';
import DisplayTime from '../DisplayTime';

import classes from './TimerContent.module.css';
import Button from '../../common/Button/Button';

function TimerContent({ functions, timerData, isCounting, currentTime }) {
  const countDownMethod = useSelector(state => state.timers.countDownMethod);

  return (
    <div className={classes['timer-wrapper']}>
      <div>
        <h4 onClick={functions.editTimer} className={classes['timer-time']}>
          <DisplayTime time={currentTime.hours} />
          :
          <DisplayTime time={currentTime.minutes} />
          :
          <DisplayTime time={currentTime.seconds} />
        </h4>
        <p className={classes['timer-name']}>
          {timerData.timerName} (
          <DisplayTime time={timerData.hours} startingTime={true} />
          :
          <DisplayTime time={timerData.minutes} startingTime={true} />
          :
          <DisplayTime time={timerData.seconds} startingTime={true} />)
        </p>
      </div>
      {countDownMethod === 'Manually' && (
        <div className={classes['timer-buttons']}>
          {!isCounting && (
            <Button
              variant='circle'
              color='start'
              onClick={functions.startTimer}
              className={classes['timer-button']}
            >
              <ion-icon name='play' />
            </Button>
          )}
          {isCounting && (
            <Button
              variant='circle'
              color='stop'
              onClick={functions.stopTimer}
              className={classes['timer-button']}
            >
              <ion-icon name='pause' />
            </Button>
          )}
          {!isCounting && (
            <Button
              variant='circle'
              color='reset'
              onClick={functions.resetTimer}
              className={classes['timer-button']}
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

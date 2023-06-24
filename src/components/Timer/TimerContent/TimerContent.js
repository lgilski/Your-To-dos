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
            >
              start
            </Button>
          )}
          {isCounting && (
            <Button variant='circle' color='stop' onClick={functions.stopTimer}>
              stop
            </Button>
          )}
          {!isCounting && (
            <Button
              variant='circle'
              color='reset'
              onClick={functions.resetTimer}
            >
              reset
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default TimerContent;

import React from 'react';

import classes from './TimerComponent.module.css';

import ProgressBar from '../../UI/ProgressBar';
import Modal from '../Modal/ModalWindow';
import TimerContent from '../TimerContent/TimerContent';
import { useTimer } from '../../../hooks/useTimer';
import CloseButton from '../../common/CloseButton/CloseButton';

const TimerComponent = React.forwardRef((props, ref) => {
  const timerData = props.timerData;
  const index = props.index;

  const completeTimeInSeconds =
    timerData.hours * 60 * 60 + timerData.minutes * 60 + timerData.seconds * 1;

  const { functions, isCounting, showModal, timeInSeconds } = useTimer({
    completeTimeInSeconds,
    timerData,
    index,
  });

  let currentHours = Math.floor(timeInSeconds / (60 * 60));
  let currentMinutes = Math.floor(timeInSeconds / 60 - currentHours * 60);
  let currentSeconds = Math.floor(
    timeInSeconds - (currentHours * 60 * 60 + currentMinutes * 60)
  );

  const opacity = props.opacity;

  return (
    <div ref={ref} className={classes.timer} style={{ opacity }}>
      <CloseButton
        className={classes['timer-close--btn']}
        onClick={functions.deleteTimer}
        color='orange'
        size='big'
      />
      {showModal && (
        <Modal
          timerId={timerData.id}
          timerData={{
            hours: timerData.hours,
            minutes: timerData.minutes,
            seconds: timerData.seconds,
            timerName: timerData.timerName,
            closeModal: functions.closeModal,
          }}
        />
      )}
      <TimerContent
        functions={functions}
        timerData={timerData}
        isCounting={isCounting}
        currentTime={{
          hours: currentHours,
          minutes: currentMinutes,
          seconds: currentSeconds,
        }}
      />
      <ProgressBar
        bgcolor={'#6c3b10'}
        completed={(timeInSeconds / completeTimeInSeconds) * 100}
      />
    </div>
  );
});

export default TimerComponent;

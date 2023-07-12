import classes from './TimerComponent.module.css';

import ProgressBar from '../../UI/ProgressBar';
import TimerContent from '../TimerContent/TimerContent';
import { useTimer } from '../../../hooks/useTimer';
import CloseButton from '../../common/CloseButton/CloseButton';
import { Draggable } from 'react-beautiful-dnd';
import TimerForm from '../TimerForm/TimerForm';

const TimerComponent = function ({
  timerData,
  index,
}: {
  timerData: Timer;
  index: number;
}) {
  const completeTimeInSeconds =
    Number(timerData.hours) * 60 * 60 +
    Number(timerData.minutes) * 60 +
    Number(timerData.seconds);

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

  return (
    <Draggable key={timerData.id} draggableId={timerData.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={classes.timer}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          data-isdragging={snapshot.isDragging.toString()}
        >
          <CloseButton
            className={classes['timer-close--btn']}
            onClick={functions.deleteTimer}
            color='orange'
            size='big'
          />
          {showModal && (
            <TimerForm
              showFormHandler={functions.closeModal}
              modal={true}
              timerData={timerData}
              closeModal={functions.closeModal}
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
      )}
    </Draggable>
  );
};

export default TimerComponent;

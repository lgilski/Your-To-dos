import Button from '../../../common/Button/Button';

import classes from './StopwatchButtons.module.css';

function StopwatchButtons({
  isStoped,
  startStopwatch,
  stopStopwatch,
  resetStopwatch,
}: {
  isStoped: boolean;
  startStopwatch: () => void;
  stopStopwatch: () => void;
  resetStopwatch: () => void;
}) {
  return (
    <div className={classes.buttons}>
      {isStoped && (
        <Button
          variant='circle'
          color='start'
          onClick={startStopwatch}
        >
          start
        </Button>
      )}
      {!isStoped && (
        <Button variant='circle' color='stop' onClick={stopStopwatch}>
          stop
        </Button>
      )}
      {isStoped && (
        <Button
          variant='circle'
          color='reset'
          onClick={resetStopwatch}
        >
          reset
        </Button>
      )}
    </div>
  );
}

export default StopwatchButtons;

import Button from '../../../UI/Button/Button';

import classes from './StopwatchButtons.module.css';

function StopwatchButtons({
  isStoped,
  startStopwatch,
  stopStopwatch,
  resetStopwatch,
}) {
  return (
    <div className={classes.buttons}>
      {isStoped && (
        <Button variant='circle' color='start' onClick={startStopwatch}>
          start
        </Button>
      )}
      {!isStoped && (
        <Button variant='circle' color='stop' onClick={stopStopwatch}>
          stop
        </Button>
      )}
      {isStoped && (
        <Button variant='circle' color='reset' onClick={resetStopwatch}>
          reset
        </Button>
      )}
    </div>
  );
}

export default StopwatchButtons;

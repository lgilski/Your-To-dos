import clsx from '@/utils/clsx';
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
    <div
      className={clsx(
        classes.buttons,
        '[&_ion-icon]:h-16 [&_ion-icon]:w-16 [&_ion-icon]:align-middle'
      )}
    >
      {isStoped && (
        <Button
          variant='Circle'
          color='Start'
          onClick={startStopwatch}
        >
          <ion-icon name='play' />
        </Button>
      )}
      {!isStoped && (
        <Button variant='Circle' color='Stop' onClick={stopStopwatch}>
          <ion-icon name='pause' />
        </Button>
      )}
      {isStoped && (
        <Button
          variant='Circle'
          color='Reset'
          onClick={resetStopwatch}
        >
          <ion-icon name='refresh' />
        </Button>
      )}
    </div>
  );
}

export default StopwatchButtons;

import { useRef, useState } from 'react';

import classes from './Stopwatch.module.css';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import StopwatchTime from './StopwatchTime/StopwatchTime';
import StopwatchButtons from './StopwatchButtons/StopwatchButtons';

function Stopwatch() {
  const stopwatchRef: { current: NodeJS.Timeout | undefined } =
    useRef(undefined);

  const [time, setTime] = useState(0);
  const [isStoped, setIsStoped] = useState(true);

  const startStopwatch = function () {
    setIsStoped(false);

    stopwatchRef.current = setInterval(() => {
      setTime((prevState) => prevState + 1);
    }, 10);
  };

  const stopStopwatch = function () {
    clearInterval(stopwatchRef!.current);
    setIsStoped(true);
  };

  const resetStopwatch = function () {
    setTime(0);
  };

  const currentSeconds = Math.floor(time / 100);
  const currentMiliseconds = time - currentSeconds * 100;
  const currentHours = Math.floor(currentSeconds / (60 * 60));
  const currentMinutes = Math.floor(
    currentSeconds / 60 - currentHours * 60
  );

  return (
    <>
      <SectionHeader
        className='pageTitleCenter'
        subheader='Stopwatch page'
        header='Start counting down'
        type='medium'
      />
      <div className={classes.stopwatch}>
        <StopwatchTime
          currentHours={currentHours}
          currentMinutes={currentMinutes}
          currentSeconds={currentSeconds}
          currentMiliseconds={currentMiliseconds}
        />
        <StopwatchButtons
          isStoped={isStoped}
          startStopwatch={startStopwatch}
          stopStopwatch={stopStopwatch}
          resetStopwatch={resetStopwatch}
        />
      </div>
    </>
  );
}

export default Stopwatch;

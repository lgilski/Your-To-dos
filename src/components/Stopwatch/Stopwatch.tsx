import { useMemo, useState } from 'react';

import StopwatchTime from './StopwatchTime/StopwatchTime';
import StopwatchButtons from './StopwatchButtons/StopwatchButtons';
import StopwatchLapTime from './StopwatchLapTime/StopwatchLapTime';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isStoped, setIsStoped] = useState(true);
  const [lapTime, setLapTime] = useState<any[]>([]);

  const stopwatch: Worker = useMemo(
    () => new Worker(new URL('stopwatchWorker.ts', import.meta.url)),
    []
  );

  const startStopwatch = function () {
    setIsStoped(false);

    stopwatch.postMessage(time);

    stopwatch.onmessage = (e: any) => {
      setTime(e.data);
    };
  };

  const stopStopwatch = function () {
    stopwatch.postMessage('stop');
    setIsStoped(true);
  };

  const resetStopwatch = function () {
    setTime(0);
    setLapTime([]);
  };

  const addLap = function () {
    setLapTime((prevState) => [
      ...prevState,
      {
        currentHours,
        currentMinutes,
        currentSeconds,
        currentMiliseconds,
      },
    ]);
  };

  const seconds = Math.floor(time / 100);

  const currentMiliseconds = time - seconds * 100;
  const currentHours = Math.floor(seconds / (60 * 60));
  const currentMinutes = Math.floor(seconds / 60 - currentHours * 60);
  const currentSeconds = Math.floor(
    seconds - (currentHours * 60 * 60 + currentMinutes * 60)
  );

  return (
    <div className='mx-auto max-w-3xl bg-white border border-grey-200 border-solid rounded-2xl overflow-hidden'>
      <div className='flex flex-col items-center p-5 '>
        <StopwatchTime
          currentHours={currentHours}
          currentMinutes={currentMinutes}
          currentSeconds={currentSeconds}
          currentMiliseconds={currentMiliseconds}
          className={'text-7xl mt-6 mb-10 [&_span]:text-6xl'}
        />
        <StopwatchButtons
          isStoped={isStoped}
          startStopwatch={startStopwatch}
          stopStopwatch={stopStopwatch}
          resetStopwatch={resetStopwatch}
          addLap={addLap}
        />
      </div>
      {lapTime.length !== 0 && <StopwatchLapTime lapTime={lapTime} />}
    </div>
  );
}

export default Stopwatch;

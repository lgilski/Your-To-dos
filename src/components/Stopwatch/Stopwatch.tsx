import StopwatchTime from './StopwatchTime/StopwatchTime';
import StopwatchButtons from './StopwatchButtons/StopwatchButtons';
import StopwatchLapTime from './StopwatchLapTime/StopwatchLapTime';
import { useSelector } from 'react-redux';
import { WholeState } from '@/types';
import useStopwatch from '@/hooks/useStopwatch';

function Stopwatch() {
  const currentTime = useSelector(
    (state: WholeState) => state.stopwatch.currentTime
  );
  const isCounting = useSelector(
    (state: WholeState) => state.stopwatch.isCounting
  );

  const lapTimes = useSelector(
    (state: WholeState) => state.stopwatch.lapTimes
  );

  const seconds = Math.floor(currentTime / 100);

  const currentMiliseconds = currentTime - seconds * 100;
  const currentHours = Math.floor(seconds / (60 * 60));
  const currentMinutes = Math.floor(seconds / 60 - currentHours * 60);
  const currentSeconds = Math.floor(
    seconds - (currentHours * 60 * 60 + currentMinutes * 60)
  );

  const functions = useStopwatch({
    currentHours,
    currentMiliseconds,
    currentMinutes,
    currentSeconds,
  });

  return (
    <div className='mx-auto max-w-3xl bg-white border border-grey-200 border-solid rounded-2xl overflow-hidden dark:bg-grey-900 dark:border-grey-600'>
      <div className='flex flex-col items-center p-5 '>
        <StopwatchTime
          currentHours={currentHours}
          currentMinutes={currentMinutes}
          currentSeconds={currentSeconds}
          currentMiliseconds={currentMiliseconds}
          className={
            'text-7xl dark:text-white mt-6 mb-10 [&_span]:text-6xl'
          }
        />
        <StopwatchButtons
          isStoped={!isCounting}
          startStopwatch={functions.startStopwatch}
          stopStopwatch={functions.stopStopwatch}
          resetStopwatch={functions.resetStopwatch}
          addLap={functions.addLap}
        />
      </div>
      {lapTimes.length !== 0 && (
        <StopwatchLapTime lapTime={lapTimes} />
      )}
    </div>
  );
}

export default Stopwatch;

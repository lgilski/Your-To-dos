import { stopwatchActions } from '@/store/stopwatch';
import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function useStopwatch({
  currentHours,
  currentMinutes,
  currentSeconds,
  currentMiliseconds,
}: {
  currentHours: number;
  currentMinutes: number;
  currentSeconds: number;
  currentMiliseconds: number;
}) {
  const ref: { current: NodeJS.Timeout | undefined } =
    useRef(undefined);

  const dispatch = useDispatch();

  // const currentTime = useSelector(
  //   (state: WholeState) => state.stopwatch.currentTime
  // );

  const [currentTime, setCurrentTime] = useState(0);

  let prevTime: number | undefined;
  let time = 0;

  const startStopwatch = function () {
    const innerTime = currentTime;

    dispatch(stopwatchActions.setIsCounting(true));

    ref.current = setInterval(() => {
      if (!prevTime) {
        prevTime = Date.now();
      }

      time = Math.floor(innerTime + (Date.now() - prevTime) / 10);

      // dispatch(stopwatchActions.setCurrentTime(time));
      setCurrentTime(time);
    }, 10);
  };

  const stopStopwatch = function () {
    dispatch(stopwatchActions.setIsCounting(false));
    clearInterval(ref.current);
  };

  const resetStopwatch = function () {
    dispatch(stopwatchActions.setCurrentTime(0));
    dispatch(stopwatchActions.resetLapTimes());
  };

  const addLap = function () {
    dispatch(
      stopwatchActions.addLapTimes({
        currentHours,
        currentMinutes,
        currentSeconds,
        currentMiliseconds,
      })
    );
  };

  useEffect(() => {
    dispatch(stopwatchActions.setCurrentTime(currentTime));
  }, [currentTime]);

  useEffect(() => {
    stopStopwatch();
    dispatch(stopwatchActions.resetLapTimes());
  }, []);

  return {
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    addLap,
    currentTime,
  };
}

export default useStopwatch;

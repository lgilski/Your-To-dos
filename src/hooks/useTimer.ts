import { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { timerActions } from '../store/timer';
import { Timer, WholeState } from '@/types';

export function useTimer({
  completeTimeInSeconds,
  timerData,
  index,
}: {
  completeTimeInSeconds: number;
  timerData: Timer;
  index: number;
}) {
  const countDownTime: { current: NodeJS.Timeout | undefined } =
    useRef(undefined);

  const dispatch = useDispatch();

  const startSequence = useSelector(
    (state: WholeState) => state.timers.startSequence
  );
  const activeIndex = useSelector(
    (state: WholeState) => state.timers.activeIndex
  );
  const resetAllTimers = useSelector(
    (state: WholeState) => state.timers.resetAllTimers
  );
  const countDownMethod = useSelector(
    (state: WholeState) => state.timers.countDownMethod
  );

  const [isCounting, setIsCounting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(
    completeTimeInSeconds
  );

  const counter: Worker = useMemo(
    () =>
      new Worker(
        new URL(
          '../components/Timer/countDownWorker.ts',
          import.meta.url
        )
      ),
    []
  );

  const startTimer = () => {
    if (timeInSeconds === 0) {
      resetTimer();
    }

    setIsCounting(true);
    counter.postMessage(timeInSeconds);

    counter.onmessage = (e: any) => {
      setTimeInSeconds(e.data);
    };
  };

  const stopTimer = function () {
    counter.postMessage('stop');
    setIsCounting(false);
  };

  const resetTimer = function () {
    setTimeInSeconds(completeTimeInSeconds);
    setIsCounting(false);
  };

  const deleteTimer = function () {
    dispatch(timerActions.deleteTimer(timerData.id));
  };

  const editTimer = function () {
    if (countDownMethod === 'Start in sequence') {
      dispatch(timerActions.stopTimersInSquence());
    }

    stopTimer();
    setShowModal(true);
  };

  const closeModal = function () {
    setShowModal(false);
  };

  useEffect(() => {
    if (!startSequence) {
      stopTimer();
    } else if (index === activeIndex) {
      startTimer();
    }
  }, [activeIndex, startSequence]);

  useEffect(() => {
    if (isCounting) {
      stopTimer();
    }
  }, [countDownMethod]);

  useEffect(() => {
    if (timeInSeconds === 0) {
      stopTimer();
    }
    if (resetAllTimers) {
      resetTimer();
      dispatch(timerActions.resetTimers(false));
    }
    if (
      timeInSeconds === 0 &&
      countDownMethod === 'Start in sequence' &&
      index === activeIndex
    ) {
      dispatch(timerActions.incrementActiveIndexInSequence());
    }
  }, [
    timeInSeconds,
    countDownMethod,
    index,
    activeIndex,
    dispatch,
    resetAllTimers,
  ]);

  useEffect(() => {
    resetTimer();
  }, [timerData]);

  return {
    functions: {
      startTimer,
      stopTimer,
      resetTimer,
      deleteTimer,
      editTimer,
      closeModal,
    },
    isCounting,
    showModal,
    timeInSeconds,
  };
}

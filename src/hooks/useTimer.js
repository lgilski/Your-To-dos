import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { timerActions } from '../store/timer';

export function useTimer({ completeTimeInSeconds, timerData, index }) {
  const countDownTime = useRef(null);

  const dispatch = useDispatch();

  const startSequence = useSelector(state => state.timers.startSequence);
  const activeIndex = useSelector(state => state.timers.activeIndex);
  const resetAllTimers = useSelector(state => state.timers.resetAllTimers);
  const countDownMethod = useSelector(state => state.timers.countDownMethod);

  const [isCounting, setIsCounting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(completeTimeInSeconds);

  const startTimer = () => {
    if (timeInSeconds === 0) {
      resetTimer();
    }

    setIsCounting(true);

    countDownTime.current = setInterval(() => {
      setTimeInSeconds(prevstate => prevstate - 1);
    }, 1000);
  };

  const stopTimer = function () {
    clearInterval(countDownTime.current);
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

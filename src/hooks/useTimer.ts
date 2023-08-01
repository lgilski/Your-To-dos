import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { timerActions } from '../store/timer';
import { Timer, WholeState } from '@/types';

// const countingMap = new Map<string, boolean>();

export function useTimer({
  startingTime,
  timerData,
  index,
}: {
  startingTime: number;
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

  // const timeRemaining = useSelector(
  //   (state: WholeState) => state.timers.timers[index].timeRemaining
  // );
  // const startingTime = useSelector(
  //   (state: WholeState) => state.timers.timers[index].timeInSeconds
  // );
  // const isCounting = useSelector(
  //   (state: WholeState) => state.timers.timers[index].isCounting
  // );

  const [isCounting, setIsCounting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(startingTime);

  let prevTime: number | undefined;
  let time: number;

  const startTimer = () => {
    let timeRemainingInner = timeRemaining;

    if (timeRemaining === 0) {
      resetTimer();
      timeRemainingInner = startingTime;
    }

    setIsCounting(true);

    countDownTime.current = setInterval(() => {
      console.log(prevTime);

      if (!prevTime) {
        prevTime = Date.now();
      }

      time = Math.floor(
        timeRemainingInner! - (Date.now() - prevTime) / 1000
      );

      if (time < 0) {
        time = 0;
        // dispatch(
        //   timerActions.setRemainingTime({
        //     timerId: timerData.id,
        //     timeRemaining: time,
        //   })
        // );

        // dispatch(timerActions.stopTimer({ timerId: timerData.id }));
      }

      // dispatch(
      //   timerActions.setRemainingTime({
      //     timerId: timerData.id,
      //     timeRemaining: time,
      //   })
      // );

      setTimeRemaining(time);
    }, 50);
  };

  const stopTimer = function () {
    clearInterval(countDownTime.current);
    setIsCounting(false);
  };

  const resetTimer = function () {
    setTimeRemaining(startingTime);
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
    if (timeRemaining === 0) {
      stopTimer();
    }
    if (resetAllTimers) {
      resetTimer();
      dispatch(timerActions.resetTimers(false));
    }
    if (
      timeRemaining === 0 &&
      countDownMethod === 'Start in sequence' &&
      index === activeIndex
    ) {
      dispatch(timerActions.incrementActiveIndexInSequence());
    }
  }, [
    timeRemaining,
    countDownMethod,
    index,
    activeIndex,
    dispatch,
    resetAllTimers,
  ]);

  useEffect(() => {
    resetTimer();
    if (startSequence) {
      dispatch(timerActions.stopTimersInSquence());
      dispatch(timerActions.resetTimers(true));
    }
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
    timeRemaining,
  };
}

import { useEffect, useRef, useState } from 'react';

import classes from './Stopwatch.module.css';

function Stopwatch() {
  const stopwatchRef = useRef();

  const [time, setTime] = useState(0);
  const [isStoped, setIsStoped] = useState(true);
  const [miliseconds, setMiliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const startStopwatch = function () {
    setIsStoped(false);

    stopwatchRef.current = setInterval(() => {
      setTime(prevState => prevState + 1);
    }, 100);
  };

  const stopStopwatch = function () {
    clearInterval(stopwatchRef.current);
    setIsStoped(true);
  };

  const resetStopwatch = function () {
    setTime(0);
    setMiliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  // let currentHours = Math.floor(timeInSeconds / (60 * 60));
  // let currentMinutes = Math.floor(timeInSeconds / 60 - currentHours * 60);
  // let currentSeconds = Math.floor(
  //   timeInSeconds - (currentHours * 60 * 60 + currentMinutes * 60)
  // );

  useEffect(() => {
    const currentSeconds = Math.floor(time / 10);

    const currentHours = Math.floor(currentSeconds / (60 * 60));
    const currentMinutes = Math.floor(currentSeconds / 60);
    // let currentMiliseconds = time - currentSeconds * 10;

    setMiliseconds(time - currentSeconds * 10);
    setSeconds(
      Math.floor(
        currentSeconds - (currentHours * 60 * 60 + currentMinutes * 60)
      )
    );
    setMinutes(Math.floor(currentSeconds / 60 - currentHours * 60));
    setHours(Math.floor(currentSeconds / (60 * 60)));
  }, [time]);

  return (
    <div className={classes.stopwatch}>
      <h5 className={classes.time}>
        {hours.toString().length < 2 ? `0${hours}` : hours}:
        {minutes.toString().length < 2 ? `0${minutes}` : minutes}:
        {seconds.toString().length < 2 ? `0${seconds}` : seconds}:{miliseconds}
      </h5>
      <div className={classes.buttons}>
        {isStoped && (
          <button
            className={classes['buttons--start']}
            onClick={startStopwatch}
          >
            Start
          </button>
        )}
        {!isStoped && (
          <button className={classes['buttons--stop']} onClick={stopStopwatch}>
            Stop
          </button>
        )}
        {isStoped && (
          <button
            className={classes['buttons--reset']}
            onClick={resetStopwatch}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;

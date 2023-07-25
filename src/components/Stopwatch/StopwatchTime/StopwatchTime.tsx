import classes from './StopwatchTIme.module.css';

function StopwatchTime({
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
  return (
    <h5 className={classes.time}>
      {currentHours.toString().length < 2
        ? `0${currentHours}`
        : currentHours}
      :
      {currentMinutes.toString().length < 2
        ? `0${currentMinutes}`
        : currentMinutes}
      :
      {currentSeconds.toString().length < 2
        ? `0${currentSeconds}`
        : currentSeconds}
      :
      {currentMiliseconds.toString().length < 2
        ? `0${currentMiliseconds}`
        : currentMiliseconds}
    </h5>
  );
}

export default StopwatchTime;

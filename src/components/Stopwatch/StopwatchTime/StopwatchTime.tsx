function StopwatchTime({
  currentHours,
  currentMinutes,
  currentSeconds,
  currentMiliseconds,
  className,
  lap,
}: {
  currentHours: number;
  currentMinutes: number;
  currentSeconds: number;
  currentMiliseconds: number;
  className?: any;
  lap?: number;
}) {
  return (
    <h5 className={className}>
      {typeof lap === 'number' && `${lap}. `}
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
      .
      <span>
        {currentMiliseconds.toString().length < 2
          ? `0${currentMiliseconds}`
          : currentMiliseconds}
      </span>
    </h5>
  );
}

export default StopwatchTime;

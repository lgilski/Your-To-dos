import StopwatchTime from '../StopwatchTime/StopwatchTime';

const StopwatchLapTime = function ({
  lapTime,
}: {
  lapTime: {
    currentHours: number;
    currentMinutes: number;
    currentSeconds: number;
    currentMiliseconds: number;
  }[];
}) {
  let number = 0;

  return (
    <div className='flex flex-col gap-2 items-center mb-6 p-5 w-[95%] bg-orange-100 rounded-xl mx-auto text-3xl'>
      {lapTime.map((time) => {
        return (
          <StopwatchTime
            key={number++}
            currentHours={time.currentHours}
            currentMinutes={time.currentMinutes}
            currentSeconds={time.currentSeconds}
            currentMiliseconds={time.currentMiliseconds}
            lap={number}
            // className={'odd:bg-gray-100 w-full text-center'}
          />
        );
      })}
    </div>
  );
};

export default StopwatchLapTime;

import { Forecastday } from '@/types';
import WeatherDetailHour from '../WeatherDetailCards/WeatherDetailHour/WeatherDetailHour';

function WeatherDetailCard({
  weatherForecastDay,
}: {
  weatherForecastDay: Forecastday;
}) {
  const sunsetMinutes =
    Number(weatherForecastDay.astro.sunset.split(':')[0]) * 60 +
    12 * 60 +
    Number(
      weatherForecastDay.astro.sunset.split(':')[1].split(' ')[0]
    );
  const sunriseMinutes =
    Number(weatherForecastDay.astro.sunrise.split(':')[0]) * 60 +
    Number(
      weatherForecastDay.astro.sunrise.split(':')[1].split(' ')[0]
    );
  const daylightMinutes = sunsetMinutes - sunriseMinutes;
  const daylightHours = Math.floor(daylightMinutes / 60);
  const daylightMinutesToDisplay =
    daylightMinutes - daylightHours * 60;

  return (
    <div
      className={
        'w-full py-4 px-5 mt-8 bg-white dark:bg-cool-grey-900 dark:text-orange-vivid-050 rounded-md shadow-sm'
      }
    >
      <h5 className={'text-xl'}>{weatherForecastDay.date} </h5>
      <div
        className={
          'grid grid-cols-4 py-4 mt-2 [&_span]:font-semibold [&_span]:ml-1'
        }
      >
        <div
          className={
            'relative flex flex-col gap-4 p-4 border-r-2 border-solid border-orange-vivid-600 border-l-0 border-y-0 [&_ion-icon]:w-5 [&_ion-icon]:h-5 [&_ion-icon]:mr-1'
          }
        >
          <h6 className='text-lg text-orange-vivid-900 dark:text-orange-vivid-500'>
            Temperature
          </h6>
          <p className={'flex gap1 items-center'}>
            <ion-icon name='flame' /> max:{' '}
            <span>
              {weatherForecastDay.day.maxtemp_c}
              &deg;C
            </span>
          </p>
          <p className={'flex gap1 items-center'}>
            <ion-icon name='thermometer-outline' /> avg:{' '}
            <span>{weatherForecastDay.day.avgtemp_c}&deg;C</span>
          </p>
          <p className={'flex gap1 items-center'}>
            <ion-icon name='trending-down' /> min:{' '}
            <span>{weatherForecastDay.day.mintemp_c}&deg;C</span>
          </p>
        </div>
        <div
          className={
            'relative flex flex-col gap-4 p-4 border-r-2 border-solid border-orange-vivid-600 border-l-0 border-y-0 [&_ion-icon]:w-5 [&_ion-icon]:h-5 [&_ion-icon]:mr-1'
          }
        >
          <h6 className='text-lg text-orange-vivid-900 dark:text-orange-vivid-500'>
            Sun
          </h6>
          <p>
            Sunrise at <span>{weatherForecastDay.astro.sunrise}</span>
          </p>
          <p>
            Sunset at <span>{weatherForecastDay.astro.sunset}</span>
          </p>
          <p>
            Daylight:{' '}
            <span>
              {daylightHours}:
              {daylightMinutesToDisplay.toString().length < 2
                ? `0${Math.abs(daylightMinutesToDisplay)}`
                : Math.abs(daylightMinutesToDisplay)}
              h
            </span>
          </p>
        </div>
        <div
          className={
            'relative flex flex-col gap-4 p-4 border-r-2 border-solid border-orange-vivid-600 border-l-0 border-y-0 [&_ion-icon]:w-5 [&_ion-icon]:h-5 [&_ion-icon]:mr-1'
          }
        >
          <h6 className='text-lg text-orange-vivid-900 dark:text-orange-vivid-500'>
            Precipitation
          </h6>
          <p className={'flex gap1 items-center'}>
            <ion-icon name='rainy' /> Chance of rain:{' '}
            <span>
              {weatherForecastDay.day.daily_chance_of_rain}%
            </span>
          </p>
          <p className={'flex gap1 items-center'}>
            <ion-icon name='snow' /> Chance of snow:{' '}
            <span>
              {weatherForecastDay.day.daily_chance_of_snow}%
            </span>
          </p>
        </div>
        <div className={' relative flex flex-col gap-4 p-4 '}>
          <img
            className='self-center w-20 h-20 mb-auto bg-orange-vivid-050 dark:bg-white rounded-md shadow-sm'
            src={weatherForecastDay.day.condition.icon}
            alt=''
          />
          <p>{weatherForecastDay.day.condition.text}</p>
        </div>
      </div>
      <div
        className={
          'grid grid-cols-[repeat(24,_150px)] gap-4  p-6 overflow-x-scroll bg-orange-vivid-050 dark:bg-cool-grey-800 dark:text-cool-grey-100 rounded-t-md'
        }
      >
        {weatherForecastDay.hour.map((hour) => (
          <WeatherDetailHour key={hour.time} hour={hour} />
        ))}
      </div>
    </div>
  );
}

export default WeatherDetailCard;

import WeatherDetailHour from '../WeatherDetailCards/WeatherDetailHour/WeatherDetailHour';
import classes from './WeatherDetailCard.module.css';

function WeatherDetailCard({ weatherForecastDay }) {
  const sunsetMinutes =
    weatherForecastDay.astro.sunset.split(':')[0] * 60 +
    12 * 60 +
    weatherForecastDay.astro.sunset.split(':')[1].split(' ')[0] * 1;
  const sunriseMinutes =
    weatherForecastDay.astro.sunrise.split(':')[0] * 60 +
    weatherForecastDay.astro.sunrise.split(':')[1].split(' ')[0] * 1;
  const daylightMinutes = sunsetMinutes - sunriseMinutes;
  const daylightHours = Math.floor(daylightMinutes / 60);
  const daylightMinutesToDisplay = daylightMinutes - daylightHours * 60;

  return (
    <div className={classes.detailCard}>
      <h5 className={classes.date}>{weatherForecastDay.date} </h5>
      <div className={classes.contentWrapper}>
        <div className={classes['content-col']}>
          <h6>Temperature</h6>
          <p className={classes['content-col-withIcon']}>
            <ion-icon name='flame' /> max:{' '}
            <span>
              {weatherForecastDay.day.maxtemp_c}
              &deg;C
            </span>
          </p>
          <p className={classes['content-col-withIcon']}>
            <ion-icon name='thermometer-outline' /> avg:{' '}
            <span>{weatherForecastDay.day.avgtemp_c}&deg;C</span>
          </p>
          <p className={classes['content-col-withIcon']}>
            <ion-icon name='trending-down' /> min:{' '}
            <span>{weatherForecastDay.day.mintemp_c}&deg;C</span>
          </p>
        </div>
        <div className={classes['content-col']}>
          <h6>Sun</h6>
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
        <div className={classes['content-col']}>
          <h6>Precipitation</h6>
          <p className={classes['content-col-withIcon']}>
            <ion-icon name='rainy' /> Chance of rain:{' '}
            <span>{weatherForecastDay.day.daily_chance_of_rain}%</span>
          </p>
          <p className={classes['content-col-withIcon']}>
            <ion-icon name='snow' /> Chance of snow:{' '}
            <span>{weatherForecastDay.day.daily_chance_of_snow}%</span>
          </p>
        </div>
        <div className={classes['content-col']}>
          <img src={weatherForecastDay.day.condition.icon} alt='' />
          <p>{weatherForecastDay.day.condition.text}</p>
        </div>
      </div>
      <div className={classes.hours}>
        {weatherForecastDay.hour.map(hour => (
          <WeatherDetailHour key={hour.time} hour={hour} />
        ))}
      </div>
    </div>
  );
}

export default WeatherDetailCard;

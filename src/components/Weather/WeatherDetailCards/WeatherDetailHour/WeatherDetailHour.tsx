import clsx from '../../../../utils/clsx';
import classes from './WeatherDetailHour.module.css';

function WeatherDetailHour({ hour }: { hour: Hour }) {
  return (
    <div className={classes.hour}>
      <div>
        <h6 className={classes.time}>{hour.time.split(' ')[1]}</h6>
        <p>{hour.condition.text}</p>
      </div>
      <img src={hour.condition.icon} alt='' />
      <div>
        {/* <p>Feels like {hour.feelslike_c}&deg;C</p> */}
        <div className={clsx(classes.withIcon, classes.humidity)}>
          <ion-icon name='water' />
          <p>{hour.humidity}%</p>
        </div>
        <div className={clsx(classes.withIcon, classes.wind)}>
          <ion-icon name='flag' />
          <p>{hour.wind_kph}km/h</p>
        </div>
      </div>
      <p className={classes.temp}>{hour.temp_c}&deg;C</p>
    </div>
  );
}

export default WeatherDetailHour;

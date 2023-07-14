import { useQuery } from '@tanstack/react-query';
import classes from './WeatherCard.module.css';
import { fetchWeather } from '../../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { weatherActions } from '../../../store/weather';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';

import WeatherTooltip from '../WeatherTooltip/WeatherTooltip';

function WeatherCard({ city }: { city: string }) {
  const dispatch = useDispatch();

  const favorite = useSelector(
    (state: WholeState) => state.weather.showOnCards
  );

  const { data: weatherData } = useQuery(
    ['weather', city],
    () => fetchWeather({ city }),
    {
      refetchOnWindowFocus: false,
      staleTime: 9000 * 60,
      refetchInterval: 10000 * 60,
    }
  );

  useEffect(() => {
    if (weatherData?.message) {
      dispatch(weatherActions.deleteWeather(city));
      dispatch(weatherActions.setError(weatherData.message));
    }
  }, [weatherData, dispatch, city]);

  if (!weatherData) {
    return (
      <TailSpin
        height='100'
        width='100'
        color='#d87620'
        ariaLabel='tail-spin-loading'
        radius='0'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    );
  }

  const date = new Date(weatherData.current?.last_updated_epoch * 1000);

  const time = date.toLocaleTimeString('eng-UK', {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  });

  const deleteWeather = function () {
    dispatch(weatherActions.deleteWeather(city));
  };

  const showOnCards = function () {
    dispatch(weatherActions.showOnCards(city));
  };

  const stopShowingOnCards = function () {
    dispatch(weatherActions.stopShowingOnCards(null));
  };

  return (
    <>
      {!weatherData?.message && (
        <div className={classes.weatherCard}>
          <div className={classes.info}>
            <Link className={classes.name} to={city}>
              {weatherData.location.name}
            </Link>
            <p className={classes.date}>{time}</p>
            <div className={classes.otherInfo}>
              <div className={classes.humidity}>
                <ion-icon name='water' />
                <p>{weatherData.current.humidity}%</p>
              </div>
              <div className={classes.wind}>
                <ion-icon name='flag' />
                <p>{weatherData.current.wind_kph}km/h</p>
              </div>
            </div>
          </div>
          <h5 className={classes.temp}>{weatherData.current.temp_c}&deg;C</h5>
          <div className={classes.iconWrapper}>
            <img src={weatherData.current.condition.icon} alt='icon' />
            <p className={classes.currentCondition}>
              {weatherData.current.condition.text}
            </p>
          </div>
          <WeatherTooltip
            city={city}
            favorite={favorite}
            deleteWeather={deleteWeather}
            showOnCards={showOnCards}
            stopShowingOnCards={stopShowingOnCards}
          />
          {/* {favorite === city && (
            <div className={classes.favorite}>
              <ion-icon name='heart'></ion-icon>
            </div>
          )} */}
        </div>
      )}
    </>
  );
}

export default WeatherCard;

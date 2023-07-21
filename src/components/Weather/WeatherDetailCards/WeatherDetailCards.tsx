import { useQuery } from '@tanstack/react-query';
import WeatherDetailCard from '../WeatherDetailCard/WeatherDetailCard';
import { fetchForecast } from '../../../api/api';

import classes from './WeatherDetailCards.module.css';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { Forecastday } from '@/types';

function WeatherDetailCards({ city }: { city: string }) {
  const navigate = useNavigate();

  const { data: forecastData } = useQuery(
    ['forecast', city],
    () => fetchForecast({ city }),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 12,
    }
  );

  if (!forecastData) {
    return (
      <TailSpin
        height='100'
        width='100'
        color='#d87620'
        ariaLabel='tail-spin-loading'
        radius='0'
        wrapperStyle={{}}
        wrapperClass='spinner'
        visible={true}
      />
    );
  }

  const goBack = function () {
    navigate(-1);
  };

  return (
    <>
      <div className={classes.detailWrapper}>
        <div className={classes.headerWrapper}>
          <h4 className={classes.city}>
            {forecastData.location.name},{' '}
            {forecastData.location.country}
          </h4>
          <Button
            onClick={goBack}
            color='OrangeLight'
            variant='RoundedSquare'
          >
            <ion-icon name='arrow-back-outline' /> Back
          </Button>
        </div>
        {forecastData.forecast.forecastday.map(
          (forecastday: Forecastday) => {
            return (
              <WeatherDetailCard
                key={forecastday.date}
                weatherForecastDay={forecastday}
              />
            );
          }
        )}
      </div>
    </>
  );
}

export default WeatherDetailCards;

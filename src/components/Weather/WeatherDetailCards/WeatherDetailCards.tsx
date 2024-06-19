import { useQuery } from '@tanstack/react-query';
import WeatherDetailCard from '../WeatherDetailCard/WeatherDetailCard';
import { fetchForecast } from '../../../api/weather';

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

  // .city {
  //   font-size: var(--heading-l);
  //   text-align: center;
  // }

  // .headerWrapper {
  //   position: relative;
  // }

  // .headerWrapper button {
  //   position: absolute;
  //   top: 50%;
  //   font-size: var(--text-big);
  //   font-weight: 500;
  //   /* left: 20%; */
  //   transform: translateY(-50%);
  // }

  // .headerWrapper button ion-icon {
  //   vertical-align: middle;
  // }

  return (
    <>
      <div className={'max-w-5xl mx-auto pt-32 pb-20'}>
        <div className={classes.headerWrapper}>
          <h4 className={'text-lg text-center dark:text-white'}>
            {forecastData.location.name},{' '}
            {forecastData.location.country}
          </h4>
          <button
            onClick={goBack}
            className='rounded-md border-none px-4 py-2 bg-orange-vivid-700 hover:bg-orange-vivid-800 duration-300 text-orange-vivid-050 cursor-pointer'
          >
            <ion-icon name='arrow-back-outline' /> Back
          </button>
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

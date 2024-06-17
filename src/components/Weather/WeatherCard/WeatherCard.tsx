import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../../../api/weather';
import { useDispatch, useSelector } from 'react-redux';
import { weatherActions } from '../../../store/weather';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';

import WeatherTooltip from '../WeatherTooltip/WeatherTooltip';
import { WholeState } from '@/types';

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

  const date = new Date(
    weatherData.current?.last_updated_epoch * 1000
  );

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
    dispatch(weatherActions.stopShowingOnCards());
  };

  // .favorite {
  //   position: absolute;
  //   top: 40px;
  //   right: 4px;
  //   color: crimson;
  // }

  // .favorite ion-icon {
  //   width: 32px;
  //   height: 32px;
  // }

  // .currentCondition {
  //   align-self: center;
  //   font-size: var(--text-big);
  //   font-weight: 500;
  // }

  return (
    <>
      {!weatherData?.message && (
        <div className='shadow-md rounded-md overflow-hidden'>
          <div
            className={
              'relative grid grid-cols-2 gap-2 w-full h-60 p-6 bg-orange-vivid-200  '
            }
          >
            <div className={'flex flex-col'}>
              <h5 className='mr-auto no-underline text-cool-grey-900 font-semibold text-lg'>
                {weatherData.location.name}
              </h5>
              <p className={''}>{time}</p>
              <div className={'flex gap-4 mt-2'}>
                <div
                  className={
                    'flex gap-1 items-center [&_ion-icon]:w-6 [&_ion-icon]:h-6'
                  }
                >
                  <ion-icon name='water' />
                  <p>{weatherData.current.humidity}%</p>
                </div>
                <div
                  className={
                    'flex gap-1 items-center [&_ion-icon]:w-6 [&_ion-icon]:h-6'
                  }
                >
                  <ion-icon name='flag' />
                  <p>{weatherData.current.wind_kph}km/h</p>
                </div>
              </div>
            </div>
            <h5
              className={
                'row-start-2 mt-auto text-4xl font-semibold '
              }
            >
              {weatherData.current.temp_c}&deg;C
            </h5>
            <div className={'flex flex-col row-span-2 '}>
              <img
                className='self-center w-20 h-20 mb-auto bg-white rounded-md shadow-sm'
                src={weatherData.current.condition.icon}
                alt='icon'
              />
              <p className={'self-center '}>
                {weatherData.current.condition.text}
              </p>
            </div>
            {/* <WeatherTooltip
            city={city}
            favorite={favorite}
            deleteWeather={deleteWeather}
            showOnCards={showOnCards}
            stopShowingOnCards={stopShowingOnCards}
          /> */}
            {/* {favorite === city && (
            <div className={classes.favorite}>
              <ion-icon name='heart'></ion-icon>
              </div>
              )} */}
          </div>
          <div className='flex justify-between  bg-orange-vivid-050 py-2 px-4'>
            <div className='flex gap-4  '>
              {favorite !== city && (
                <button
                  onClick={showOnCards}
                  className='border-none w-6 h-6 bg-transparent [&_ion-icon]:h-full [&_ion-icon]:w-full cursor-pointer'
                  // className={classes.tooltipButton}
                >
                  <ion-icon name='heart-outline' />
                </button>
              )}
              {favorite === city && (
                <button
                  onClick={stopShowingOnCards}
                  className='border-none w-6 h-6 bg-transparent [&_ion-icon]:h-full [&_ion-icon]:w-full cursor-pointer'
                  // className={classes.tooltipButton}
                >
                  <ion-icon name='heart' />
                </button>
              )}
              <Link
                // className={classes.tooltipButton}
                className='border-none w-6 h-6 bg-transparent [&_ion-icon]:h-full [&_ion-icon]:w-full text-cool-grey-800'
                to={city}
              >
                <ion-icon name='stats-chart-outline' />
              </Link>
            </div>
            <button
              onClick={deleteWeather}
              className='border-none w-6 h-6 bg-transparent [&_ion-icon]:h-full [&_ion-icon]:w-full text-cool-grey-800 cursor-pointer'
            >
              <ion-icon name='trash-outline' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherCard;

import Input from '../../common/Input/Input';

import React from 'react';

import classes from './WeatherForm.module.css';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { weatherActions } from '../../../store/weather';
import { WholeState } from '@/types';

function WeatherForm() {
  const ref = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const error = useSelector((state: WholeState) => state.weather.error);
  const weather = useSelector((state: WholeState) => state.weather.data);

  const setData = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const city = ref.current!.value;
    dispatch(weatherActions.setError(''));

    if (weather.find((weatherData) => weatherData === city)) {
      dispatch(
        weatherActions.setError('You already have weather of this city')
      );
      return;
    }
    dispatch(weatherActions.createWeatherCard(city));
  };

  return (
    <form onSubmit={setData} className={classes.form}>
      <h4 className={classes.heading}>Find your city</h4>
      {error && <p>{error}</p>}
      <Input
        autoComplete='off'
        type={'text'}
        name={'city'}
        color={'Orange'}
        text={'Type city or place'}
        ref={ref}
        // value={ref.current.value}
        required={true}
      />
      <Button variant='Capsule' color='Orange'>
        Find city
      </Button>
    </form>
  );
}

export default WeatherForm;

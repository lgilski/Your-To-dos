import Input from '../../common/Input/Input';

import classes from './WeatherForm.module.css';
import Button from '../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { weatherActions } from '../../../store/weather';

function WeatherForm() {
  const ref = useRef();
  const dispatch = useDispatch();

  const error = useSelector(state => state.weather.error);
  const weather = useSelector(state => state.weather.data);

  const setData = async function (e) {
    e.preventDefault();

    const city = ref.current.value;
    dispatch(weatherActions.setError(null));

    if (weather.find(weatherData => weatherData === city)) {
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
        color={'orange'}
        text={'Type city or place'}
        ref={ref}
        // value={ref.current.value}
        required={true}
      />
      <Button variant='capsule' color='orange'>
        Find city
      </Button>
    </form>
  );
}

export default WeatherForm;

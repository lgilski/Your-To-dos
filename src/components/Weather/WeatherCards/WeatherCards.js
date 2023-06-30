import { useSelector } from 'react-redux';
import WeatherCard from '../WeatherCard/WeatherCard';

import classes from './WeatherCards.module.css';

function WeatherCards() {
  const weather = useSelector(state => state.weather.data);

  return (
    <div className={classes.weatherCards}>
      {weather.map(city => {
        return <WeatherCard key={city} city={city} />;
      })}
    </div>
  );
}

export default WeatherCards;

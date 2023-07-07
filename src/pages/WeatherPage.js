import WeatherForm from '../components/Weather/WeatherForm/WeatherForm';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import WeatherCards from '../components/Weather/WeatherCards/WeatherCards';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { weatherActions } from '../store/weather';

function WeatherPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem('weather');

    if (data) {
      dispatch(weatherActions.loadWeather(JSON.parse(data)));
    }
  }, []);

  return (
    <section className='grey-bg'>
      <div className='wrapper2'>
        <SectionHeader
          className='pageTitle-center'
          subheader='Weather page'
          header='Look up the weather'
          type='medium'
        />
        <WeatherForm />
        <WeatherCards />
      </div>
    </section>
  );
}

export default WeatherPage;

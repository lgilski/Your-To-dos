import WeatherForm from '../components/Weather/WeatherForm/WeatherForm';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import WeatherCards from '../components/Weather/WeatherCards/WeatherCards';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { weatherActions } from '../store/weather';
import clsx from '@/utils/clsx';

function WeatherPage() {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const showModal = function () {
    setShowForm(true);
  };

  const hideModal = function () {
    setShowForm(false);
  };

  useEffect(() => {
    const data = localStorage.getItem('weather');

    if (data) {
      dispatch(weatherActions.loadWeather(JSON.parse(data)));
    }
  }, [dispatch]);

  // max-[1800px]:max-w-[1232px] max-[1500px]:max-w-[1000px] max-[1250px]:max-w-[632px] max-[900px]:max-w-[300px] max-[300px]:max-w-[262px]

  return (
    <section className='greyBg pb-16 pt-32 mt-0'>
      <div className='max-w-7xl m-auto overflow-hidden px-8 bg-white border border-solid border-cool-grey-200 rounded-md  dark:bg-cool-grey-900 dark:border-cool-grey-600'>
        {/* <div className='max-w-[1200px] mx-auto'> */}
        <div className={'w-full py-2 '}>
          <div className='flex justify-end pt-0 px-2 pb-2 m-auto border-x-0 border-t-0 border-b border-solid border-cool-grey-200 dark:border-cool-grey-600'>
            <div className='flex gap-4'>
              <button
                onClick={showModal}
                className={
                  'rounded-md px-4 py-2 text-lg bg-orange-vivid-700 hover:bg-orange-vivid-800 duration-300 cursor-pointer border-none text-orange-vivid-050'
                }
                color='Green'
                // variant='RoundedSquare'
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {/* <SectionHeader
          className='pageTitleCenter'
          subheader='Weather page'
          header='Look up the weather'
          type='medium'
        /> */}
        {showForm && <WeatherForm hideModal={hideModal} />}
        <WeatherCards showModal={showModal} />
      </div>
    </section>
  );
}

export default WeatherPage;

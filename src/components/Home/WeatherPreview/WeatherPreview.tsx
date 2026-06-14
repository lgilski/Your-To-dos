import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import WeatherViewPreview from '@/assets/images/Screenshot_8_1.png';
import HomePageFeature from '../HomePageFeature';

function WeatherPreview() {
  return (
    <section className='bg-orange-vivid-050 py-32'>
      <div className='max-w-[1200px] mx-auto flex flex-col items-center  max-[1200px]:max-w-2xl  max-md:px-4'>
        <SectionHeader
          className='pb-2 text-center'
          subheader='Weather'
          header='Check the forecast'
          type='large'
        />
        <p className='w-[560px] text-center pb-8 max-[560px]:w-full'>
          Here you can check the weather for the 3 closest days. You
          can choose which city&apos;s forecast you want to see on
          your cards.
        </p>
        <img
          src={WeatherViewPreview}
          className='aspect-auto w-[900px] drop-shadow-lg max-[900px]:w-full'
        />
      </div>
    </section>
  );
}

export default WeatherPreview;

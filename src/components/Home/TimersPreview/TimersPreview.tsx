import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import timersPreview from '/src/assets/images/Screenshot_5_1.png';

import timersPreviewTwo from '/src/assets/images/Screenshot_6_1.png';
import HomePageFeature from '../HomePageFeature';

function TimersPreview() {
  return (
    <section className='bg-orange-vivid-050 py-32 max-md:px-4 max-sm:py-16'>
      <div className='max-w-[1200px] mx-auto  max-[1200px]:max-w-2xl'>
        <div className='flex gap-24 w-full max-[1200px]:flex-col max-md:gap-8 '>
          <div className='w-full'>
            <SectionHeader
              className='w-full pb-8 '
              subheader='Timers'
              header='Measure your time'
              type='large'
            />
            <div className='flex flex-col w-full gap-8'>
              <HomePageFeature
                dark
                header='Manual mode and sequence mode'
                icon='timer'
                text='Thanks to the manual mode you can turn your timers on
              simultaneously as you like. In sequence mode your timers start one after another so you can plan ahead.'
              />
              <HomePageFeature
                dark
                header='Drag and drop'
                icon='swap-horizontal'
                text='In both modes you can drag and arange your timers.'
              />
              <HomePageFeature
                dark
                header='Stopwatch'
                icon='stopwatch'
                text='Moreover, you can also use a stopwatch.'
              />
            </div>
          </div>
          <div className='w-full '>
            <img
              src={timersPreviewTwo}
              className='aspect-auto w-full shadow-md '
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimersPreview;

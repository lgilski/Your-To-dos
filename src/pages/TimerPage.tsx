import Timers from '../components/Timer/Timers/Timers';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';

function TimerPage() {
  return (
    <section className='greyBg paddingBottom'>
      <div className='pageTitleCenterPartly paddingTop'>
        <SectionHeader
          subheader='Timers page'
          header='Measure time as you like'
          type='medium'
        />
      </div>
      <Timers />
    </section>
  );
}

export default TimerPage;

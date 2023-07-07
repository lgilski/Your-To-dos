import TimerCountDownMethod from '../components/Timer/ChoseCountDownMethod/ChoseCountDownMethod';
import TimerForm from '../components/Timer/TimerForm/TimerForm';
import Timers from '../components/Timer/Timers/Timers';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';

function TimerPage() {
  return (
    <section className='grey-bg padding-bottom'>
      <div className='pageTitle-center-partly padding-top'>
        <SectionHeader
          subheader='Timers page'
          header='Measure time as you like'
          type='medium'
        />
      </div>
      {/* <TimerForm /> */}
      {/* <TimerCountDownMethod /> */}
      <Timers />
    </section>
  );
}

export default TimerPage;

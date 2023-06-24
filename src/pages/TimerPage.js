import TimerCountDownMethod from '../components/Timer/ChoseCountDownMethod/ChoseCountDownMethod';
import TimerForm from '../components/Timer/TimerForm/TimerForm';
import Timers from '../components/Timer/Timers';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';

function TimerPage() {
  return (
    <section>
      <div className='pageTitle-center-partly'>
        <SectionHeader
          subheader='Timers page'
          header='Measure time as you like'
        />
      </div>
      <TimerForm />
      <TimerCountDownMethod />
      <Timers />
    </section>
  );
}

export default TimerPage;

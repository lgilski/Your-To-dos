import Stopwatch from '@/components/Stopwatch/Stopwatch';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';

function StopwatchPage() {
  return (
    <section className='greyBg paddingBottom'>
      <SectionHeader
        className='pageTitleCenter paddingTop'
        subheader='Stopwatch page'
        header='Start counting down'
        type='medium'
      />
      <Stopwatch />
    </section>
  );
}

export default StopwatchPage;

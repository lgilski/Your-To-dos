import { Outlet } from 'react-router-dom';
import TimerNavigation from '../../components/Timer/TimerNavigation/TimerNavigation';

function TimerRoot() {
  return (
    <div className='grey-bg'>
      {/* <TimerNavigation /> */}
      <Outlet />
    </div>
  );
}

export default TimerRoot;

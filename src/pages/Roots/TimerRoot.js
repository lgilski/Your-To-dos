import { Outlet } from 'react-router-dom';
import TimerNavigation from '../../components/Timer/TimerNavigation/TimerNavigation';

function TimerRoot() {
  return (
    <div className='gray-bg'>
      <TimerNavigation />
      <Outlet />
    </div>
  );
}

export default TimerRoot;

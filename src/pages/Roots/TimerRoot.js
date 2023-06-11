import { Outlet } from 'react-router-dom';
import TimerNavigation from '../../components/Timer/TimerNavigation/TimerNavigation';

function TimerRoot() {
  return (
    <div>
      <TimerNavigation />
      <Outlet />
    </div>
  );
}

export default TimerRoot;

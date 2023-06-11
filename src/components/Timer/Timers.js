import { useDispatch, useSelector } from 'react-redux';
import TimerComponent from './TimerComponent/TimerComponent';
import { timerActions } from '../../store/timer';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TimerWrapper from './TimerWrapperDrag';

function Timers() {
  const dispatch = useDispatch();

  const timers = useSelector(state => state.timers.timers);
  const formatedTimers = JSON.parse(localStorage.getItem('timers'));

  useEffect(() => {
    if (formatedTimers !== null) {
      dispatch(timerActions.setTimers(formatedTimers));
    } else {
      dispatch(timerActions.setTimers([]));
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      {timers.map((timer, index) => (
        // <TimerComponent key={timer.id} timerData={timer} index={index} />
        <TimerWrapper key={timer.id} timerData={timer} index={index} />
      ))}
    </DndProvider>
  );
}

export default Timers;

import { useState } from 'react';
import classes from './TimerForm.module.css';
import Button from './UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { timerActions } from '../store/timer';

function generateUUID() {
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function TimerForm({ modal, timerId, timerData }) {
  const timers = useSelector(state => state.timers.timers);

  const dispatch = useDispatch();

  const [hours, setHours] = useState(timerData?.hours || 0);
  const [minutes, setMinutes] = useState(timerData?.minutes || 0);
  const [seconds, setSeconds] = useState(timerData?.seconds || 0);
  const [timerName, setTimerName] = useState('Epic Timer');

  const onHoursChange = e => {
    setHours(e.target.value);
    console.log(e.target.value, timerData.hours);
  };
  const onMinutesChange = e => {
    setMinutes(e.target.value);
  };
  const onSecondsChange = e => {
    setSeconds(e.target.value);
  };
  const onTimerNameChange = e => {
    setTimerName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (modal) {
      dispatch(
        timerActions.editTimer({
          hours,
          minutes,
          seconds,
          timerId,
          timerName,
        })
      );

      timerData.closeModal();
      return;
    }

    const id = generateUUID();

    dispatch(
      timerActions.createTimer({ hours, minutes, seconds, id, timerName })
    );
  };

  return (
    <section className={`${classes.wrapper} ${modal && classes.modal} `}>
      <form className={classes.timerForm} onSubmit={onSubmit}>
        <h4>{modal ? 'Edit your timer' : 'Create new timer'}</h4>
        <ul className={classes['timerForm-list']}>
          <li className={classes['timerForm-list--time']}>
            <div className={classes['timerForm-list--time-element']}>
              <input
                min='0'
                max='99'
                type='number'
                id='hours'
                name='hours'
                onChange={onHoursChange}
                // value={modal ? timerData.hours : ''}
                defaultValue={modal ? timerData.hours : ''}
              />
              <label htmlFor='hours'>hours</label>
            </div>
            <p>:</p>
            <div className={classes['timerForm-list--time-element']}>
              <input
                min='0'
                max='59'
                type='number'
                id='minutes'
                name='minutes'
                onChange={onMinutesChange}
                onS
                // value={modal ? timerData.minutes : ''}
                defaultValue={modal ? timerData.minutes : ''}
              />
              <label htmlFor='minutes'>minutes</label>
            </div>
            <p>:</p>
            <div className={classes['timerForm-list--time-element']}>
              <input
                min='0'
                max='59'
                type='number'
                id='seconds'
                name='seconds'
                onChange={onSecondsChange}
                // value={modal ? timerData.hours : ''}
                defaultValue={modal ? timerData.seconds : ''}
              />
              <label htmlFor='seconds'>seconds</label>
            </div>
          </li>
          <li className={classes.border}></li>
          <li>
            <label htmlFor='timer-name'>timer name</label>
            <input
              min='0'
              onChange={onTimerNameChange}
              type='text'
              id='timer-name'
              name='timer-name'
              maxlength='20'
              autoComplete='off'
              defaultValue={modal ? timerData.timerName : ''}
            />
          </li>
        </ul>
        <Button>{modal ? 'Edit timer' : 'Add timer'}</Button>
      </form>
    </section>
  );
}

export default TimerForm;

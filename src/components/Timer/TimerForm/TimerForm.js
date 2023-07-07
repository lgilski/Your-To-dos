import { useState } from 'react';
import classes from './TimerForm.module.css';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { timerActions } from '../../../store/timer';
import { generateUUID } from '../../../helpers/generateUUID';
import Input from '../../common/Input/Input';
import { createPortal } from 'react-dom';
import CloseButton from '../../common/CloseButton/CloseButton';

function TimerForm({ modal, timerId, timerData, showFormHandler }) {
  const dispatch = useDispatch();

  const [hours, setHours] = useState(timerData?.hours || 0);
  const [minutes, setMinutes] = useState(timerData?.minutes || 0);
  const [seconds, setSeconds] = useState(timerData?.seconds || 0);
  const [timerName, setTimerName] = useState(
    timerData?.timerName || 'Epic Timer'
  );

  const onHoursChange = e => {
    setHours(e.target.value);
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
    <>
      {createPortal(
        <div className={`${classes.wrapper} ${modal && classes.modal} `}>
          <form className={classes.timerForm} onSubmit={onSubmit}>
            <CloseButton
              onClick={showFormHandler}
              className={classes.closeBtn}
              color='orange'
              size='big'
            />
            <h4 className={classes['timerForm-heading']}>
              {modal ? 'Edit your timer' : 'Create new timer'}
            </h4>
            <ul className={classes['timerForm-list']}>
              <li className={classes['timerForm-list--time']}>
                <div className={classes['timerForm-list--time-element']}>
                  <Input
                    color='orange'
                    down={true}
                    name='hours'
                    type='number'
                    min='0'
                    max='99'
                    onChange={onHoursChange}
                    defaultValue={modal ? timerData.hours : ''}
                    text='Hours'
                    noMargin={true}
                  />
                </div>
                <p>:</p>
                <div className={classes['timerForm-list--time-element']}>
                  <Input
                    color='orange'
                    down={true}
                    name='minutes'
                    type='number'
                    min='0'
                    max='59'
                    onChange={onMinutesChange}
                    defaultValue={modal ? timerData.minutes : ''}
                    text='Minutes'
                    noMargin={true}
                  />
                </div>
                <p>:</p>
                <div className={classes['timerForm-list--time-element']}>
                  <Input
                    color='orange'
                    down={true}
                    name='seconds'
                    type='number'
                    min='0'
                    max='59'
                    onChange={onSecondsChange}
                    defaultValue={modal ? timerData.seconds : ''}
                    text='Seconds'
                    noMargin={true}
                  />
                </div>
              </li>
              <li className={classes.border} />
              <li>
                <Input
                  color='orange'
                  name='name'
                  type='text'
                  onChange={onTimerNameChange}
                  text='Timer name'
                  noMargin={true}
                  maxLength='20'
                  autoComplete='off'
                  defaultValue={modal ? timerData.timerName : ''}
                />
              </li>
            </ul>
            <Button variant='capsule' color='orange'>
              {modal ? 'Edit timer' : 'Add timer'}
            </Button>
          </form>
        </div>,
        document.getElementById('modal-root')
      )}
      {createPortal(
        <div onClick={showFormHandler} className='blur' />,
        document.getElementById('overlay-root')
      )}
    </>
  );
}

export default TimerForm;

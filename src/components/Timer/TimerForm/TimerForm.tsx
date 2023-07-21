import React, { useState } from 'react';
import classes from './TimerForm.module.css';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { timerActions } from '../../../store/timer';
import { generateUUID } from '../../../helpers/generateUUID';
import Input from '../../common/Input/Input';
import { createPortal } from 'react-dom';
import CloseButton from '../../common/CloseButton/CloseButton';
import { Timer } from '@/types';

function TimerForm({
  modal,
  timerData,
  showFormHandler,
  closeModal,
}: {
  modal: boolean;
  timerData?: Timer;
  showFormHandler?: () => void;
  closeModal?: () => void;
}) {
  const dispatch = useDispatch();

  const timerId = timerData?.id;

  const [hours, setHours] = useState(timerData?.hours || 0);
  const [minutes, setMinutes] = useState(timerData?.minutes || 0);
  const [seconds, setSeconds] = useState(timerData?.seconds || 0);
  const [timerName, setTimerName] = useState(
    timerData?.timerName || 'Epic Timer'
  );

  const onHoursChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setHours(e.target.value);
  };
  const onMinutesChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setMinutes(e.target.value);
  };
  const onSecondsChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setSeconds(e.target.value);
  };
  const onTimerNameChange = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    setTimerName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modal && closeModal && timerId) {
      dispatch(
        timerActions.editTimer({
          hours,
          minutes,
          seconds,
          timerId,
          timerName,
        })
      );

      closeModal();
      return;
    }

    const id = generateUUID();

    dispatch(
      timerActions.createTimer({
        hours,
        minutes,
        seconds,
        id,
        timerName,
      })
    );
  };

  return (
    <>
      {createPortal(
        <div className={`${classes.wrapper}`}>
          <form className={classes.timerForm} onSubmit={onSubmit}>
            <CloseButton
              type='button'
              onClick={showFormHandler}
              className={classes.closeBtn}
              color='orange'
              size='big'
            />
            <h4 className={classes.timerFormHeading}>
              {modal ? 'Edit your timer' : 'Create new timer'}
            </h4>
            <ul className={classes.timerFormList}>
              <li className={classes.timerFormListTime}>
                <div className={classes.timerFormListTimeElement}>
                  <Input
                    color='Orange'
                    down={true}
                    name='hours'
                    type='number'
                    min='0'
                    max='99'
                    onChange={onHoursChange}
                    defaultValue={modal ? timerData!.hours : ''}
                    text='Hours'
                    noMargin={true}
                  />
                </div>
                <p>:</p>
                <div className={classes.timerFormListTimeElement}>
                  <Input
                    color='Orange'
                    down={true}
                    name='minutes'
                    type='number'
                    min='0'
                    max='59'
                    onChange={onMinutesChange}
                    defaultValue={modal ? timerData!.minutes : ''}
                    text='Minutes'
                    noMargin={true}
                  />
                </div>
                <p>:</p>
                <div className={classes.timerFormListTimeElement}>
                  <Input
                    color='Orange'
                    down={true}
                    name='seconds'
                    type='number'
                    min='0'
                    max='59'
                    onChange={onSecondsChange}
                    defaultValue={modal ? timerData!.seconds : ''}
                    text='Seconds'
                    noMargin={true}
                  />
                </div>
              </li>
              <li className={classes.border} />
              <li>
                <Input
                  color='Orange'
                  name='name'
                  type='text'
                  onChange={onTimerNameChange}
                  text='Timer name'
                  noMargin={true}
                  maxLength={20}
                  autoComplete='off'
                  defaultValue={modal ? timerData!.timerName : ''}
                />
              </li>
            </ul>
            <Button variant='Capsule' color='Orange'>
              {modal ? 'Edit timer' : 'Add timer'}
            </Button>
          </form>
        </div>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div onClick={showFormHandler} className='blurElement' />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
}

export default TimerForm;

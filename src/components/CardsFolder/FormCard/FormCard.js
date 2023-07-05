import React, { useState, useRef } from 'react';
import Button from '../../common/Button/Button';

import classes from './FormCard.module.css';
import { dataActions } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../../../helpers/generateUUID';
import Input from '../../common/Input/Input';
import { createPortal } from 'react-dom';
import CloseButton from '../../common/CloseButton/CloseButton';
import clsx from '../../../utils/clsx';
import { toast } from 'react-toastify';

function formatDate(date) {
  return date.toLocaleDateString('pl-PL'); // DD.MM.YYYY
}

const FormCards = function ({ setShowForm, className }) {
  const taskInputRef = useRef();
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const cards = useSelector(state => state.data.cards);

  const onSubmit = e => {
    e.preventDefault();

    const cardId = formatDate(new Date(date));

    if (!cards.find(card => card.id === cardId)) {
      dispatch(
        dataActions.createCard({
          date: new Date(date).toISOString(),
          id: cardId,
          tasks: [],
        })
      );
    }

    const task = {
      id: generateUUID(),
      content: taskInputRef.current.value,
    };
    dispatch(dataActions.createTask({ cardId, task }));

    // toast.success('Successfully added!', {
    //   position: 'top-center',
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: 'dark',
    // });
  };

  const onDataChange = function (e) {
    setDate(e.target.value);
  };

  const hideForm = function () {
    setShowForm(false);
  };

  // {createPortal(
  //   <ModalWindow
  //     timerId={timerId}
  //     timerData={{
  //       hours: timerData.hours,
  //       minutes: timerData.minutes,
  //       seconds: timerData.seconds,
  //       timerName: timerData.timerName,
  //       closeModal: timerData.closeModal,
  //     }}
  //   />,
  //   document.getElementById('modal-root')
  // )}
  // {createPortal(
  //   <div onClick={timerData.closeModal} className={classes.blur} />,
  //   document.getElementById('overlay-root')
  // )}

  return (
    <>
      {createPortal(
        <form className={clsx(classes.form, className)} onSubmit={onSubmit}>
          <CloseButton
            type='button'
            onClick={hideForm}
            className={classes.closeButton}
            color='orange'
            size='big'
          />
          <h4 className={classes['formCard-heading']}>Create card</h4>
          <Input
            autoComplete='off'
            name={'your task'}
            type={'text'}
            text={'Type your plan :)'}
            color='green'
            ref={taskInputRef}
            required={true}
          />
          <Input
            value={date}
            name={'days'}
            type={'date'}
            onChange={onDataChange}
            color='green'
            required={true}
            text={'On what day will it be?'}
          />
          <Button
            className={classes.addBtn}
            type='submit'
            variant='roundedSquare'
            color='orangeLight'
          >
            Add card
          </Button>
        </form>,
        document.getElementById('modal-root')
      )}
      {createPortal(
        <div onClick={hideForm} className={clsx('blur', className)} />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};

export default FormCards;

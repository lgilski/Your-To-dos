import React, { useState, useRef } from 'react';
import Button from '../../common/Button/Button';

import classes from './FormCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../../../helpers/generateUUID';
import Input from '../../common/Input/Input';
import { createPortal } from 'react-dom';
import CloseButton from '../../common/CloseButton/CloseButton';
import clsx from '../../../utils/clsx';
import { toast } from 'react-toastify';
import { cardActions } from '../../../store/card';

function formatDate(date: any) {
  return date.toLocaleDateString('pl-PL'); // DD.MM.YYYY
}

const FormCards = function ({
  setShowForm,
  className,
}: {
  setShowForm: Function;
  className: any;
}) {
  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const [date, setDate] = useState(new Date().getTime());

  const dispatch = useDispatch();
  const cards = useSelector((state: WholeState) => state.cards.cards);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardId = formatDate(new Date(date));

    if (!cards.find(card => card.id === cardId)) {
      dispatch(
        cardActions.createCard({
          date: new Date(date).toISOString(),
          id: cardId,
          tasks: [],
        })
      );
    }

    const task = {
      id: generateUUID(),
      content: taskInputRef.current!.value,
    };
    dispatch(cardActions.createTask({ cardId, task }));

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

  const onDataChange = function (e: React.ChangeEvent<HTMLFormElement>) {
    setDate(e.target.value);
  };

  const hideForm = function () {
    setShowForm(false);
  };

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
          <h4 className={classes.formCardHeading}>Create card</h4>
          <Input
            autoComplete='off'
            name={'your task'}
            type={'text'}
            text={'Type your plan'}
            color='Green'
            ref={taskInputRef}
            required={true}
          />
          <Input
            value={date}
            name={'days'}
            type={'date'}
            onChange={onDataChange}
            color='Green'
            required={true}
            text={'On what day will it be?'}
          />
          <Button
            className={classes.addBtn}
            type='submit'
            variant='RoundedSquare'
            color='OrangeLight'
          >
            Add card
          </Button>
        </form>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div onClick={hideForm} className={clsx('blur', className)} />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
};

export default FormCards;

import React, { useState, useRef } from 'react';
import Button from '../../common/Button/Button';

import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../../../helpers/generateUUID';
import Input from '../../common/Input/Input';
import { createPortal } from 'react-dom';
import CloseButton from '../../common/CloseButton/CloseButton';
import clsx from '../../../utils/clsx';
import { cardActions } from '../../../store/card';
import { WholeState } from '@/types';

function formatDate(date: any) {
  return date.toLocaleDateString('pl-PL'); // DD.MM.YYYY
}

const FormCards = function ({
  setShowForm,
  className,
}: {
  setShowForm: (a: boolean) => void;
  className?: any;
}) {
  const taskInputRef = useRef<HTMLInputElement | null>(null);
  const [date, setDate] = useState(new Date().getTime());

  const dispatch = useDispatch();
  const cards = useSelector((state: WholeState) => state.cards.cards);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardId = formatDate(new Date(date));

    if (!cards.find((card) => card.id === cardId)) {
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

  const onDataChange = function (
    e: React.ChangeEvent<HTMLFormElement>
  ) {
    setDate(e.target.value);
  };

  const hideForm = function () {
    setShowForm(false);
  };

  return (
    <>
      {createPortal(
        <form
          className={clsx(
            'fixed top-[40vh] left-[50%] z-[5] flex flex-col items-start w-[400px] max-w-[500px] p-4 mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-lg translate-x-[-50%] translate-y-[-50%] max-[420px]:max-w-[300px] max-[300px]:max-w-[240px]',
            className
          )}
          onSubmit={onSubmit}
        >
          <CloseButton
            type='button'
            onClick={hideForm}
            className='absolute top-2 right-2'
            color='orange'
            size='big'
          />
          <h4 className='flex self-center mb-5 text-3xl'>
            Create card
          </h4>
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
            name='days'
            type='date'
            onChange={onDataChange}
            color='Green'
            required={true}
            text='On what day will it be?'
          />
          <Button
            className='w-full mt-3'
            type='submit'
            variant='RoundedSquare'
            color='OrangeLite'
          >
            Add card
          </Button>
        </form>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div
          onClick={hideForm}
          className={clsx('blurElement', className)}
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  );
};

export default FormCards;

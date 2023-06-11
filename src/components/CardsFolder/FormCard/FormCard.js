import React, { useState, useRef } from 'react';
import Button from '../../UI/Button/Button';

import classes from './FormCard.module.css';
import { dataActions } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../../../helpers/generateUUID';
import Input from '../../UI/Input/Input';

function formatDate(date) {
  return date.toLocaleDateString('pl-PL'); // DD.MM.YYYY
}

const FormCards = function () {
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
  };

  const onDataChange = function (e) {
    setDate(e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <h4 className={classes['formCard-heading']}>Create card</h4>
      <Input
        autoComplete='off'
        name={'your task'}
        type={'text'}
        text={'Type your plan :)'}
        color='orange'
        ref={taskInputRef}
        required={true}
      />
      <Input
        name={'days'}
        type={'date'}
        onChange={onDataChange}
        color='orange'
        required={true}
        text={'On what day will it be?'}
      />
      <Button type='submit' variant='capsule' color='orange'>
        Add card
      </Button>
    </form>
  );
};

export default FormCards;

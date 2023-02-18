import React, { useState, useRef } from 'react';
import Button from './UI/Button';

import classes from './Form.module.css';

const Form = function (props) {
  const plan = useRef();
  const [dateStuff, setDateStuff] = useState('');

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const submitFormHandler = e => {
    e.preventDefault();
    props.setPlans(prevState => {
      const formatedDays = new Date(dateStuff);
      const dayName = dayNames[formatedDays.getDay()];
      const dayNumber = formatedDays.getDate();
      let monthNumber = formatedDays.getMonth() + 1;
      const yearNumber = formatedDays.getFullYear();

      const updatedPlans = [...prevState];

      const planWithSameDate = updatedPlans.find(element => {
        if (monthNumber.toString().length < 2) {
          monthNumber = `0${monthNumber}`;
        }

        return (
          element.specificDate === `${dayNumber}.${monthNumber}.${yearNumber}`
        );
      });

      if (monthNumber.toString().length < 2) {
        monthNumber = `0${monthNumber}`;
      }

      const id = `${dayName}_${Math.random() * 100}`;
      const idTask = `${dayName}_${Math.random() * 100}`;

      if (planWithSameDate) {
        planWithSameDate.plan.unshift({
          goal: plan.current.value,
          idTask: idTask,
        });
        return updatedPlans;
      }

      updatedPlans.unshift({
        plan: [{ goal: plan.current.value, idTask: idTask }],
        days: dayName,
        specificDate: `${dayNumber}.${monthNumber}.${yearNumber}`,
        date: formatedDays,
        id: id,
      });

      updatedPlans.sort(function (a, b) {
        if (!a || !b) {
          return;
        }
        return new Date(a.date) - new Date(b.date);
      });

      return updatedPlans;
    });
  };

  const dateHandler = function (e) {
    setDateStuff(e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <label htmlFor='your task'>Type your plan :)</label>
      <input ref={plan} type='text' name='your task' required></input>
      <label htmlFor='days'>On what day will it be?</label>
      <input type='date' name='days' onChange={dateHandler} required></input>
      <Button type='submit'>Add</Button>
    </form>
  );
};

export default Form;

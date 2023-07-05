import { useDispatch } from 'react-redux';
import Input from '../../common/Input/Input';

import classes from './SearchTask.module.css';
import { dataActions } from '../../../store';
import { useRef } from 'react';
import clsx from '../../../utils/clsx';

function SearchTask({ className, ...props }) {
  const ref = useRef();

  const dispatch = useDispatch();

  const searchCertainTask = function () {
    dispatch(dataActions.searchTask(ref.current.value));
  };

  return (
    <form className={clsx(classes.wrapper)}>
      {/* <label></label>
      <ion-icon name='search'></ion-icon>
      <input></input> */}
      {/* <Input
        ref={ref}
        onChange={searchCertainTask}
        text='Look for certain task'
        color='orange'
        placeholder='Find task'
      /> */}
      <input
        className={clsx(classes.input, className)}
        ref={ref}
        onChange={searchCertainTask}
        type='text'
        name='search'
        autoComplete='off'
        placeholder='Type to search...'
      />
    </form>
  );
}

export default SearchTask;

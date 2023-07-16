import { useDispatch } from 'react-redux';

import classes from './SearchTask.module.css';
import { useRef } from 'react';
import clsx from '../../../utils/clsx';
import { cardActions } from '../../../store/card';

function SearchTask({ className }: React.HTMLAttributes<HTMLFormElement>) {
  const ref = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const searchCertainTask = function () {
    dispatch(cardActions.searchTask(ref.current!.value));
  };

  return (
    <form className={clsx(classes.wrapper)}>
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

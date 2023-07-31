import { useState } from 'react';
import Button from '../../common/Button/Button';
import SearchTask from '../SearchTask/SearchTask';
import classes from './Toolbar.module.css';
import clsx from '../../../utils/clsx';
import { useDispatch } from 'react-redux';
import { cardActions } from '@/store/card';
import { useSelector } from 'react-redux';
import { WholeState } from '@/types';

function Toolbar({
  setShowForm,
}: {
  setShowForm: (a: boolean) => void;
}) {
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);

  const hideHappened = useSelector(
    (state: WholeState) => state.cards.hideHappened
  );

  const showSearchHandler = function () {
    setShowSearch((prevState) => !prevState);
  };

  const showModal = function () {
    setShowForm(true);
  };

  const hideHappenedHandler = function () {
    dispatch(cardActions.setHideHappened());
  };

  // .toolbarContent {
  //   display: flex;
  //   justify-content: space-between;
  //   width: 100%;
  //   padding: 0 8px 8px;
  //   margin: auto;
  //   /* border-bottom: 2px solid var(--orange-600); */
  //   border-bottom: 1px solid var(--grey-100);
  // }

  return (
    <div className={classes.toolbar}>
      <div className='flex justify-between pt-0 px-2 pb-2 m-auto border-x-0 border-t-0 border-b border-solid border-grey-100 dark:border-grey-600'>
        <div className='flex items-end'>
          <button
            className={`border-none bg-inherit text-base font-semibold text-grey-500 cursor-pointer duration-300 hover:text-grey-700 relative ${
              hideHappened &&
              "after:absolute after:content-[''] after:h-[2px] after:w-full after:bg-lime-green-500 after:-bottom-[9px] after:left-0"
            }`}
            onClick={hideHappenedHandler}
          >
            Hide old days
          </button>
        </div>
        <div className='flex gap-4'>
          <div className={classes.searchWrapper}>
            <button
              onClick={showSearchHandler}
              className={clsx(
                classes.searchBtn,
                showSearch && classes.shownSearch
              )}
            >
              <ion-icon name='search-outline' />
            </button>
            <SearchTask
              className={`${!showSearch && classes.hideSearch}`}
            />
          </div>
          <Button
            onClick={showModal}
            className={classes.addBtn}
            color='Green'
            variant='RoundedSquare'
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;

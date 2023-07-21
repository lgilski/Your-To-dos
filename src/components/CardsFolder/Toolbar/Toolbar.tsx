import { useState } from 'react';
import Button from '../../common/Button/Button';
import SearchTask from '../SearchTask/SearchTask';
import classes from './Toolbar.module.css';
import clsx from '../../../utils/clsx';

function Toolbar({
  setShowForm,
}: {
  setShowForm: (a: boolean) => void;
}) {
  const [showSearch, setShowSearch] = useState(false);

  const clickHandler = function () {
    setShowSearch((prevState) => !prevState);
  };

  const showModal = function () {
    setShowForm(true);
  };

  return (
    <div className={classes.toolbar}>
      <div className={classes.toolbarContent}>
        <div className={classes.searchWrapper}>
          <button
            onClick={clickHandler}
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
  );
}

export default Toolbar;

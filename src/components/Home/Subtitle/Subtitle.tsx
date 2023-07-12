import React from 'react';

import classes from './Subtitle.module.css';
import { Link } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import clsx from '../../../utils/clsx';

const Subtitle = function ({ type }: { type: string }) {
  const user = auth.currentUser;

  return (
    <div className={classes.wrapper}>
      <Link
        to={!user ? '/' : '/app/cards'}
        className={clsx(classes.subtitle, type === 'small' && classes.small)}
      >
        Your To-dos <span>and stuff UwU</span>
      </Link>
    </div>
  );
};

export default Subtitle;

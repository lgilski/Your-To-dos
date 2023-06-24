import React from 'react';

import classes from './Subtitle.module.css';

const Subtitle = function () {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.subtitle}>
        Your To-dos <span>and stuff UwU</span>
      </h2>
    </div>
  );
};

export default Subtitle;

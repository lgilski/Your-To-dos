import React from 'react';

import classes from './Subtitle.module.css';

const Subtitle = function () {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.subtitle}>Your To-dos</h2>
      <p>and stuff UwU</p>
    </div>
  );
};

export default Subtitle;

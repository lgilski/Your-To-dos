import React from 'react';

import classes from './Button.module.css';
import clsx from '../../../utils/clsx';

const Button = function ({ variant, color, className, ...otherProps }) {
  return (
    <button
      className={clsx(
        classes.btn,
        classes[`btn-${variant}`],
        classes[`btn-color-${color}`],
        className
      )}
      {...otherProps}
    />
  );
};

export default Button;

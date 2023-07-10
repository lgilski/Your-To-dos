import React from 'react';

import classes from './Button.module.css';
import clsx from '../../../utils/clsx';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'circle' | 'capsule' | 'roundedSquare' | 'logout';
  color:
    | 'orange'
    | 'orangeLight'
    | 'orangeDark'
    | 'green'
    | 'blue'
    | 'start'
    | 'stop'
    | 'reset'
    | 'logout';
}

const Button = function ({ variant, color, className, ...otherProps }: Button) {
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

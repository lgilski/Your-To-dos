import React from 'react';

import classes from './Button.module.css';
import clsx from '../../../utils/clsx';

interface MyButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
    | 'Circle'
    | 'Capsule'
    | 'RoundedSquare'
    | 'Rounded'
    | 'Logout';
  color:
    | 'Orange'
    | 'OrangeLight'
    | 'OrangeSuperLight'
    | 'OrangeDark'
    | 'OrangeLite'
    | 'Green'
    | 'Blue'
    | 'Start'
    | 'Stop'
    | 'Reset'
    | 'Logout';
}

const Button = function ({
  variant,
  color,
  className,
  ...otherProps
}: MyButton) {
  return (
    <button
      className={clsx(
        classes.btn,
        classes[`btn${variant}`],
        classes[`btnColor${color}`],
        className
      )}
      {...otherProps}
    />
  );
};

export default Button;

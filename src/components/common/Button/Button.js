import React from 'react';

import classes from './Button.module.css';
import clsx from '../../../utils/clsx';

/**
 *
 * @param {Object} props
 * @param { 'orange' | 'orangeLight' | 'orangeDark' | 'blue' | 'start' | 'stop' | 'reset' | 'logout'} props.color
 * @param {'circle' | 'capsule' | 'roundedSquare' | 'logout'} props.variant
 * @param {string} props.className
 */

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

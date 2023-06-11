import { forwardRef } from 'react';
import clsx from '../../../utils/clsx';
import classes from './Input.module.css';

const Input = forwardRef(function (
  {
    type,
    name,
    required = false,
    text,
    color,
    down = false,
    noMargin,
    ...props
  },
  ref
) {
  const margin = noMargin && classes.noMargin;

  return (
    <>
      {!down && (
        <label className={classes.label} htmlFor={type}>
          {text}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(classes[`input-${color}`], classes.input, margin)}
        id={name}
        type={type}
        name={name}
        required={required}
        {...props}
      />
      {down && (
        <label className={classes.label} htmlFor={type}>
          {text}
        </label>
      )}
    </>
  );
});

export default Input;

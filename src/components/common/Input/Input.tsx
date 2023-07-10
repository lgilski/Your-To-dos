import { forwardRef, ReactNode, Ref } from 'react';
import clsx from '../../../utils/clsx';
import classes from './Input.module.css';

// type,
//     name,
//     required = false,
//     text,
//     color,
//     down = false,
//     noMargin,
//     ...props

// function Input({
//   value = '',
//   type = 'text',
//   handleChange,
//   label,
//   id,
//   helptext,
//   validationMessage,
//   validationType,
//   ...otherProps
// }: InputProps & React.InputHTMLAttributes) {}

interface Props {
  children?: ReactNode;
  type: string;
  name: string;
  required?: boolean;
  text: string;
  color: string;
  down?: boolean;
  value?: any;
  noMargin?: boolean;
  otherProps?: any;
}

const Input = forwardRef(function (
  {
    type,
    name,
    required = false,
    text,
    color,
    down = false,
    noMargin,
    autoComplete,
    ...otherProps
  }: Props & React.InputHTMLAttributes<any>,
  ref: Ref<HTMLInputElement>
) {
  const margin = noMargin && classes.noMargin;

  return (
    <>
      {!down && (
        <label className={classes.label} htmlFor={name}>
          {text}
        </label>
      )}
      <input
        autoComplete={autoComplete}
        ref={ref}
        className={clsx(classes[`input-${color}`], classes.input, margin)}
        id={name}
        type={type}
        name={name}
        required={required}
        {...otherProps}
      />
      {down && (
        <label className={classes.label} htmlFor={name}>
          {text}
        </label>
      )}
    </>
  );
});

export default Input;

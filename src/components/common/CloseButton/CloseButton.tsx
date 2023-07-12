import clsx from '../../../utils/clsx';
import classes from './CloseButton.module.css';

function CloseButton({
  color,
  size,
  className,
  ...props
}: {
  size?: string;
  color?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        classes.btn,
        color && classes[color],
        size && classes[size],
        className
      )}
      {...props}
    >
      &#x2715;
    </button>
  );
}

export default CloseButton;

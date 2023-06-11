import clsx from '../../../utils/clsx';
import classes from './CloseButton.module.css';

function CloseButton({ color, size, className, ...props }) {
  return (
    <button
      className={clsx(classes.btn, classes[color], classes[size], className)}
      {...props}
    >
      &#x2715;
    </button>
  );
}

export default CloseButton;

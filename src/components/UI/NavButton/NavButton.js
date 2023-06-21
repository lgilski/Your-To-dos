import { NavLink } from 'react-router-dom';

import classes from './NavButton.module.css';
import clsx from '../../../utils/clsx';

/**
 *
 * @param {Object} props
 * @param {string} props.to
 * @param {boolean} props.end
 * @param {boolean} props.auth
 */

function NavButton({ to, end, className, auth, logout, ...props }) {
  const authBtn = auth && classes.authBtn;

  return (
    <>
      <li className={className}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? clsx(classes.active, classes.btn, authBtn)
              : clsx(classes.btn, authBtn)
          }
          end={end}
          {...props}
        />
      </li>
    </>
  );
}

export default NavButton;

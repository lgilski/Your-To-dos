import { NavLink } from 'react-router-dom';

import classes from './NavButton.module.css';
import clsx from '../../../utils/clsx';

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

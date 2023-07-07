import { NavLink } from 'react-router-dom';

import classes from './AppNavButton.module.css';
import clsx from '../../../../utils/clsx';

function AppNavButton({ to, children, end, ...props }) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive ? clsx(classes.active, classes.btn) : clsx(classes.btn)
        }
        to={to}
        end={end}
        {...props}
      >
        <span className={classes.content}>{children}</span>
      </NavLink>
    </li>
  );
}

export default AppNavButton;

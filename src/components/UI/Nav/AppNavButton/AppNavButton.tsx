import React from 'react';
import { NavLink } from 'react-router-dom';

function AppNavButton({
  to,
  children,
  end,
  ...props
}: {
  to: string;
  end: boolean;
} & React.LinkHTMLAttributes<HTMLAnchorElement>) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `relative block py-2 px-4 font-medium text-grey-700 no-underline duration-300 dark:text-grey-200 ${
            isActive
              ? 'dark:hover:bg-grey-700 hover:bg-orange-200'
              : 'dark:hover:bg-grey-800 hover:bg-orange-100'
          } ${isActive && 'dark:bg-grey-800 bg-orange-100'} ${
            isActive &&
            'after:absolute after:top-0 after:right-0 after:w-1 after:h-full after:content-[""] after:bg-orange-600 after:dark:bg-orange-500'
          }`
        }
        to={to}
        end={end}
        {...props}
      >
        <span className='flex gap-2 items-center list-none'>
          {children}
        </span>
      </NavLink>
    </li>
  );
}

export default AppNavButton;

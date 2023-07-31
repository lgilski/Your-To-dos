import { useState } from 'react';
import Subtitle from '../../../Home/Subtitle/Subtitle';

function AppNavigationHorizontal() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const changeTheme = function () {
    const rootElement = document.documentElement;
    rootElement.classList.toggle('dark');

    if (localStorage.getItem('theme') === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <nav className='fixed top-0 left-0 z-[1] w-full py-3 px-4 overflow-hidden bg-white shadow-md  flex justify-between dark:bg-grey-900 duration-500 dark:border-b dark:border-grey-500 dark:border-solid dark:border-t-0 dark:border-x-0'>
      <Subtitle type={'small'} />
      <label className='relative inline-block w-14 h-7 overflow-hidden cursor-pointer'>
        <input
          onClick={changeTheme}
          type='checkbox'
          checked={theme === 'light' ? false : true}
          className='opacity-0 w-0 h-0  peer'
        />
        <span className='absolute cursor-pointer p-0.5 top-0 left-0 right-0 bottom-0 bg-orange-200 duration-300 shadow-inner before:absolute before:content-[""] before:h-6 before:w-6 before:bg-white before:duration-300 before:shadow-xl before:z-[2] before:rounded-full peer-checked:bg-orange-400 peer-checked:before:translate-x-7 rounded-full' />
        <div className='absolute top-0.5 left-1.5 w-5 h-5 select-none'>
          🌛
        </div>
        <div className='absolute top-0.5 right-1.5 w-5 h-5 select-none'>
          🌞
        </div>
      </label>
    </nav>
  );
}

export default AppNavigationHorizontal;

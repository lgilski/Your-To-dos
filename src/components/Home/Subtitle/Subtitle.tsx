import { Link } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import clsx from '../../../utils/clsx';

const Subtitle = function ({ type }: { type?: string }) {
  const user = auth.currentUser;

  return (
    <div className={'flex flex-col gap-2 justify-items-center '}>
      <Link
        to={!user ? '/' : '/app/cards'}
        className={clsx(
          'font-extrabold text-orange-400 no-underline',
          type === 'small' ? 'text-2xl' : 'text-4xl'
        )}
      >
        Your To-dos{' '}
        <span className='text-grey-900'>and stuff UwU</span>
      </Link>
    </div>
  );
};

export default Subtitle;

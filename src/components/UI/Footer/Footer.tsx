import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='sticky top-full w-full py-32 px-0 text-base text-grey-600 bg-grey-050 border-t-2 border-x-0 border-b-0 border-grey-200 border-solid [&_h6]:mb-9 [&_h6]:text-xl [&_h6]:font-medium [&_h6]:text-grey-700 [&_a]:text-base [&_a]:text-grey-600 [&_a]:no-underline hover:[&_a]:text-grey-800'>
      <div className='grid grid-cols-6 max-w-[1200px] my-0 mx-auto py-0 px-8 gap-y-24 gap-x-16 max-[1100px]:grid-rows-2 max-[1100px]:grid-cols-6 max-[1100px]:gap-y-16 max-[1100px]:gap-x-12 '>
        <div
          className={
            'flex flex-col col-span-2 max-[1100px]:row-start-2 max-[1100px]:col-span-3'
          }
        >
          <h5
            className={'mb-4 text-xl font-extrabold text-orange-400'}
          >
            Your To-dos{' '}
            <span className='text-grey-900'>and stuff UwU</span>
          </h5>
          <div
            className={
              'flex gap-4 [&_*]:text-grey-600 [&_*]:w-6 [&_*]:h-6 [&_*]:duration-300 hover:[&_*]:text-grey-800'
            }
          >
            <Link to='#'>
              <ion-icon name='logo-instagram' />
            </Link>
            <Link to='#'>
              <ion-icon name='logo-facebook' />
            </Link>
            <Link to='#'>
              <ion-icon name='logo-twitter' />
            </Link>
            <Link to='#'>
              <ion-icon name='logo-youtube' />
            </Link>
          </div>
          <p className='mt-auto text-sm'>
            Copyright &copy; 2023 by Your To-dos and stuff UwU, Inc.
            All rights reserved.
          </p>
        </div>
        <div className=' max-[1100px]:row-start-2  max-[1100px]:row-end-3  max-[1100px]:col-start-4 max-[1100px]:col-span-3'>
          <h6>Contact us</h6>
          <address className='not-italic'>
            <p className='mb-6'>
              Kasztankowa 2115, 3rd Floor, Warsaw, 42-DK(p)
            </p>
            <p>
              <a href='tel:213-755-8082'>213-755-8082</a>
              <br />
              <a href='mailto:hello@yourtodos.com'>
                hello@yourtodos.com
              </a>
            </p>
          </address>
        </div>
        <nav className='max-[1100px]:row-start-1 max-[1100px]:col-span-2'>
          <h6>Account</h6>
          <ul className='flex flex-col gap-4 list-none'>
            <li>
              <Link to='/auth?mode=signup'>Create account</Link>
            </li>
            <li>
              <Link to='/auth?mode=login'>Sign in</Link>
            </li>
          </ul>
        </nav>
        <nav className='max-[1100px]:row-start-1 max-[1100px]:col-span-2'>
          <h6>Company</h6>
          <ul className='flex flex-col gap-4 list-none'>
            <li>
              <Link to='#'>About Your To-dos</Link>
            </li>
            <li>
              <Link to='#'>For Business</Link>
            </li>
            <li>
              <Link to='#'>Our partners</Link>
            </li>
          </ul>
        </nav>
        <nav className='max-[1100px]:row-start-1 max-[1100px]:col-span-2'>
          <h6>Resources</h6>
          <ul className='flex flex-col gap-4 list-none'>
            <li>
              <Link to='#'>Help center</Link>
            </li>
            <li>
              <Link to='#'>Privacy & terms</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

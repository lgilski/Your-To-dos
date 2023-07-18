import { Link } from 'react-router-dom';

// import classes from './Hero.module.css';
import { auth } from '../../../config/firebase';

function Hero() {
  const user = auth.currentUser;

  return (
    <section className='relative flex items-center h-[700px] bg-hero-pattern bg-cover bg-center'>
      <div className='w-[1300px] m-auto'>
        <div className='max-w-[700px] max-[1200px]:m-auto'>
          <h2 className='text-7xl font-extrabold leading-[1.1] text-transparent tracking-tight bg-gradient-to-tr from-orange-500 to-orange-300 bg-clip-text max-[1200px]:text-center'>
            Here you can keep all your todos and more!
          </h2>
          <p className='max-w-[540px] my-4 leading-[160%] text-2xl text-orange-50 max-[1200px]:w-[350px] max-[1200px]:px-0 max-[1200px]:py-3 max-[1200px]:m-auto max-[1200px]:text-center '>
            We offer a really cool way of planing your to-dos. You will surely
            have a lot of fun.
          </p>
          <div className='flex gap-4 mt-8 max-[1200px]:w-[160px] max-[1200px]:flex-col max-[1200px]:mx-auto max-[1200px]:mt-8'>
            <Link
              to={user ? '/cards' : '/auth/signup'}
              className='px-8 py-4 text-xl font-medium text-lime-green-900 no-underline bg-lime-green-300 rounded-full hover:text-lime-green-050 hover:bg-lime-green-600 duration-300'
            >
              Get started
            </Link>
            <a
              href='##'
              className='px-8 py-4 text-xl font-medium text-orange-900 no-underline bg-orange-100 rounded-full hover:text-orange-050 hover:bg-orange-600 duration-300'
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

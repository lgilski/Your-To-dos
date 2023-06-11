import { useRouteLoaderData } from 'react-router-dom';
import classes from './HomePage.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { dataActions } from '../store';
import Hero from '../components/UI/Hero/Hero';
import SectionHeader from '../components/UI/SectionHeader/SectionHeader';
import Features from '../components/UI/Features/Features';

function HomePage() {
  const dispatch = useDispatch();

  const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

  useEffect(() => {
    if (cardsFromLocalStorage !== null) {
      dispatch(dataActions.setCards(cardsFromLocalStorage));
    } else {
      dispatch(dataActions.setCards([]));
    }
  }, []);
  const { email } = useRouteLoaderData('root');

  return (
    <>
      {/* {email && <p>Welcome {email}</p>} */}
      <Hero />
      <section className={classes.wrapper}>
        <SectionHeader
          subheader='Features'
          header='We have many uwu features'
        />
        <Features />
      </section>
      {/* <section className='dark-section'>
        <div className={classes.wrapperSecond}>
          <h4 className='subheader'>What we offer</h4>
          <h3
            style={{ color: '#fff' }}
            className={`header ${classes['light-header']}`}
          >
            How does it work?
          </h3>
          <div style={{ color: '#fff' }}>AAAAAAAAAAAA</div>
        </div>
      </section> */}
      <section>
        <div className='developement'>STILL IN DEVELOPEMENT</div>
      </section>
    </>
  );
}

export default HomePage;

import classes from './HomePage.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { dataActions } from '../store';
import Hero from '../components/Home/Hero/Hero';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import Features from '../components/Home/Features/Features';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { cardActions } from '../store/card';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

  const user = auth.currentUser;

  useEffect(() => {
    if (cardsFromLocalStorage !== null) {
      dispatch(cardActions.setCards(cardsFromLocalStorage));
    } else {
      dispatch(cardActions.setCards([]));
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/app/cards');
    }
  }, [user, navigate]);

  return (
    <>
      {/* {email && <p>Welcome {email}</p>} */}
      <Hero />
      <section className='wrapper'>
        <SectionHeader
          className={classes.headerPadding}
          subheader='Features'
          header='We have many uwu features'
          type='large'
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
      {/* <section>
        <div className='developement'>STILL IN DEVELOPEMENT</div>
      </section> */}
    </>
  );
}

export default HomePage;

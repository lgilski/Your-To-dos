import { useEffect } from 'react';
import Hero from '../components/Home/Hero/Hero';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import Features from '../components/Home/Features/Features';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const userVerified = auth.currentUser?.emailVerified;

  useEffect(() => {
    if (userVerified) {
      navigate('/app/cards');
    }
  }, [userVerified, navigate]);

  return (
    <>
      {/* {email && <p>Welcome {email}</p>} */}
      <Hero />
      <section className='max-w-[1200px] mt-16 mb-20 mx-auto'>
        <SectionHeader
          // className={classes.headerPadding}
          className='w-full py-8'
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

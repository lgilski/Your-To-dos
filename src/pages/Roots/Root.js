import {
  Outlet,
  useLoaderData,
  useLocation,
  useOutlet,
  useSubmit,
} from 'react-router-dom';

import MainNavigation from '../../components/UI/MainNavigation/MainNavigation';
import { useEffect } from 'react';
import { getCurrentUser, getTokenDuration } from '../../utils/auth';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Footer from '../../components/UI/Footer/Footer';
import TimerNavigation from '../../components/Timer/TimerNavigation/TimerNavigation';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';

// Problems with loging out too early

function RootLayout({ routes }) {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find(route => route.path === location.pathname) ?? {};

  // const user = useSelector(state => state.data.user);
  const isLoading = useSelector(state => state.data.loading);

  // const { user } = useLoaderData();

  // const user = getCurrentUser();

  const submit = useSubmit();

  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }

  //   // if (token === 'EXPIRED') {
  //   //   submit(null, { action: '/logout', method: 'post' });
  //   // }

  //   // const tokenDuration = getTokenDuration();

  //   // setTimeout(() => {
  //   //   submit(null, { action: '/logout', method: 'post' });
  //   // }, tokenDuration);
  // }, [user]);

  if (isLoading) {
    return (
      <TailSpin
        height='100'
        width='100'
        color='#d87620'
        ariaLabel='tail-spin-loading'
        radius='0'
        wrapperStyle={{}}
        wrapperClass='spinner2'
        visible={true}
      />
    );
  }

  return (
    <>
      <MainNavigation />
      {/* <CSSTransition
        key={'timerNav'}
        timeout={200}
        classNames='page'
        in={location.pathname.startsWith('/timer')}
        unmountOnExit
      >
        <div className='page'>
          <TimerNavigation />
        </div>
      </CSSTransition> */}
      <main>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={200}
            classNames='page'
            unmountOnExit
          >
            {state => (
              <div ref={nodeRef} className='page'>
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
        {/* <Outlet /> */}
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;

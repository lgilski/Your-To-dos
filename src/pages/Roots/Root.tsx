import {
  useLocation,
  useNavigate,
  useOutlet,
} from 'react-router-dom';

import MainNavigation from '../../components/UI/Nav/MainNavigation/MainNavigation';
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';
import Footer from '../../components/UI/Footer/Footer';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import { auth } from '../../config/firebase';
import AppNavigation from '../../components/UI/Nav/AppNavigation/AppNavigation';
import clsx from '../../utils/clsx';

import AppNavigationHorizontal from '../../components/UI/Nav/AppNavigationHorizontal/AppNavigationHorizontal';
import { WholeState } from '@/types';
import { useEffect } from 'react';

function RootLayout({ routes }: { routes: any }) {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const navigate = useNavigate();

  // const ref: { current: NodeJS.Timeout | undefined } =
  //   useRef(undefined);

  const { nodeRef } =
    routes.find((route: any) => {
      route.path === location.pathname;
    }) ?? {};

  const isLoading = useSelector(
    (state: WholeState) => state.data.loading
  );
  const isSidenavOpen = useSelector(
    (state: WholeState) => state.data.isSidenavOpen
  );
  // const activeIndex = useSelector(
  //   (state: WholeState) => state.timers.activeIndex
  // );
  // const timers = useSelector(
  //   (state: WholeState) => state.timers.timers
  // );

  const userVerified = auth.currentUser?.emailVerified;

  useEffect(() => {
    if (
      location.pathname.includes('app') &&
      !isLoading &&
      !userVerified
    ) {
      navigate('/');
    }
  }, [isLoading]);

  // useEffect(() => {
  //   if (timers[activeIndex])
  //     setInterval(() => {
  //       console.log(timers[activeIndex].timeRemaining);
  //     }, 1000);
  // }, [activeIndex]);

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
      <ToastContainer />
      {!userVerified && <MainNavigation />}
      {userVerified && <AppNavigation />}
      {userVerified && <AppNavigationHorizontal />}
      <main
        className={clsx(
          userVerified && 'pl-[200px]',
          !isSidenavOpen && userVerified && 'pl-[58px]',
          'ease-in-out duration-300',
          userVerified && 'bg-grey-050 dark:bg-grey-800',
          userVerified && 'min-h-screen'
        )}
      >
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={200}
            classNames={{
              enterActive: 'pageEnterActive',
              enter: 'pageEnter',
              exitActive: 'pageExitActive',
              exit: 'pageExit',
            }}
            unmountOnExit
          >
            {() => (
              <div ref={nodeRef} className='page'>
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </main>
      {!userVerified && <Footer />}
    </>
  );
}

export default RootLayout;

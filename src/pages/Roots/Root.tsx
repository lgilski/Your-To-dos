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

  const { nodeRef } =
    routes.find((route: any) => route.path === location.pathname) ??
    {};

  console.log(location);

  const isLoading = useSelector(
    (state: WholeState) => state.data.loading
  );
  const isSidenavOpen = useSelector(
    (state: WholeState) => state.data.isSidenavOpen
  );

  const user = auth.currentUser;

  useEffect(() => {
    if (location.pathname.includes('app') && !isLoading && !user) {
      navigate('/');
    }
  }, [isLoading]);

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
      {!user && <MainNavigation />}
      {/* <MainNavigation /> */}
      {user && <AppNavigation />}
      {user && <AppNavigationHorizontal />}
      {/* <AppNavigation /> */}
      <main
        className={clsx(
          user && 'pl-[200px]',
          !isSidenavOpen && user && 'pl-[58px]',
          'ease-in-out duration-300 ',
          user && 'greyBg',
          user && 'min-h-screen'
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
      {!user && <Footer />}
    </>
  );
}

export default RootLayout;

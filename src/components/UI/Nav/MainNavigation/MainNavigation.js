import classes from './MainNavigation.module.css';

import Subtitle from '../../../Home/Subtitle/Subtitle';
import { useMediaPredicate } from 'react-media-hook';
import { useEffect, useState } from 'react';
import clsx from '../../../../utils/clsx';
import { CSSTransition } from 'react-transition-group';
import MainNavContent from './MainNavContent/MainNavContent';

function MainNavigation() {
  const lessThan1100 = useMediaPredicate('(max-width: 1100px)');

  const [showMobile, setShowMobile] = useState(false);

  const showMobileNav = function () {
    setShowMobile(prevState => !prevState);
  };

  useEffect(() => {
    if (!lessThan1100) {
      setShowMobile(false);
    }
  }, [lessThan1100]);

  return (
    <header className={classes.wrapper}>
      <Subtitle />
      <nav>
        {lessThan1100 && (
          <ion-icon
            name={showMobile ? 'close' : 'menu'}
            onClick={showMobileNav}
          />
        )}
        <MainNavContent showMobile={showMobile} showMobileNav={showMobileNav} />
        <CSSTransition
          classNames={{
            enterActive: classes['fade-enter-active-blur'],
            enter: classes['fade-enter-blur'],
            exitActive: classes['fade-exit-active-blur'],
            exit: classes['fade-exit-blur'],
          }}
          timeout={300}
          in={showMobile}
        >
          <div className={clsx(classes.blur, showMobile && classes.showBlur)} />
        </CSSTransition>
      </nav>
    </header>
  );
}

export default MainNavigation;

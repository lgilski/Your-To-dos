import Subtitle from '../../../Home/Subtitle/Subtitle';

import classes from './AppNavigationHorizontal.module.css';

function AppNavigationHorizontal() {
  return (
    <nav className={classes.horizontalNav}>
      <Subtitle type={'small'} />
    </nav>
  );
}

export default AppNavigationHorizontal;

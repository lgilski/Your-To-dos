import FormCards from '../components/CardsFolder/FormCard/FormCard';
import Cards from '../components/CardsFolder/Cards/Cards';
import { Link, useRouteLoaderData } from 'react-router-dom';

import classes from './CardsPage.module.css';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';

function CardsPage() {
  const { token } = useRouteLoaderData('root');

  return (
    <div>
      {!token && (
        <section className={classes.wrapper}>
          <div className={classes.loginToGetAccess}>
            Log in to get access to your cards.
          </div>
          <div className={classes.textContainer}>
            <h2 className={classes['cards--h2']}>Don't have an account?</h2>
            <Link to='/auth?mode=signup' className={classes.signup}>
              Sing up now
            </Link>
          </div>
        </section>
      )}
      {token && (
        <SectionHeader
          className='pageTitle-center'
          subheader='Cards page'
          header='Start planning your days'
        />
      )}
      {token && <FormCards />}
      {token && <Cards />}
    </div>
  );
}

export default CardsPage;

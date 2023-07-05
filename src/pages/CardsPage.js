import Cards from '../components/CardsFolder/Cards/Cards';

import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import LoginToGetAccess from '../components/common/LoginToGetAccess/LoginToGetAccess';
import { auth } from '../config/firebase';

function CardsPage() {
  // const { user } = useRouteLoaderData('root');
  const user = auth.currentUser;

  return (
    <section className='gray-bg'>
      {!user && <LoginToGetAccess />}
      {user && (
        <SectionHeader
          className='pageTitle-center padding-top'
          subheader='Cards page'
          header='Start planning your days'
          type='medium'
        />
      )}
      {user && <Cards />}
    </section>
  );
}

export default CardsPage;

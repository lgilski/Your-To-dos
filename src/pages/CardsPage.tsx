import Cards from '../components/CardsFolder/Cards/Cards';

import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import LoginToGetAccess from '../components/common/LoginToGetAccess/LoginToGetAccess';
import { auth } from '../config/firebase';

function CardsPage() {
  const userVerified = auth.currentUser?.emailVerified;

  return (
    <section className='greyBg paddingBottom'>
      {!userVerified && <LoginToGetAccess />}
      {userVerified && (
        <SectionHeader
          className='pageTitleCenter paddingTop'
          subheader='Cards page'
          header='Start planning your days'
          type='medium'
        />
      )}
      {userVerified && <Cards />}
    </section>
  );
}

export default CardsPage;

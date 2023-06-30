import FormCards from '../components/CardsFolder/FormCard/FormCard';
import Cards from '../components/CardsFolder/Cards/Cards';
import { useRouteLoaderData } from 'react-router-dom';

import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import LoginToGetAccess from '../components/common/LoginToGetAccess/LoginToGetAccess';
import SearchTask from '../components/CardsFolder/SearchTask/SearchTask';

function CardsPage() {
  const { token } = useRouteLoaderData('root');

  return (
    <div>
      {!token && <LoginToGetAccess />}
      {token && (
        <SectionHeader
          className='pageTitle-center'
          subheader='Cards page'
          header='Start planning your days'
          type='medium'
        />
      )}
      {token && <FormCards />}
      {token && <SearchTask />}
      {token && <Cards />}
    </div>
  );
}

export default CardsPage;

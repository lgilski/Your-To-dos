import {
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';
import MainNavigation from '../components/UI/Nav/MainNavigation/MainNavigation';

import PageContent from '../components/Error/PageContent';
import { auth } from '../config/firebase';
import AppNavigation from '../components/UI/Nav/AppNavigation/AppNavigation';
import AppNavigationHorizontal from '../components/UI/Nav/AppNavigationHorizontal/AppNavigationHorizontal';

function ErrorPage() {
  const error = useRouteError();

  const userVerified = auth.currentUser?.emailVerified;

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (isRouteErrorResponse(error)) {
    // DEV - remember to delete!!!
    if (error.data.message) {
      message = error.data.message;
    }

    if (error.status === 500) {
      message = error.data.message;
    }

    if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page.';
    }
  }

  return (
    <>
      {!userVerified && <MainNavigation />}
      {userVerified && <AppNavigation />}
      {userVerified && <AppNavigationHorizontal />}
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;

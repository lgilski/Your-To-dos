import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Roots/Root';
import HomePage from './pages/HomePage';
import AuthPage, { action as authAction } from './pages/AuthPage';
import CardsPage from './pages/CardsPage';
import TimerPage from './pages/TimerPage';
import WeatherPage from './pages/WeatherPage';
import { action as logoutAction } from './components/Logout';

import { dataLoader } from './utils/auth';
import ErrorPage from './pages/Error';

import { loader as cardsLoader } from './components/CardsFolder/Cards';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataActions } from './store';
import TimerRoot from './pages/Roots/TimerRoot';
import Stopwatch from './components/Timer/Stopwatch/Stopwatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    // loader: tokenLoader,
    loader: dataLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cards', element: <CardsPage />, loader: cardsLoader },
      {
        path: 'timer',
        element: <TimerRoot />,
        children: [
          { index: true, element: <TimerPage /> },
          { path: 'stopwatch', element: <Stopwatch /> },
        ],
      },
      { path: 'auth', element: <AuthPage />, action: authAction },
      {
        path: 'logout',
        action: logoutAction,
        // loader: logoutLoader,
      },
      { path: 'weather', element: <WeatherPage /> /* loader */ },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

    if (cardsFromLocalStorage === null) return;

    const getDataFromDB = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_LINK}${localStorage
          .getItem('email')
          .split('.')
          .join('-')}.json`
      );

      const data = await response.json();

      dispatch(dataActions.setCards(data.cards));
    };
    getDataFromDB();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

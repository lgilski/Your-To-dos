import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Roots/Root';
import HomePage from './pages/HomePage';
import AuthPage, { action as authAction } from './pages/AuthPage';
import CardsPage from './pages/CardsPage';
import TimerPage from './pages/TimerPage';
import WeatherPage from './pages/WeatherPage';
import { action as logoutAction } from './utils/logout';

import { dataLoader } from './utils/auth';
import ErrorPage from './pages/Error';

import { loader as cardsLoader } from './components/CardsFolder/Cards/Cards';
import { useDispatch } from 'react-redux';
import { dataActions } from './store';
import TimerRoot from './pages/Roots/TimerRoot';
import Stopwatch from './components/Timer/Stopwatch/Stopwatch';
import WeatherRoot from './pages/Roots/WeatherRoot';
import WeatherDetailPage from './pages/WeatherDetailPage';

const routes = [
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
  },
  {
    path: 'weather',
    element: <WeatherRoot />,
    children: [
      {
        index: true,
        element: <WeatherPage />,
      },
      {
        path: ':city',
        id: 'weather-detail',
        // loader: weatherLoader,
        element: <WeatherDetailPage />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout routes={routes} />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: dataLoader,
    children: routes,
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

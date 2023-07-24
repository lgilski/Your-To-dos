import { useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import RootLayout from './pages/Roots/Root';
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import TimerPage from './pages/TimerPage';
import WeatherPage from './pages/WeatherPage';
import { action as logoutAction } from './utils/logout';

import ErrorPage from './pages/Error';

import { useDispatch } from 'react-redux';
import { dataActions } from './store';
import WeatherRoot from './pages/Roots/WeatherRoot';
import WeatherDetailPage from './pages/WeatherDetailPage';
import { weatherActions } from './store/weather';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, {
  action as signupAction,
} from './pages/SignpuPage';
import ForgotPasswordPage, {
  action as forgotPasswordAction,
} from './pages/ForgotPasswordPage';
import { auth } from './config/firebase';
import { cardActions } from './store/card';

import { getDatabase, ref, get, child } from 'firebase/database';
import StopwatchPage from './pages/StopwatchPage';

const routes = [
  { index: true, element: <HomePage /> },
  {
    path: 'app',
    children: [
      { path: 'cards', element: <CardsPage /> },
      {
        path: 'timer',
        element: <TimerPage />,
      },
      {
        path: 'stopwatch',
        element: <StopwatchPage />,
      },
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
            element: <WeatherDetailPage />,
          },
        ],
      },
    ],
  },
  { path: 'auth/login', element: <LoginPage />, action: loginAction },
  {
    path: 'auth/signup',
    element: <SignupPage />,
    action: signupAction,
  },
  {
    path: 'auth/forgot-password',
    element: <ForgotPasswordPage />,
    action: forgotPasswordAction,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout routes={routes} />,
    errorElement: <ErrorPage />,
    id: 'root',
    children: routes,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const favorite = JSON.parse(
      localStorage.getItem('favorite') as string
    );

    dispatch(weatherActions.showOnCards(favorite));

    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(cardActions.setIsLoading(true));
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}/cards`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              dispatch(cardActions.setCards(snapshot.val()));
              dispatch(cardActions.setIsLoading(false));
            } else {
              new Error('No data available');
              dispatch(cardActions.setIsLoading(false));
            }
          })
          .catch((error) => {
            new Error(error);
          });
      }
      dispatch(dataActions.isLoading(false));
    });
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

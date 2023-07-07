import { useEffect, useState } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

import RootLayout from './pages/Roots/Root';
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import TimerPage from './pages/TimerPage';
import WeatherPage from './pages/WeatherPage';
import { action as logoutAction } from './utils/logout';

import { dataLoader, getCurrentUser } from './utils/auth';
import ErrorPage from './pages/Error';

import { loader as cardsLoader } from './components/CardsFolder/Cards/Cards';
import { useDispatch } from 'react-redux';
import { dataActions } from './store';
import TimerRoot from './pages/Roots/TimerRoot';
import Stopwatch from './components/Timer/Stopwatch/Stopwatch';
import WeatherRoot from './pages/Roots/WeatherRoot';
import WeatherDetailPage from './pages/WeatherDetailPage';
import { weatherActions } from './store/weather';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, { action as signupAction } from './pages/SignpuPage';
import ForgotPasswordPage, {
  action as forgotPasswordAction,
} from './pages/ForgotPasswordPage';
import { auth } from './config/firebase';

const routes = [
  { index: true, element: <HomePage /> },
  {
    path: 'app',
    children: [
      { path: 'cards', element: <CardsPage />, loader: cardsLoader },
      {
        path: 'timer',
        element: <TimerRoot />,
        children: [
          { index: true, element: <TimerPage /> },
          { path: 'stopwatch', element: <Stopwatch /> },
        ],
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
            // loader: weatherLoader,
            element: <WeatherDetailPage />,
          },
        ],
      },
    ],
  },
  // { path: 'auth', element: <AuthPage />, action: authAction },
  { path: 'auth/login', element: <LoginPage />, action: loginAction },
  { path: 'auth/signup', element: <SignupPage />, action: signupAction },
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
    // loader: getCurrentUser,
    children: routes,
  },
]);

function App() {
  const dispatch = useDispatch();

  // auth.onAuthStateChanged(user => {
  //   console.log(user);
  // });

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favorite'));

    dispatch(weatherActions.showOnCards(favorite));

    auth.onAuthStateChanged(user => {
      if (user) {
        const getDataFromDB = async () => {
          const response = await fetch(
            `${process.env.REACT_APP_FIREBASE_LINK}${user.uid}/cards.json`
          );
          const cardsData = await response.json();

          dispatch(dataActions.setCards(cardsData));
        };
        getDataFromDB();
      }
      dispatch(dataActions.isLoading(false));
    });
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

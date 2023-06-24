import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'todos-app-72428.firebaseapp.com',
  databaseURL:
    'https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todos-app-72428',
  storageBucket: 'todos-app-72428.appspot.com',
  messagingSenderId: '823458145482',
  appId: '1:823458145482:web:65f71f5b5f778fe6d90033',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

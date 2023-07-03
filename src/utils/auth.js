import { redirect } from 'react-router-dom';
import { auth } from '../config/firebase';

// export function getTokenDuration() {
//   const storedExpirationDate = localStorage.getItem('expiration');
//   const expirationDate = new Date(storedExpirationDate);
//   const now = new Date();
//   const duration = expirationDate.getTime() - now.getTime();
//   return duration;
// }

// export function getAuthToken() {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     return null;
//   }

//   const tokenDuration = getTokenDuration();

//   if (tokenDuration < 0) {
//     return 'EXPIRED';
//   }

//   return token;
// }

// export function getEmail() {
//   const email = localStorage.getItem('email');

//   if (!email) {
//     return null;
//   }

//   return email;
// }

// export function dataLoader() {
//   const email = getEmail();
//   const token = getAuthToken();
//   return { email, token };
// }

// export function tokenLoader() {
//   return getAuthToken();
// }

// export function checkAuthLoader() {
//   const token = getAuthToken();

//   if (!token) {
//     return redirect('/auth');
//   }

//   return null;
// }

// export function getCurrentUser() {
//   const aaa = auth.onAuthStateChanged(user => {
//     console.log(user);

//     auth.currentUser = user;

//     console.log(auth.currentUser);
//   });

//   const user = auth.currentUser;

//   console.log(aaa);

//   console.log(user);

//   return { user };
// }

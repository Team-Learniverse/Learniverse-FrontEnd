import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDjK6isLBGownY7C1AEA6n05-hjpZEleEo',
  authDomain: 'learniverse-b34d9.firebaseapp.com',
  projectId: 'learniverse-b34d9',
  storageBucket: 'learniverse-b34d9.appspot.com',
  messagingSenderId: '605501909741',
  appId: '1:605501909741:web:e9a496058fa8b1812bbae4',
  measurementId: 'G-PKVGVW8D2X',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

getToken(messaging, {
  vapidKey:
    'BFkKBCZ5O4qmyCwm50Aks7sRmMYJzF2wJ8FZCHNLXDLjVxMDEQJFZ_4U5I6uDBF1zXiRHChNAeeDWrTg2m0eL_k',
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log('currentToken', currentToken);
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.',
      );
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

// 포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
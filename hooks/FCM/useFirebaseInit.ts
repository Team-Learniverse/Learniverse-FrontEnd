import firebase from 'firebase/app';
import { useEffect } from 'react';

const useFirebaseInit = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDjK6isLBGownY7C1AEA6n05-hjpZEleEo',
        authDomain: 'learniverse-b34d9.firebaseapp.com',
        projectId: 'learniverse-b34d9',
        storageBucket: 'learniverse-b34d9.appspot.com',
        messagingSenderId: '605501909741',
        appId: '1:605501909741:web:e9a496058fa8b1812bbae4',
        measurementId: 'G-PKVGVW8D2X',
      });
    }
  }, []);
};

export default useFirebaseInit;

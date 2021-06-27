import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBuFCuCEfC3aZWQUURFp8Ue5Rm5nfkD-2E',
    authDomain: 'hygiene-store.firebaseapp.com',
    databaseURL: 'https://hygiene-store-default-rtdb.firebaseio.com',
    projectId: 'hygiene-store',
    storageBucket: 'hygiene-store.appspot.com',
    messagingSenderId: '751246769581',
    appId: '1:751246769581:web:d8b8eb9977f8e3f64ef524',
    measurementId: 'G-B6K6NZKKSY',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

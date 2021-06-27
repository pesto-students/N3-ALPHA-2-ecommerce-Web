import firebase from './firebase';
export const auth = firebase.auth();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database().ref();

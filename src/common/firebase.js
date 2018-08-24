import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDtTf6JazrP_0yGD2cOarEBeGDw2KV2Tlo",
  authDomain: "soulsaga-93aed.firebaseapp.com",
  databaseURL: "https://soulsaga-93aed.firebaseio.com",
  projectId: "soulsaga-93aed",
  storageBucket: "soulsaga-93aed.appspot.com",
  messagingSenderId: "74523654997"
};

firebase.initializeApp(config);

/** AUTH */
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

/** REALTIME DATABASE */
export const DATA_CONSENT = 'dataConsent/';
export const database  = firebase.database();

export default firebase;
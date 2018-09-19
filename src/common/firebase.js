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

export const API_KEY = config.apiKey;
export const CLIENT_ID = "74523654997-1kdsgd6qj5esjklbetqugemt3gd7nht5.apps.googleusercontent.com";
export const GDRIVE_DISCOVERY_DOCS = "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
export const GDRIVE_APP_SCOPE = "https://www.googleapis.com/auth/drive.appdata"

/** AUTH */
export const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope(GDRIVE_APP_SCOPE);
export const auth = firebase.auth();

/** REALTIME DATABASE */
export const DATA_CONSENT = 'dataConsent/';
export const PRIVACY_CONSENT = "privacyTerms";
export const TIMELINE_CONSENT = "timeline";

export const TIMELINE = "timeline/";
export const database  = firebase.database();

export default firebase;
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
});

export const storage = firebaseApp.storage();
export const firestore = firebaseApp.firestore();

// VUE_APP_API_KEY = "AIzaSyC5fJ0lSSYCWV3b5B1WWOHmnYFFNil-0iU"
// VUE_APP_AUTO_DOMAIN = "loto-bolao.firebaseapp.com"
// VUE_APP_DATABASE_URL = "https://loto-bolao.firebaseio.com"
// VUE_APP_PROJECT_ID = "loto-bolao"
// VUE_APP_STORAGE_BUCKET = "loto-bolao.appspot.com"
// VUE_APP_MESSAGING_SENDER_ID = "323288982802"
// VUE_APP_APP_ID = "1:323288982802:web:e13863ab42a5d1ccb6bfcb"
// VUE_APP_MEASUREMENT_ID = "G-KS47BSSGS6"

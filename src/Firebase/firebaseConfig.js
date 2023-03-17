import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/storage";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  
}


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.firestore();
const storage = firebase.storage()



const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase, auth, storage }
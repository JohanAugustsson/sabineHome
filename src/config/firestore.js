import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';



const config = {
   apiKey: "AIzaSyBWz1JqCfopZ0fEezJTKiRg9eKn6OxzE0c",
   authDomain: "sabinehomepage.firebaseapp.com",
   databaseURL: "https://sabinehomepage.firebaseio.com",
   projectId: "sabinehomepage",
   storageBucket: "sabinehomepage.appspot.com",
   messagingSenderId: "224998450508"
 };
 firebase.initializeApp(config);

// config for firebase realtime db
export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// config for firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// initialize Firestore
firebase.firestore();

// export firestore

const db = firebase;
export default db;




// exampel of uppload
// db.collection('users').doc('test').set({
//   first: 'John',
//   last: 'Lovelace',
//   born: 1988
// });

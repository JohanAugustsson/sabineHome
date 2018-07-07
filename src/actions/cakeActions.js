import db from '../config/firestore'
const cakesList = require('../mock/cakes');

export const CAKE_LOADED = 'CAKE_LOADED'


function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}


const getCakesFromDB = () => async (dispatch) => {
  await resolveAfter2Seconds();


  return dispatch({type: CAKE_LOADED, payload: cakesList  });
}




export { getCakesFromDB };



// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");
//
// const admin = require('firebase-admin');
//
// var serviceAccount = require('C:/WebbEget/sabinehome/src/mock/firebaseKey.json');
//
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
//
// var db = admin.firestore();
//
// db.collection('users').doc('alovelace').set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

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



const saveCakeToDb = (cake) => async (dispatch) => {
  const newCake = db.firestore().collection("cakes").doc(); // skapar en referens och vi får med id
  newCake.set({
    ...cake, id: newCake.id
  })
  .then( ()=>{
    console.log('kakan har lagts till');
  }).catch(()=>{
    console.log('något gick fel');
  })

}




const saveFileToDb = (file) => async (dispatch) => {
  var storageRef = db.storage().ref();
  const imageRef = storageRef.child('cakes/apple11.jpg')
  //const url = console.log(imageRef.getDownloadURL());

  return imageRef.put(file).then((response)=>{
    return imageRef.getDownloadURL();

  }).then((image)=>{
    console.log('file uploaded :)',image);
    return dispatch({type:"help me", payload: image});
  })
}


var storageRef = db.storage().ref();
const imageRef = storageRef.child('cakes/')
console.log(imageRef.getDownloadURL());

export { getCakesFromDB, saveCakeToDb,saveFileToDb };

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

import { createStore, applyMiddleware ,combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { cakeReducer } from '../reducers/cakeReducer';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer  } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import { rrfConfig } from './firestore' //config file for firestore


// reducer setup
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cakes: cakeReducer,
})

// initialState setup for redux
const initialState = {
  firebase: {},
  firestore: {},
  cakes: {},
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;

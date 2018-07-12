// import { FETCHED_IMAGES, FETCHING_IMAGES } from '../actions/ImageActions'


const initialState = {
  data: [],
  fetching: false,
  fetched: false
}


const cakeReducer = (state = initialState, action) =>{
  switch (action.type) {
    case 'CAKE_LOADED':
      return {...state, 'fetched': true, 'data': action.payload}
    default:
      return state;
  }
}


export { cakeReducer };

import { FETCHED_IMAGES, FETCHING_IMAGES } from '../actions/ImageActions'

const initialState = {
  data: [],
  fetching: false,
  fetched: false
}


const imageReducer = (state = initialState, action) =>{
  switch (action.type) {
    case FETCHED_IMAGES:
      return {...state, 'fetched': true, fetching: false,'data': action.payload}
    case FETCHING_IMAGES:
      return {...state, 'fetched': false, fetching: true, 'data': action.payload}
    default:
      return state;
  }
}

export { imageReducer };

import { UPDATE_NEWCAKE } from '../actions/cakeActions';



const initialState = {
  data: [],
  fetching: false,
  fetched: false
}


const cakeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NEWCAKE:
      return {...state, newCake: { ...state.newCake, ...payload } }
    default:
      return state;
  }
}


export { cakeReducer };

import db from '../config/firestore'

export const FETCHING_IMAGES = 'FETCHING_IMAGES';
export const FETCHED_IMAGES = 'FETCHED_IMAGES';

const fetchImage = (payload) => ({type: FETCHING_IMAGES, payload })
const fetchedImage = (payload) => ({type: FETCHED_IMAGES, payload })

const getListOfImages = () => async (dispatch) => {
  dispatch(fetchImage(true));
  let newList = [];
  return db.firestore().collection("images/").get().then( snap => {
    snap.forEach( doc => {
      newList.push(doc.data()) })
      return null;
  })
  .then(()=>{
    dispatch(fetchImage(false));
    return dispatch(fetchedImage(newList))
  });
}


export { getListOfImages };

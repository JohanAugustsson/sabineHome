import React,{ Component } from 'react';
import { getListOfImages } from '../../actions/ImageActions'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './ImageList.css';



class ImageList extends Component {
  state = {
    list: '',
    selected: '',
    showList: false,
  }

  getList = () =>{
    const { dispatch , images } = this.props;
    this.setState({showList: !this.state.showList})
    // if(!images.fetched){
    //   dispatch(getListOfImages())
    // }
  }

  showList = () => {
    const list = this.props.images;

    return Object.values(list).map( image => (
      <div className='dbImage' key={image.id}>
        <img src={image.url} height={'100px'} width={'100px'} onClick={()=>this.props.setImage(image.url)}/>
        <button onClick={ () =>{console.log('remove from database', image.id) }}> Remove from db </button>
      </div>
    ))
  }

  render(){
    const { images } = this.props;
    const { showList } = this.state;
    const imagesInDb = images && showList ? this.showList() : null;

    return(
      <div className='container-images'>
        <div className='wrapper-images'>{ imagesInDb } </div>
        <div className='wrapper-buttons'>
           <button onClick={this.getList}> { !showList ? 'Öppna Lista' : 'Stäng Lista'}</button>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  images: state.firestore.ordered.images
})


const listenersFirestore = (props) => ([
  'images'
])


export default compose (
  firestoreConnect(listenersFirestore),
  connect(mapStateToProps))
  (ImageList)

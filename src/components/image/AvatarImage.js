import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCakeToDb,saveFileToDb } from '../../actions/cakeActions';
import AvatarImageCropper from 'react-avatar-image-cropper';
import ImageList from '../image/ImageList';
import './AvatarImage.css'

class AvatarImage extends Component {
  state = {
    url: ''
  }

  apply = (file) => {
    const { dispatch } = this.props;

    dispatch(saveFileToDb(file)).then( (a)=> {
      this.setState({ url: a.payload })
    });

  }

  removePicture = () => {
    this.setState({url:''})
  }

  setImage = (url) => {
    this.setState({url})
  }

  render(){
    const { url } = this.state;
    return(
      <div className='container-AvatarImage'>
        <ImageList setImage={this.setImage}/>
        <div style={{ width: '250px', height: '250px', margin: 'auto' }}>
           { !url && <AvatarImageCropper apply={this.apply} />}
           { url && <img src={url} height='250px' width='250px' /> }
         </div>
        <button onClick={()=> this.setState({url:''})}>remove</button>
      </div>
    )
  }
}

const mapStateToProps = (props) => ({})

export default connect(mapStateToProps)(AvatarImage);

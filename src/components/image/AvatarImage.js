import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveFileToDb } from '../../actions/cakeActions';
import AvatarImageCropper from 'react-avatar-image-cropper';
import ImageList from '../image/ImageList';
import './AvatarImage.css'

class AvatarImage extends Component {
  state = {
    url: ''
  }

  liftToParent = (url) => {
    const { path } = this.props;
    this.props.setImageInNewCake(this.state.url , path)
  }

  apply = (file) => {
    const { dispatch } = this.props;

    dispatch(saveFileToDb(file)).then( (a)=> {
      this.setState({ url: a.payload })
    });
  }

  removePicture = () => {
    this.setState({ url:'' })
  }

  setImage = (url) => {
    this.setState({url})
  }

  render(){
    const { url } = this.state;
    const size = this.props;
    // console.log('storlek:',size.size);
    return(
      <div className='container-AvatarImage'>
        <ImageList setImage={this.setImage}/>
        <div style={size.size}>
           { !url && <AvatarImageCropper apply={this.apply} />}
           { url && <img alt="use to upload images" src={url} height='100%' width='100%' /> }
         </div>
        { url && <button onClick={this.removePicture}>remove</button> }
        { url && <button onClick={this.liftToParent}>Använd</button> }
      </div>
    )
  }
}

const mapStateToProps = (props) => ({})

export default connect(mapStateToProps)(AvatarImage);

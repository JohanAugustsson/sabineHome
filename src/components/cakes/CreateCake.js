import React, { Component } from 'react';
import { saveCakeToDb,saveFileToDb } from '../../actions/cakeActions';
import { connect } from 'react-redux';
import AvatarImageCropper from 'react-avatar-image-cropper';
import AvatarImage from '../image/AvatarImage';
import './CreateCake.css';




class CreateCake extends Component {
  constructor(props){
    super(props);
    this.state = {
      mainPictureUrl: '',

    }
  }

  handelSave = () =>{
    const { dispatch } = this.props;
    console.log('spara!');
    const obj = {
      description: {
        content: ['fösrta content','andra content','tredje content'],
        end: { text: 'här ska de va slut' }
      },
      howtocook: [
        {
          description: 'sätt ugenen på 333 grader'
        },
        {
          description: 'brän bullarna'
        }
      ],
      ingridience: {
        kanel: '2msk',
        socker: '1msk'
      }
    }
    dispatch(saveCakeToDb(obj));

  }



  apply = (file) => {
    // handle the blob file you want
    // such as get the image src
    const { dispatch } = this.props;

    dispatch(saveFileToDb(file)).then( (a)=> {
      this.setState({
        mainPictureUrl: a.payload
      })
    });

    //var src = window.URL.createObjectURL(file);
    //console.log(file);
}

  render(){
    const { mainPictureUrl } = this.state;

    return(
      <div className='container-CreateCake'>

        <label>Titel <input type='text' /></label>
        <label>Beskrivning <textarea cols='40' row='5' /></label>
        <label>Ingridiens <input type='text' /><input type='text'/></label>
        <label>Så här gör du <input type='text' /></label>
        <label>Ytterligare information <input type='text' /></label>
        <label>slutfras <input type='text' /></label>

        <button onClick={this.handelSave}> Spara </button>

        <div style={{width: 250}}>
         <AvatarImage />
        </div>
         <AvatarImage />

      </div>
    );
  }
}

const mapStateToProps = (state) =>({

})



export default connect(mapStateToProps)(CreateCake);

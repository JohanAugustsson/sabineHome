import React, { Component } from 'react';
import { saveCakeToDb } from '../../actions/cakeActions';
import { connect } from 'react-redux';
import './CreateCake.css'




class CreateCake extends Component {

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
  render(){
    return(
      <div className='container-CreateCake'>

        <label>Titel <input type='text' /></label>
        <label>Beskrivning <textarea cols='40' row='5' /></label>
        <label>Ingridiens <input type='text' /><input type='text'/></label>
        <label>Så här gör du <input type='text' /></label>
        <label>Ytterligare information <input type='text' /></label>
        <label>slutfras <input type='text' /></label>

        <button onClick={this.handelSave}> Spara </button>

      </div>
    );
  }
}

const mapStateToProps = (state) =>({

})

export default connect(mapStateToProps)(CreateCake);

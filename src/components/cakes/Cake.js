import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './Cake.css';

class Cake extends Component {

  createList = (Obj) => (Object.keys(Obj).map(item => {
      return (
        <li key={item} >
          <div>{item}</div>
          <div>{Obj[item]}</div>
        </li>
      )
    }));

  createListOfHowToCook = (Obj) => {
    return Obj.map((item,index) => {
      const images = item.images ? item.images.map( (img,index) =><Fragment key={index}><img src={img} alt="cake" /></Fragment>) : null;
      return (
        <li key={index}>

          <p>{index+1}: { item.description }</p>
          { images && <div> {images} </div>}
        </li>
      )
    })
  }

  createContent = (Obj) => {
    //console.log(Obj);
    return Obj.map((str,index) => <p key={index}> {str} </p>)
  }

  createEnd = (Obj) => {
    //console.log(Obj);
    const image = Obj.img ? <img src={Obj.img} alt="cake" /> : null;
    const str = Obj.text ? (<p> {Obj.text} </p>) : null;

    return (
      <Fragment>
        { image }
        { str }
      </Fragment>
    )
  }

  render(){
    const cakeId = this.props.match.params.id;
    const { cakes } = this.props;
    console.log(cakeId);
    console.log(cakes);
    const cake = cakes ? cakes[cakeId] : null;
    console.log(cake);
    //console.log(cake);
    const ingridience = cake && cake.ingridience ?  this.createList(cake.ingridience) : null;
    const howToCook = cake && cake.howtocook ?  this.createListOfHowToCook(cake.howtocook) : null;
    const content = cake && cake.description && cake.description.content ?  this.createContent(cake.description.content) : null;
    const description = cake && cake.description && cake.description.main ? cake.description.main : null;
    const imgOfCake = cake && cake.img ? <img src={cake.img} alt="cake" /> : " img missing";
    const end = cake && cake.description && cake.description.end ? this.createEnd(cake.description.end) : "end missing";
    return(
      <div className='container-cake'>
        {cake &&
          <div className='wrapper-header'>
            <div> { imgOfCake } </div>
            <div className='mainText'>
              <div className='title'> {cake.name} </div>
              <div><p> { description }</p></div>
              <div><h4>Ingridienser: </h4><ul className="ingridienceList"> { ingridience } </ul></div>
            </div>
          </div>

        }

        <div className='wrapper-howToCook'>
          <h4>Så här gör du</h4>
          <ul> { howToCook } </ul>
        </div>

        <div className='wrapper-content'>
          { content }
        </div>

        <div className='wrapper-end'>
          { end }
        </div>

      </div>
    );
  }
}



const mapStateToProps = (state) =>({
  cakes: state.firestore.data.cakes
})

const listenersFirestore = (props) => ([
  'cakes'
])


export default compose (
  firestoreConnect(listenersFirestore),  // or { collection: 'cakes' }
  connect(mapStateToProps)
  )(Cake);

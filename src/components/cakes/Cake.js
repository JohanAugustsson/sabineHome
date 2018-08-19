import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './Cake.css';

class Cake extends Component {

  createList = (Obj) =>
   Obj.map((item,index) => {
      return (
        <li key={index} >
          <div>{item.ingridientAmount}</div>
          <div>{item.ingridientName}</div>
        </li>
      )
    });

  createListOfHowToCook = (Obj) => {
    return Obj.map((item,index) => {
      const images = item.img ? Object.values(item.img).map( (img,index) =><Fragment key={index}><img src={img} alt="cake" /></Fragment>) : null;
      return (
        <li key={index}>

          <div>{index+1}. { item.str }</div>
          { images && <div> {images} </div>}
        </li>
      )
    })
  }

  createContent = (Obj) => {
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

    const cake = cakes ? cakes[cakeId] : null;
    console.log(cake);
    //console.log(cake);
    const ingridience = cake && cake.ingredients ?  this.createList(cake.ingredients) : null;
    const howToCook = cake && cake.howToCook ?  this.createListOfHowToCook(cake.howToCook) : null;
    const content = cake && cake.description && cake.description.content ?  this.createContent(cake.description.content) : null;
    const imgOfCake = cake && cake.main && cake.main.img ? <img src={cake.main.img} alt="cake" /> : " img missing";
    const end = cake && cake.end ? this.createEnd(cake.end) : "";
    return(
      <div className='container-cake'>
        {cake &&
          <div className='wrapper-header'>
            <div> { imgOfCake } </div>
            <div className='mainText'>
              <div className='title'> {cake.main.title || ""} </div>
              <div><p> { cake.main.description || "" }</p></div>

            </div>
          </div>

        }

        { cake &&
          <div className='wrapper-ingredients'><h4>Ingridienser: </h4><ul className="ingridienceList"> { ingridience } </ul></div>
        }
        <div className='wrapper-howToCook'>
          <h4>Så här gör du</h4>
          <ul> { howToCook } </ul>
        </div>


        { content &&
          <div className='wrapper-content'>
            { content }
          </div>

        }
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

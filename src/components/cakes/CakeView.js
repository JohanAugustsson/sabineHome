import React from 'react';
import './CakeView.css';
const CakeView = (props) => {

  const { cakes } = props;
  const createList = cakes.map(cake=>{
    return(
    <li key={cake.id} onClick={(event)=>props.goToPage(event,cake.id)}>
     <div className='imgOfCake'>{cake.img ? <img src={cake.img} alt="cake" /> : " img missing"}</div>
     <div className='title'>{cake.name}</div>

    </li>
  )})

  return (
    <div className='container-cakeview'>
      <ul> { createList } </ul>
    </div>
  )
}

export default CakeView;

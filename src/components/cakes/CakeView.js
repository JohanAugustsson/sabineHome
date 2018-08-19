import React from 'react';
import './CakeView.css';
const CakeView = (props) => {

  const { cakes } = props;
  const createList = cakes.map(cake=>{
    console.log(cake);
    if(!cake || !cake.main || !cake.main)
      return null

    return(
    <li key={cake.id} onClick={(event)=>props.goToPage(event,cake.id)}>
     <div className='imgOfCake'>{ cake.main.img ? <img src={cake.main.img} alt="cake" /> : " img missing"}</div>
     <div className='title'>{cake.main.title}</div>

    </li>
  )})

  return (
    <div className='container-cakeview'>
      <ul> { createList } </ul>
    </div>
  )
}

export default CakeView;

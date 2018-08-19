import React,{ Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavBar.css'

class MainNavBar extends Component {

  render(){
    return(
      <div className='container-mainnavbar'>
        <div>
          <h1> Sabine Lindqvist</h1>
        </div>
        <ul>
          <li><NavLink to ='/'>Home</NavLink></li>
          {/* <li><NavLink to ='/profile'>Profile</NavLink></li>
          <li><NavLink to ='/create-cake'>Create</NavLink></li> */}
        </ul>
      </div>
    )
  }
}

export default MainNavBar;

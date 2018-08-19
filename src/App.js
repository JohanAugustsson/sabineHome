import React, { Component } from 'react';
import Router from './Router'
import MainNavBar from './components/navigation/MainNavBar'
import Footer from './components/footer/Footer'
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <MainNavBar />
        <Router />
        {/* {<Footer />} */}
      </div>
    );
  }
}

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './container/homepage/HomePage';
import Profile from './container/profile/Profile';
import Cake from './components/cakes/Cake';

const Router = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/cake/:id' component={Cake}/>
  </Switch>
)

export default Router;

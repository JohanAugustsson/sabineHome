import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './container/homepage/HomePage';
import Profile from './container/profile/Profile';
import Cake from './components/cakes/Cake';
import CreateCake from './components/cakes/CreateCake';

const Router = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/cake/:id' component={Cake}/>
    <Route exact path='/create-cake' component={CreateCake}/>
  </Switch>
)

export default Router;

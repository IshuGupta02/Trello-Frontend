import React, {Component} from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/login';
import HomePage from './components/homepage';
import Sample from './components/sample';
import DashBoard from './components/dashboard'
import SideBar from './components/sidebar';

class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={DashBoard}/>
          <Route path="/login" component={Login}/>
          <Route path="/sidebar" component={SideBar}/>
          {/* <Route path="/sample" component={Sample}/> */}
          <Route path="/" component={HomePage}/>
          
        </Switch>
      </BrowserRouter>
      
    );

  }
}

export default App;
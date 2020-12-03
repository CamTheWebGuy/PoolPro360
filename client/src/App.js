import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/landing/Landing';

import Login from './components/Layout/Login';
import Pricing from './components/Layout/Pricing';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import './argon.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/pricing' component={Pricing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;

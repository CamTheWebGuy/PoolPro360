import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/landing/Landing';

import Login from './components/Layout/Login';
import Pricing from './components/Layout/Pricing';
import BookingForms from './components/Layout/BookingForms';
import FormCreator from './components/Layout/FormCreator';

import Customers from './components/Layout/Customers';
import AddCustomers from './components/Layout/AddCustomers';
import ViewCustomer from './components/Layout/ViewCustomer';

import PrivateRoute from './components/routing/PrivateRoute';

// import 'bootstrap/dist/css/bootstrap.min.css';

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import './argon.css';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/pricing' component={Pricing} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/customers' component={Customers} />

            <PrivateRoute
              exact
              path='/customers/add'
              component={AddCustomers}
            />
            <PrivateRoute
              exact
              path='/customers/:id'
              component={ViewCustomer}
            />
            <PrivateRoute
              exact
              path='/booking-forms'
              component={BookingForms}
            />
            <PrivateRoute
              exact
              path='/booking-forms/add'
              component={FormCreator}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

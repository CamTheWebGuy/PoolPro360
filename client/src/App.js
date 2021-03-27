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
import Users from './components/Layout/Users';
import AddUser from './components/Layout/AddUser';
import DeleteCustomerImage from './components/Layout/DeleteCustomerImage';
import ManageChecklist from './components/Layout/ManageChecklist';
import ManageEquipment from './components/Layout/ManageEquipment';
import EditCustomerInformation from './components/Layout/EditCustomerInformation';
import EditUser from './components/Layout/EditUser';
import ViewUser from './components/Layout/ViewUser';
import Routing from './components/Layout/Routing';
import RouteBuilder from './components/Layout/RouteBuilder';
import ViewRoute from './components/Layout/ViewMyRoute';
import ViewLogs from './components/Layout/ViewLogs';
import ChangeEmail from './components/Layout/ChangeEmail';
import WorkOrders from './components/Layout/WorkOrders';
import Settings from './components/Layout/Settings';

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
            <PrivateRoute exact path='/users' component={Users} />
            <PrivateRoute exact path='/users/:id/edit' component={EditUser} />
            <PrivateRoute exact path='/users/:id/view' component={ViewUser} />
            <PrivateRoute exact path='/users/add' component={AddUser} />
            <PrivateRoute exact path='/view-my-route' component={ViewRoute} />
            <PrivateRoute exact path='/view-logs' component={ViewLogs} />
            <PrivateRoute exact path='/account-settings' component={Settings} />
            <PrivateRoute exact path='/work-orders' component={WorkOrders} />
            <PrivateRoute
              exact
              path='/change-email/:token'
              component={ChangeEmail}
            />
            <PrivateRoute
              exact
              path='/customers/:id/manage/equipment'
              component={ManageEquipment}
            />
            <PrivateRoute
              exact
              path='/customers/:id/manage/info'
              component={EditCustomerInformation}
            />
            <PrivateRoute
              exact
              path='/customers/:id/manage/serviceChecklist'
              component={ManageChecklist}
            />
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
              path='/customers/:id/deleteImage'
              component={DeleteCustomerImage}
            />
            <PrivateRoute exact path='/routing' component={Routing} />
            <PrivateRoute
              exact
              path='/routing/builder'
              component={RouteBuilder}
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

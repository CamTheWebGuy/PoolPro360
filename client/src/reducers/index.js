import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import customer from './customer';
import employee from './employee';
import map from './map';

export default combineReducers({
  auth,
  alert,
  customer,
  employee,
  map
});

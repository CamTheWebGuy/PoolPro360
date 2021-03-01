import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import customer from './customer';
import employee from './employee';
import map from './map';
import user from './user';

export default combineReducers({
  auth,
  alert,
  customer,
  employee,
  map,
  user
});

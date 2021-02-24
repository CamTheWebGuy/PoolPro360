import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EMPLOYEES,
  GET_SINGLE_EMPLOYEE,
  GET_CUSTOMERS,
  GET_ROUTE
} from './types';

// Update Business Info
export const updateBusinessInfo = ({
  businessName,
  businessPhone,
  businessEmail,
  businessAddress
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    businessName,
    businessPhone,
    businessEmail,
    businessAddress
  });

  try {
    await axios.post('/api/users/updateBusinessInfo', body, config);
    dispatch(setAlert('Information Updated', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

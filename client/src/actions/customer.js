import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CUSTOMERS,
  GET_SINGLE_CUSTOMER,
  RESET_CUSTOMER_LOADING
} from './types';

// Add Customer
export const addCustomer = ({
  firstName,
  lastName,
  email,
  mobilePhone,
  serviceAddress,
  serviceCity,
  serviceState,
  serviceZip,
  gateCode,
  canText,
  poolType,
  technician,
  servicePackageAndRate,
  billingSame,
  billingAddress,
  billingCity,
  billingState,
  billingZip
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    mobilePhone,
    serviceAddress,
    serviceCity,
    serviceState,
    serviceZip,
    gateCode,
    canText,
    poolType,
    technician,
    servicePackageAndRate,
    billingSame,
    billingAddress,
    billingCity,
    billingState,
    billingZip
  });

  try {
    await axios.post('/api/customers', body, config);
    dispatch(setAlert('Customer Added', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get All My Customers
export const getCustomers = () => async dispatch => {
  try {
    const customers = await axios.get('/api/customers');

    dispatch({
      type: GET_CUSTOMERS,
      payload: customers.data
    });
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
  }
};

// Get a Single Customer by ID
export const getSingleCustomer = id => async dispatch => {
  try {
    const customers = await axios.get(`/api/customers/${id}`);

    dispatch({
      type: GET_SINGLE_CUSTOMER,
      payload: customers.data
    });
  } catch (err) {
    console.log(err);
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }
  }
};

// Reset Loading State
export const resetCustomerLoading = () => async dispatch => {
  try {
    dispatch({
      type: RESET_CUSTOMER_LOADING
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

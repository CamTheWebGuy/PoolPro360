import axios from 'axios';
import { setAlert } from './alert';
import { GET_ACCOUNT_BALANCE } from './types';

// Create Stripe Connect Account
export const createConnectAccount = () => async dispatch => {
  try {
    const res = await axios.post('/api/stripe/create-connect-account');

    dispatch(setAlert('Stripe Setup Initiated', 'success'));

    window.location.href = res.data;
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get Stripe Account Status
export const getAccountStatus = () => async dispatch => {
  try {
    const res = await axios.get('/api/stripe/get-account-status');
    // console.log('User account status on Stripe', res);
    window.location.href = '/account-settings';
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Create Stripe Products
export const createProduct = () => async dispatch => {
  try {
    await axios.post('/api/stripe/create-product');
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get Stripe Account Balance
export const getAccountBalance = () => async dispatch => {
  try {
    const res = await axios.get('/api/stripe/get-account-balance');
    dispatch({
      type: GET_ACCOUNT_BALANCE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Manage Stripe Payout Settings
export const payoutSettings = () => async dispatch => {
  try {
    const res = await axios.post('/api/stripe/payout-settings');

    window.location.href = res.data.url;
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

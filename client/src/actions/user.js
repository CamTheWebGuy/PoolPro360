import axios from 'axios';
import { setAlert } from './alert';
import { GET_BUSINESS_INFO } from './types';

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

// Get Business Info
export const getBusinessInfo = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/businessInfo');

    dispatch({
      type: GET_BUSINESS_INFO,
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

// Update My Information
export const updateMyInfo = ({
  firstName,
  lastName,
  email
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    email
  });
  try {
    await axios.post(`/api/users/updateInfo`, body, config);
    dispatch(setAlert('Information Updated', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update My Email
export const updateMyEmail = ({ newEmail }, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    email: newEmail
  });
  try {
    await axios.post(`/api/users/updateEmail/${token}`, body, config);
    dispatch(setAlert('Email Updated', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    dispatch(setAlert('Invalid Reset Token or User', 'danger'));
  }
};

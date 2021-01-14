import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CUSTOMERS,
  GET_SINGLE_CUSTOMER,
  RESET_CUSTOMER_LOADING,
  GET_CUSTOMER_SERVICE_NOTES
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
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
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

// Add Service Note
export const addServiceNote = data => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { content, customerId, showDuringVisit } = data;

  const body = JSON.stringify({
    showDuringVisit,
    content
  });

  try {
    await axios.post(
      `/api/customers/${customerId}/serviceNote/add`,
      body,
      config
    );
    dispatch(setAlert('New Service Note Created', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get a Customers Service Notes
export const getCustomerServiceNotes = customerId => async dispatch => {
  try {
    const notes = await axios.get(`/api/customers/${customerId}/serviceNotes`);

    dispatch({
      type: GET_CUSTOMER_SERVICE_NOTES,
      payload: notes.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get a Customers Service Notes
export const deleteServiceNote = (customerId, noteId) => async dispatch => {
  try {
    await axios.delete(`/api/customers/${customerId}/serviceNotes/${noteId}`);

    dispatch(setAlert('Service Note Deleted', 'danger'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update a Service Note
export const updateServiceNote = (
  customerId,
  noteId,
  data
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { content, showDuringVisit } = data;

  const body = JSON.stringify({
    showDuringVisit,
    content
  });

  try {
    await axios.patch(
      `/api/customers/${customerId}/serviceNotes/${noteId}`,
      body,
      config
    );
    dispatch(setAlert('Service Note Updated', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

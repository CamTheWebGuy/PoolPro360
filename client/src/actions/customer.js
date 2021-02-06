import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CUSTOMERS,
  GET_SINGLE_CUSTOMER,
  RESET_CUSTOMER_LOADING,
  GET_CUSTOMER_SERVICE_NOTES,
  GET_CUSTOMER_RECENT_ACTIVITY,
  GET_CUSTOMER_CHECKLIST,
  GET_ALL_CUSTOMERS,
  CLEAR_CUSTOMERS
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
  billingType,
  paymentMethod,
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
    billingType,
    paymentMethod,
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

// Get All My Customers (For Routing System)
export const getCustomersRB = () => async dispatch => {
  try {
    const customers = await axios.get('/api/customers');

    // Since the customers reducer is already being used on the route builder page, this action dispatches the information to another reducer.
    dispatch({
      type: GET_ALL_CUSTOMERS,
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

// Delete a Service Note by ID
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

// Add a Log to Recent Activity
export const addRecentActivity = (customerId, data) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { log, type, comments } = data;

  let icon = '';
  if (log === 'Phone Call') {
    icon = 'phone';
  } else if (log === 'Email') {
    icon = 'envelope';
  } else if (log === 'Service') {
    icon = 'check-circle';
  } else {
    icon = 'exclamation-circle';
  }

  const body = JSON.stringify({
    log,
    type,
    icon,
    comments
  });

  try {
    await axios.post(
      `/api/customers/${customerId}/recentActivity/add`,
      body,
      config
    );
    dispatch(setAlert('Activity Logged', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get a Customers Recent Activity
export const getRecentActivity = customerId => async dispatch => {
  try {
    const activities = await axios.get(
      `/api/customers/${customerId}/recentActivity`
    );

    dispatch({
      type: GET_CUSTOMER_RECENT_ACTIVITY,
      payload: activities.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Delete a Activity Log by ID
export const deleteRecentActivity = (customerId, noteId) => async dispatch => {
  try {
    await axios.delete(`/api/customers/${customerId}/recentActivity/${noteId}`);

    dispatch(setAlert('Activity Log Deleted', 'danger'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Add Checklist Item
export const addItemChecklist = (customerId, data) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    item: data.item
  });
  try {
    await axios.post(
      `/api/customers/${customerId}/checklist/add`,
      body,
      config
    );
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get Checklist Items
export const getChecklist = customerId => async dispatch => {
  try {
    const checklist = await axios.get(
      `/api/customers/${customerId}/checklist/`
    );

    dispatch({
      type: GET_CUSTOMER_CHECKLIST,
      payload: checklist.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Checklist Items
export const updateChecklist = (customerId, list) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    list
  });

  try {
    const checklist = await axios.patch(
      `/api/customers/${customerId}/checklist/`,
      body,
      config
    );

    dispatch({
      type: GET_CUSTOMER_CHECKLIST,
      payload: checklist.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Billing Info
export const updateBilling = (
  customerId,
  {
    billingSame,
    billingType,
    paymentMethod,
    billingAddress,
    billingState,
    billingCity,
    billingZip
  }
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    billingSame,
    billingType,
    paymentMethod,
    billingAddress,
    billingState,
    billingCity,
    billingZip
  });

  try {
    await axios.patch(`/api/customers/${customerId}/billing/`, body, config);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Equipment Info
export const updateEquipment = (
  customerId,
  itemList,
  {
    poolType,
    poolGallons,
    bodiesOfWater,
    pumpMake,
    pumpModel,
    filterMake,
    filterModel,
    heaterMake,
    heaterModel,
    cleanerMake,
    cleanerModel
  }
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    poolType,
    poolGallons,
    bodiesOfWater,
    pumpMake,
    pumpModel,
    filterMake,
    filterModel,
    heaterMake,
    heaterModel,
    cleanerMake,
    cleanerModel,
    itemList
  });

  try {
    await axios.patch(`/api/customers/${customerId}/equipment/`, body, config);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Delete Custom Equipment
export const deleteEquipment = (customerId, equipmentId) => async dispatch => {
  try {
    await axios.delete(`/api/customers/${customerId}/equipment/${equipmentId}`);

    dispatch(setAlert('Item Deleted', 'danger'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Equipment Info
export const updateCustomer = (
  customerId,
  {
    firstName,
    lastName,
    mobilePhone,
    email,
    canText,
    altPhone,
    serviceAddress,
    serviceCity,
    serviceState,
    serviceZip,
    gateCode,
    servicePackageAndRate,
    technician
  }
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    mobilePhone,
    email,
    canText,
    altPhone,
    serviceAddress,
    serviceCity,
    serviceState,
    serviceZip,
    gateCode,
    servicePackageAndRate,
    technician
  });

  try {
    await axios.patch(
      `/api/customers/${customerId}/information/`,
      body,
      config
    );
    dispatch(setAlert('Changes Saved', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Set Customer Service Schedule
export const setSchedule = (customerId, techId, day) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    day
  });

  try {
    await axios.patch(
      `/api/customers/${customerId}/schedule/${techId}`,
      body,
      config
    );
    // dispatch(setAlert('Customer Scheduled', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Clear Customer From Service Schedule
export const unschedule = customerId => async dispatch => {
  try {
    await axios.patch(`/api/customers/${customerId}/unschedule`);
    // dispatch(setAlert('Customer Removed From Schedule', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Customer Route Order
export const updateRouteOrder = (techId, day, routeList) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    day,
    routeList
  });

  try {
    await axios.patch(`/api/customers/route/${techId}`, body, config);
    // dispatch(setAlert('Customer Scheduled', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Optimize Route
export const optimizeRoute = (routeList, techId, day) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // console.log(routeList);

  if (
    routeList.length === 0 ||
    routeList.length === 1 ||
    routeList.length === 2
  ) {
    return dispatch(
      setAlert('Cannot Optimize a Route With Less Than 3 Customers.', 'danger')
    );
  }

  const body = JSON.stringify(routeList);

  try {
    await axios.post(
      `/api/customers/route/optimize/${techId}/${day}`,
      body,
      config
    );
    // dispatch(setAlert('Customer Added', 'success'));
  } catch (err) {
    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Clear Customers Reducer
export const clearCustomers = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_CUSTOMERS
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Customer Service Frequency
export const updateFrequency = (customerId, frequency) => async dispatch => {
  try {
    await axios.patch(`/api/customers/frequency/${customerId}/${frequency}`);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Tech
export const updateTech = (customerId, techId) => async dispatch => {
  try {
    await axios.patch(`/api/customers/${customerId}/tech/${techId}`);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

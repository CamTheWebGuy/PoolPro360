import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EMPLOYEES,
  GET_SINGLE_EMPLOYEE,
  GET_CUSTOMERS,
  GET_ROUTE
} from './types';

// Add Employee
export const addEmployee = ({
  name,
  email,
  phone,
  role,
  password
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    name,
    email,
    phone,
    role,
    password
  });

  try {
    await axios.post('/api/employees', body, config);
    dispatch(setAlert('User Added', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get Employees
export const getEmployees = () => async dispatch => {
  try {
    const employees = await axios.get('/api/employees');
    dispatch({
      type: GET_EMPLOYEES,
      payload: employees.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get Single Employee
export const getSingleEmployee = id => async dispatch => {
  try {
    const employee = await axios.get(`/api/employees/${id}`);
    dispatch({
      type: GET_SINGLE_EMPLOYEE,
      payload: employee.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Employee
export const updateEmployee = (
  employeeId,
  { firstName, lastName, email, phone, role }
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    phone,
    role
  });

  try {
    await axios.patch(`/api/employees/${employeeId}/information`, body, config);
    dispatch(setAlert('User Updated Successfully', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Update Employee Password
export const updateEmployeePassword = (
  employeeId,
  { password }
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    password
  });

  try {
    await axios.patch(`/api/employees/${employeeId}/password`, body, config);
    dispatch(setAlert('Password Updated Successfully', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Get Employees Customers
export const getEmployeeCustomers = id => async dispatch => {
  try {
    const customers = await axios.get(`/api/customers/employee/${id}`);
    // const test = await axios.get(`/api/customers/route/${id}/Monday`);

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

// Get Employees Route
export const getEmployeeRoute = (id, day) => async dispatch => {
  // console.log(day);
  try {
    const route = await axios.get(`/api/customers/route/${id}/${day}`);

    dispatch({
      type: GET_ROUTE,
      payload: route.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Mark Employee Inactive
export const markEmployeeInactive = id => async dispatch => {
  console.log('made it here');
  try {
    await axios.patch(`/api/employees/${id}/inactive`);
    dispatch(setAlert('User Updated', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

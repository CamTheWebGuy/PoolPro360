import axios from 'axios';
import { setAlert } from './alert';
import { GET_EMPLOYEES } from './types';

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

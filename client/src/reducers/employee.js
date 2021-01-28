import { GET_EMPLOYEES, GET_SINGLE_EMPLOYEE } from '../actions/types';

const initialState = {
  employees: [],
  singleEmployee: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: payload,
        loading: false
      };
    case GET_SINGLE_EMPLOYEE:
      return {
        ...state,
        singleEmployee: payload
      };
    default:
      return state;
  }
}

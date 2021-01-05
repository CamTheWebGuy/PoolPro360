import { GET_EMPLOYEES } from '../actions/types';

const initialState = {
  employees: [],
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
    default:
      return state;
  }
}

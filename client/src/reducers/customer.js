import {
  GET_CUSTOMERS,
  GET_SINGLE_CUSTOMER,
  RESET_CUSTOMER_LOADING
} from '../actions/types';

const initialState = {
  customers: [],
  loading: true,
  singleCustomer: {},
  singleLoading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: payload,
        loading: false
      };
    case GET_SINGLE_CUSTOMER:
      return {
        ...state,
        singleCustomer: payload,
        singleLoading: false
      };
    case RESET_CUSTOMER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

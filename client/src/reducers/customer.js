import {
  GET_CUSTOMERS,
  GET_SINGLE_CUSTOMER,
  RESET_CUSTOMER_LOADING,
  GET_CUSTOMER_SERVICE_NOTES,
  GET_CUSTOMER_RECENT_ACTIVITY,
  GET_CUSTOMER_CHECKLIST
} from '../actions/types';

const initialState = {
  customers: [],
  loading: true,
  singleCustomer: {},
  singleLoading: true,
  serviceNotes: [],
  recentActivity: [],
  checklist: []
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
    case GET_CUSTOMER_SERVICE_NOTES:
      return {
        ...state,
        serviceNotes: payload
      };
    case GET_CUSTOMER_RECENT_ACTIVITY:
      return {
        ...state,
        recentActivity: payload
      };
    case GET_CUSTOMER_CHECKLIST:
      return {
        ...state,
        checklist: payload
      };
    default:
      return state;
  }
}

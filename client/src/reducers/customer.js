import {
  GET_CUSTOMERS,
  GET_SINGLE_CUSTOMER,
  RESET_CUSTOMER_LOADING,
  GET_CUSTOMER_SERVICE_NOTES,
  GET_CUSTOMER_RECENT_ACTIVITY,
  GET_CUSTOMER_CHECKLIST,
  GET_ROUTE,
  GET_ALL_CUSTOMERS,
  CLEAR_CUSTOMERS,
  ROUTE_OPTIMIZED,
  GET_SERVICE_LOGS
} from '../actions/types';

const initialState = {
  customers: [],
  loading: true,
  singleCustomer: {},
  singleLoading: true,
  serviceNotes: [],
  recentActivity: [],
  checklist: [],
  routeList: [],
  isRouteOptimized: false,
  allCustomers: [],
  serviceLogs: []
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
    case ROUTE_OPTIMIZED:
      return {
        ...state,
        isRouteOptimized: payload
      };
    case GET_SERVICE_LOGS:
      return {
        ...state,
        serviceLogs: payload
      };
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        allCustomers: payload
      };
    case CLEAR_CUSTOMERS:
      return {
        customers: [],
        loading: true,
        singleCustomer: {},
        singleLoading: true,
        serviceNotes: [],
        recentActivity: [],
        checklist: [],
        routeList: [],
        allCustomers: [],
        serviceLogs: []
      };
    case GET_ROUTE:
      return {
        ...state,
        routeList: payload,
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

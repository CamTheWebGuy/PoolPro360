import { setAlert } from './alert';
import { GET_ROUTE_LEGS } from './types';

// Get Route Legs
export const getRouteLegs = legs => async dispatch => {
  dispatch({
    type: GET_ROUTE_LEGS,
    payload: legs
  });
};

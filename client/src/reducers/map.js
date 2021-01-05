import { GET_ROUTE_LEGS } from '../actions/types';

const initialState = {
  legs: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ROUTE_LEGS:
      return {
        ...state,
        legs: payload,
        loading: false
      };
    default:
      return state;
  }
}

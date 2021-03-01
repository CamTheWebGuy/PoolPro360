import { GET_BUSINESS_INFO } from '../actions/types';

const initialState = {
  businessInfo: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BUSINESS_INFO:
      return {
        ...state,
        businessInfo: payload,
        loading: false
      };
    default:
      return state;
  }
}

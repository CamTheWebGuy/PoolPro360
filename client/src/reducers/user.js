import { GET_BUSINESS_INFO, GET_EMAIL_SETTINGS } from '../actions/types';

const initialState = {
  businessInfo: {},
  emailSettings: {},
  loading: true,
  emailLoading: true
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
    case GET_EMAIL_SETTINGS:
      return {
        ...state,
        emailSettings: payload,
        emailLoading: false
      };
    default:
      return state;
  }
}

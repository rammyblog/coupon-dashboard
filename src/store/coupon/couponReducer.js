import * as types from './couponActionTypes';

const initialCouponState = {
  coupons: [],
  loading: false,
  error: null,
  errResponse: null,
};

export default function couponReducer(state = initialCouponState, action) {
  switch (action.type) {
    case types.LOAD_COUPONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_COUPONS:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: null,
        coupons: action.payload,
      };

      case types.COUPONS_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
      
      };
    default:
      return state;
  }
}

import * as types from './couponActionTypes';

const initialCouponState = {
  coupons: [],
  loading: false,
  error: null,
  errResponse: null,
  message: '',
  singleCoupon: null,
};

export default function couponReducer(state = initialCouponState, action) {
  switch (action.type) {
    case types.LOAD_COUPONS_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        error:false,
        errResponse:null,
      };
    case types.GET_COUPONS:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: null,
        coupons: action.payload,
        message: 'Coupon retrieved success',
      };
    case types.CREATE_COUPON:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: null,
        coupons: [...state.coupons, action.payload],
        message: 'Coupon has been added successfully',
      };

      case types.UPDATE_COUPON:
        const tempState = [...state.coupons].filter((data) => data._id !== action.payload._id)
        return {
          ...state,
          loading: false,
          error: false,
          errResponse: null,
          coupons: [...tempState, action.payload],
          message: 'Coupon has been edited'
        };

    case types.GET_SINGLE_COUPON:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: null,
        singleCoupon: action.payload,
        message: 'Coupon retrieved success',
      };

    case types.COUPONS_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
        message: '',
      };

    default:
      return state;
  }
}

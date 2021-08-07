import axios from '../../api/apiUtils';
import * as types from './couponActionTypes';
import store from '../../store';

export const fetchCoupons = () => {
  return async (dispatch) => {
    dispatch({ type: types.LOAD_COUPONS_REQUEST });
    try {
      const response = await axios.get('coupons');
      dispatch({
        type: types.GET_COUPONS,
        payload: response.data,
      });
    } catch (error) {
      const error_msg =
        error.response && error.response.data.error_msg
          ? error.response.data.error_msg
          : error.message;
      dispatch({ type: types.COUPONS_REQUEST_FAIL, payload: error_msg });
    }
  };
};


export const addCoupon = (data) => {
  return async (dispatch) => {
    dispatch({ type: types.LOAD_COUPONS_REQUEST });
    try {
      const response = await axios.post('coupons', data);
      dispatch({
        type: types.CREATE_COUPON,
        payload: response.data.coupon,
      });
    } catch (error) {
      const error_msg =
        error.response && error.response.data.error_msg
          ? error.response.data.error_msg
          : error.message;
      dispatch({ type: types.COUPONS_REQUEST_FAIL, payload: error_msg });
    }
  };
};


export const fetchSingleCoupons = (code) => {
  return async (dispatch) => {
    dispatch({ type: types.LOAD_COUPONS_REQUEST });
    console.log(store.getState().coupon.coupons);
    let singleCoupon;
    try {
      const coupons = store.getState().coupon.coupons;
      if (coupons && coupons.length > 0) {
        singleCoupon = coupons.find((c) => c.code === code);
        if (singleCoupon) {
          dispatch({
            type: types.GET_SINGLE_COUPON,
            payload: singleCoupon,
          });
        }
      }else{
          const response = await axios.get(`coupons/${code}`);
          dispatch({
            type: types.GET_SINGLE_COUPON,
            payload: response.data,
          });
      }

    } catch (error) {
      const error_msg =
        error.response && error.response.data.error_msg
          ? error.response.data.error_msg
          : error.message;
      dispatch({ type: types.COUPONS_REQUEST_FAIL, payload: error_msg });
    }
  };
};

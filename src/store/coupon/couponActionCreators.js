import axios from '../../api/apiUtils';
import * as types from './couponActionTypes';

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

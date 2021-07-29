import axios from "../../api/apiUtils";
import * as types from "./authActionTypes";

export const authCommon = (urlType, userData) => {
  return async function (dispatch) {
    dispatch({ type: types.AUTH_START });
    try {
      const res = await axios.post(`/auth/${urlType}`, userData);

      dispatch({
        type: types.AUTH_SUCCESS,
        payload: res.data.food_order_access_token,
      });
      localStorage.setItem(
        "coupon_access_token",
        res.data.food_order_access_token
      );
    } catch (error) {
      const error_msg =
        error.response && error.response.data.error_msg
          ? error.response.data.error_msg
          : error.message;
      dispatch({ type: types.AUTH_FAILURE, payload: error_msg });
    }
  };
};
export const authLogin = (userData) => {
  return authCommon("login", userData);
};

export const authRegister = (userData) => {
  return authCommon("register", userData);
};

export const authLogout = () => {
  return async function (dispatch) {
    dispatch({ type: types.AUTH_LOGOUT });
    localStorage.removeItem("coupon_access_token");
  };
};

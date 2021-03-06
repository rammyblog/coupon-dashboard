import * as types from "./authActionTypes";

const initialSignupState = {
  loading: false,
  token: null,
  error: false,
  errResponse: "",
};

export default function authReducer(state = initialSignupState, action) {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        loading: true,
        error: false,
        errResponse: "",
      };

    case types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };

    case types.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
      };
    case types.AUTH_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: "",
      };
    case types.AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: "",
        token: null,
      };

    default:
      return state;
  }
}

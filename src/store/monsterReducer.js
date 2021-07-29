import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";

const monsterReducer = combineReducers({
  auth: authReducer,
});

export default monsterReducer;

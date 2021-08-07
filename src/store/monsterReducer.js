import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import couponReducer from './coupon/couponReducer';

const monsterReducer = combineReducers({
  auth: authReducer,
  coupon: couponReducer,
});

export default monsterReducer;

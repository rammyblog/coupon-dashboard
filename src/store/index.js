import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import monsterReducer from "./monsterReducer";
const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  monsterReducer,
  {},
  composeEnhancers(applyMiddleware(...middleWare))
);

export default store;

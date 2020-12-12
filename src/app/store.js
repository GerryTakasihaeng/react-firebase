import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "../features/Auth/reducer";

let rootReducer = combineReducers({
  auth: authReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

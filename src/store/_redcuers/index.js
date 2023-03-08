import { combineReducers } from "redux";
import user from "./userReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  user,
  token: authReducer,
});

export default rootReducer;

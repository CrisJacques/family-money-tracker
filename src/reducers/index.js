import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";

/**
 * Unindo os reducers criados
 */
export default combineReducers({
  auth,
  message,
});

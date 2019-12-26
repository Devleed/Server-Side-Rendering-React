import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import authStatus from "./authReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  users: usersReducer,
  auth: authStatus,
  admins: adminReducer
});

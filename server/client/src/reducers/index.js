import { combineReducers } from "redux";
import activityReducer from "./activityReducer";
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";
import errorReducer from "./errorReducer";
import meetingReducer from "./meetingReducer";
import opportunityReducer from "./opportunityReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  opportunities: opportunityReducer,
  activities: activityReducer,
  contacts: contactReducer,
  meetings: meetingReducer,
});

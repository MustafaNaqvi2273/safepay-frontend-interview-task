import { combineReducers } from "redux";
import activityReducer from "./activityReducer";

const rootReducer = combineReducers({
  activityReducer : activityReducer
})

export default rootReducer;
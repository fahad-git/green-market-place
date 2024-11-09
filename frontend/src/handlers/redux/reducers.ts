/**
 * @description: This file contains all the reducers for the redux store.
 */
import { combineReducers } from "@reduxjs/toolkit";
import {
  INIT_STORE,
  INIT_STORE_DEFAULT,
  INCREASE_COUNT,
  LOG_OUT,
  LOG_IN,
} from "./actions-constants";
import { IState, IActions, IStateUser } from "./interfaces";
import AUTH_APIs from "../apis/auth-apis";
import authReducer from "./slices/authSlice";

export const initialState: IState = {
  user: {
    name: "",
    email: "",
    password: "",
    accessToken: "",
    refreshToken: "",
    phone: "",
    address: "",
    avatar: ""
  },
};


/**
 *
 * @param state: state parameter shows initial state of object when event is dispatched.
 * @param action: action parameter holds the type of action supported in this reducer.
 * @returns it returns default or updated state for the store.
 */
export const defaultReducer = (
  state: IState = initialState,
  action: IActions
) => {
  switch (action.type) {
    case INIT_STORE_DEFAULT:
      return initialState;
    case INIT_STORE:
      return action.payload;
    default:
      return state;
  }
};

/**
 *
 * @param auth: auth parameter shows if user is authorized or not.
 * @param action: action parameter holds the type of action supported in this reducer.
 * @returns it returns updated value for auth for store to update.
 */
// const authReducer = async (user: IStateUser | {} = {}, action: IActions) => {
//   console.log("Login user: ", user);
//   console.log("Action: ", action);
//   switch (action.type) {
//     case LOG_IN:
//       //API call
//       console.log("=============")
//       const credentials = action.payload;
//       const response: any = await APIs.loginUser(credentials)
//       console.log(response)
//       if(response.status === 200){
//         return response.data;
//       } else {
//         return {};
//       }
//     case LOG_OUT:
//       return {};
//     default:
//       return user;
//   }
// };

/**
 *
 * @param countState: counteState parameter contains count of state.
 * @param action action parameter holds the type of action supported in this reducer.
 * @returns it returns updated value for count for store to update.
 */
export const counterReducer = (countState: number = 0, action: IActions) => {
  switch (action.type) {
    case INCREASE_COUNT:
      return countState + 1;
    default:
      return countState;
  }
};

/**
 * @description: this combines all the reducers into one to pass it to the redux store as a single entity.
 */
const rootReducer = combineReducers({
  default: defaultReducer,
  auth: authReducer,
  count: counterReducer,
});

export default rootReducer;

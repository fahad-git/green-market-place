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
import { IState, IActions } from "./interfaces";

export const initialState: IState = {
  user: {
    name: "",
    email: "",
    password: "",
    username: "",
    accessToken: "",
    refreshToken: "",
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
const authReducer = (auth: boolean = false, action: IActions) => {
  switch (action.type) {
    case LOG_IN:
      return true;
    case LOG_OUT:
      return false;
    default:
      return auth;
  }
};

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
  user: defaultReducer,
  auth: authReducer,
  count: counterReducer,
});

export default rootReducer;

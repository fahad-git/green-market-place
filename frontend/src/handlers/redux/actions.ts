/**
 * @description: This file contains action functions for this redux store state updates.
 *               To update the data in redux storage, API calls will be made in some of the action functions.
 */
import {
  INCREASE_COUNT,
  INIT_STORE,
  INIT_STORE_DEFAULT,
} from "./actions-constants";
import { IActions, IState } from "./interfaces";

/**
 *
 * @param state: state parameter will store the initial state of the redux store.
 * @returns it returns an object which contains action type and state payload for store to update.
 */
export function initialStoreAction(state: IState) {
  return { type: INIT_STORE, payload: state } as IActions;
}

/**
 *
 * @returns it returns an object which contains action type and and empty state payload for store to update with empty object.
 */
export function initialStoreDefaultAction() {
  return { type: INIT_STORE_DEFAULT, payload: {} };
}

/**
 *
 * @param newCount: newCount provides the updated count number of the counter
 * @returns it returns an object which contains action type and state payload count with new value for store to update.
 */
export function increaseCountState(newCount: number) {
  return { type: INCREASE_COUNT, payload: newCount };
}

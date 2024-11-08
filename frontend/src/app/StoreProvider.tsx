/**
 * @description: This file contains store provided integration to the app. There will be only single instance of reduc store in the app.
 *               The store will be persistent store. Wrapping this store in strict mode for avoiding type confusions.
 */
"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../handlers/redux/store";
import { initialStoreDefaultAction } from "../handlers/redux/actions";
// this PersistGate is used in case store has issues with persistent storage.
// eslint-disable-next-line
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { persistStore } from "redux-persist";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  let persistor: any;
  if (!storeRef.current) {
    // Create the store instance the first time this renders.
    storeRef.current = makeStore();
    // make this store persistent.
    // eslint-disable-next-line
    persistor = persistStore(storeRef.current);
    // initializing the first/initial state.
    storeRef.current.dispatch(initialStoreDefaultAction());
  }

  return (
    <React.StrictMode>
      <Provider store={storeRef.current}>
        {/* Use persistGate if store creates issue with persistent storage. Uncommenting below line should fix possible persistent issue. */}
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {children}
        {/* </PersistGate> */}
      </Provider>
    </React.StrictMode>
  );
}

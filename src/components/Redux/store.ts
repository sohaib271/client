import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import bookingSlice from "./booking";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";


const rootPersistConfig={
  key:"root",
  storage,
  whitelist:["auth","booking"]
};

const rootReducer= combineReducers({
  auth:authSlice,
  booking:bookingSlice
});

const persistedReducer=persistReducer(rootPersistConfig,rootReducer)

export const store=configureStore({
  reducer:persistedReducer
});

export const persistor=persistStore(store)
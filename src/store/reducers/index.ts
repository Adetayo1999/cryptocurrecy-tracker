import { combineReducers } from "@reduxjs/toolkit";
import cryptoReducer from "./crypto";

export const rootReducer = combineReducers({
  crypto: cryptoReducer,
});

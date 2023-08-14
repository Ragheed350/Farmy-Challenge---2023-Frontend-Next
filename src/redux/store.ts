"use client";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import SaladSlice from "../redux/salad";

export const store = configureStore({
  reducer: { [SaladSlice.name]: SaladSlice.reducer },
});

const typestore = () =>
  configureStore({
    reducer: { [SaladSlice.name]: SaladSlice.reducer },
  });

export type AppStore = ReturnType<typeof typestore>;

export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export type AppDispatch = AppStore["dispatch"];

"use client";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import SaladSlice from "@/redux/salad";
import IngredientSlice from "@/redux/ingredient";

const reducers = combineReducers({
  [SaladSlice.name]: SaladSlice.reducer,
  [IngredientSlice.name]: IngredientSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
});

const typestore = () =>
  configureStore({
    reducer: reducers,
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

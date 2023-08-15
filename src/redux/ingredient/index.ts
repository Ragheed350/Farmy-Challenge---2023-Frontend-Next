import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils/constants";
import { AppThunk } from "../store";
import axios, { AxiosResponse } from "axios";
import { Ingredient } from "@/src/types";

export interface IngredientState {
  status: RequestStatus;
  ingredients: Ingredient[];
  ingredient?: Ingredient;
}

const initialState: IngredientState = {
  status: "nothing",
  ingredients: [],
};

const ingredientSlice = createSlice({
  name: "Ingredient",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    fetch(state, action) {
      state.ingredients = action.payload;
    },
    get(state, action) {
      const item = state.ingredients.find(
        (ingredient) => ingredient.id === action.payload
      );
      if (item) {
        state.ingredient = item;
        state.status = "data";
      } else state.status = "error";
    },
  },
});

const { setStatus, fetch, get } = ingredientSlice.actions;

export const FetchIngredients = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const res = await axios.get<AxiosResponse>("/api/ingredients");
    dispatch(fetch(res.data));
    dispatch(setStatus("data"));
  } catch (error) {
    dispatch(setStatus("error"));
  }
};

export const GetIngredient =
  (req: { id: number }): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      dispatch(get(req.id));
      // dispatch(setStatus("data"));
    } catch (error) {
      dispatch(setStatus("error"));
    }
  };

export default ingredientSlice;

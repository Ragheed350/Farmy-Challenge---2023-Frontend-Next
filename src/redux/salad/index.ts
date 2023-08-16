import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils/constants";
import { AppThunk } from "../store";
import axios, { AxiosResponse } from "axios";
import { Salad } from "../../types";
import router from "next/router";
import { RedirectType } from "next/dist/client/components/redirect";

export interface SaladState {
  status: RequestStatus;
  salad_status: RequestStatus;
  salads: Salad[];
  salad?: Salad;
}

const initialState: SaladState = {
  status: "nothing",
  salad_status: "nothing",
  salads: [],
};

const saladSlice = createSlice({
  name: "Salad",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSaladStatus(state, action) {
      state.salad_status = action.payload;
    },
    fetch(state, action) {
      state.salads = action.payload;
    },
    get(state, action) {
      const item = state.salads.find((salad) => salad.id === action.payload);
      if (item) {
        state.salad = item;
        state.salad_status = "data";
      } else state.salad_status = "error";
    },
    update(state, action) {
      state.salads = action.payload;
    },
    removeSaladState(state, action) {
      state.salad = undefined;
    },
    editSaladState(state, action) {
      state.salad[action.payload.key] = action.payload.value;
    },
    editSaladIngredientsState(state, action) {
      const ind = state.salad.ingredients.findIndex(
        (el) => el.id === action.payload.ingredient_id
      );
      if (ind !== -1)
        state.salad.ingredients[ind] = {
          id: action.payload.ingredient_id,
          numOfServings: action.payload.numOfServings,
        };
    },
    deleteSaladIngredientsState(state, action) {
      const ind = state.salad.ingredients.findIndex(
        (el) => el.id === action.payload.ingredient_id
      );
      if (ind !== -1) state.salad.ingredients.splice(ind, 1);
    },
  },
});

const { setStatus, setSaladStatus, fetch, get, update } = saladSlice.actions;
export const {
  editSaladState,
  editSaladIngredientsState,
  deleteSaladIngredientsState,
  removeSaladState,
} = saladSlice.actions;

export const FetchSalads = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const res = await axios.get<AxiosResponse>("/api/salads");
    dispatch(fetch(res.data));
    dispatch(setStatus("data"));
  } catch (error) {
    dispatch(setStatus("error"));
  }
};

export const GetSaladAsync =
  (req: { id: number }): AppThunk =>
  async (dispatch) => {
    dispatch(setSaladStatus("loading"));
    try {
      dispatch(get(req.id));
    } catch (error) {
      dispatch(setSaladStatus("error"));
    }
  };

export const UpdateSaladAsync =
  (req: Salad): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const res = await axios.post("/api/salads", req);

      dispatch(update(res.data));
      dispatch(setStatus("data"));
    } catch (error) {
      dispatch(setStatus("error"));
    }
  };

export default saladSlice;

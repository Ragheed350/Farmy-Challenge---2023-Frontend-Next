import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils/constants";
import axios, { AxiosResponse } from "axios";
import { AppThunk } from "../store";
import { BusinessLogic, Salad } from "../../types";

export interface SaladState {
  status: RequestStatus;
  salad_status: RequestStatus;
  salads: Salad[];
  salad?: Salad;
  logic?: BusinessLogic;
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
    removeSaladState(state, action) {
      state.salad = undefined;
    },
    editSaladState(state, action) {
      state.salad[action.payload.key] = action.payload.value;
    },
    editSaladIngredientsState(state, { payload }) {
      const ind = state.salad.ingredients.findIndex(
        (el) => el.id === payload.ingredient_id
      );
      if (ind !== -1)
        state.salad.ingredients[ind] = {
          id: payload.ingredient_id,
          numOfServings: payload.numOfServings,
        };
    },
    addSaladIngredientsState(state, { payload }) {
      const ind = state.salad.ingredients.findIndex(
        (el) => el.id === payload.ingredient_id
      );
      if (ind !== -1) {
        state.salad.ingredients[ind] = {
          id: payload.ingredient_id,
          numOfServings: state.salad.ingredients[ind].numOfServings + 1,
        };
      } else
        state.salad.ingredients.push({
          id: payload.ingredient_id,
          numOfServings: 1,
        });
    },
    deleteSaladIngredientsState(state, { payload }) {
      const ind = state.salad.ingredients.findIndex(
        (el) => el.id === payload.ingredient_id
      );
      if (ind !== -1) state.salad.ingredients.splice(ind, 1);
    },
    fetchLogic(state, { payload }) {
      state.logic = payload;
    },
  },
});

const { setStatus, setSaladStatus, fetch, get, fetchLogic } =
  saladSlice.actions;
export const {
  editSaladState,
  editSaladIngredientsState,
  addSaladIngredientsState,
  deleteSaladIngredientsState,
  removeSaladState,
} = saladSlice.actions;

export const FetchSalads = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const res = await axios.get<Salad[]>("/api/salads");
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
      const res = await axios.post<Salad[]>("/api/salads", req);

      dispatch(fetch(res.data));
      dispatch(setStatus("data"));
    } catch (error) {
      dispatch(setStatus("error"));
    }
  };

export const FetchLogicAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const res = await axios.get<BusinessLogic>("/api/businessLogic");

    dispatch(fetchLogic(res.data));
    dispatch(setStatus("data"));
  } catch (error) {
    dispatch(setStatus("error"));
  }
};

export default saladSlice;

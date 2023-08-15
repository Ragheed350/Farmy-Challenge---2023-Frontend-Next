import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils/constants";
import { AppThunk } from "../store";
import axios, { AxiosResponse } from "axios";
import { Salad, UpdateSalad_Req } from "../../types";

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
      const ind = state.salads.findIndex(
        (salad) => salad.id === action.payload.salad_id
      );
      if (ind) state.salads[ind] = action.payload.salad;
    },
    editSaladState(state, action) {
      state.salad[action.payload.key] = action.payload.value;
    },
  },
});

const { setStatus, setSaladStatus, fetch, get, update } = saladSlice.actions;
export const { editSaladState } = saladSlice.actions;

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

export const GetSalad =
  (req: { id: number }): AppThunk =>
  async (dispatch) => {
    dispatch(setSaladStatus("loading"));
    try {
      // setTimeout(() => {
      dispatch(get(req.id));
      // }, 1000);
      // dispatch(setSaladStatus("data"));
    } catch (error) {
      dispatch(setSaladStatus("error"));
    }
  };

export const UpdateSaladAsync =
  (req: UpdateSalad_Req): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      setTimeout(() => {
        dispatch(update({ salad_id: req.salad_id, salad: req.salad }));
      }, 1000);
      dispatch(setStatus("data"));
    } catch (error) {
      dispatch(setStatus("error"));
    }
  };

export default saladSlice;

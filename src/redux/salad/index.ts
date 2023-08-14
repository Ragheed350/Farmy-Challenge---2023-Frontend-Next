import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils/constants";
import { AppThunk } from "../store";
import axios, { AxiosResponse } from "axios";
import { Salad } from "../../types/salad";

export interface SaladState {
  status: RequestStatus;
  salads: Salad[];
  salad?: Salad;
}

const initialState: SaladState = {
  status: "nothing",
  salads: [],
};

const saladSlice = createSlice({
  name: "Salad",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    fetch(state, action) {
      state.salads = action.payload;
    },
    get(state, action) {
      const item = state.salads.find((salad) => salad.id === action.payload);
      if (item) {
        state.salad = item;
        state.status = "data";
      } else state.status = "error";
    },
  },
});

const { setStatus, fetch, get } = saladSlice.actions;

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
    dispatch(setStatus("loading"));
    try {
      dispatch(get(req.id));
      // dispatch(setStatus("data"));
    } catch (error) {
      dispatch(setStatus("error"));
    }
  };

export default saladSlice;

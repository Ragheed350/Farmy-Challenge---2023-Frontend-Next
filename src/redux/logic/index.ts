import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils/constants";
import { AppThunk } from "../store";
import axios from "axios";
import { BusinessLogic } from "@/src/types";

export interface BusinessLogicState {
  status: RequestStatus;
  businessLogic?: BusinessLogic;
}

const initialState: BusinessLogicState = {
  status: "nothing",
};

const businessLogicSlice = createSlice({
  name: "BusinessLogic",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    fetch(state, action) {
      state.businessLogic = action.payload;
    },
  },
});

const { setStatus, fetch } = businessLogicSlice.actions;

export const FetchLogicAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const res = await axios.get<BusinessLogic>("/api/businessLogic");
    dispatch(fetch(res.data));
    dispatch(setStatus("data"));
  } catch (error) {
    dispatch(setStatus("error"));
  }
};

export default businessLogicSlice;

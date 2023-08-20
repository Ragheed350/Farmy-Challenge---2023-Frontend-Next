import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../utils/constants";
import { AppThunk } from "../store";
import axios, { AxiosResponse } from "axios";
import { Product } from "@/src/types";

export interface ProductState {
  status: RequestStatus;
  products: Product[];
  product?: Product;
}

const initialState: ProductState = {
  status: "nothing",
  products: [],
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    fetch(state, action) {
      state.products = action.payload;
    },
  },
});

const { setStatus, fetch } = productSlice.actions;

export const FetchProducts = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const res = await axios.get<Product[]>("/api/ingredients");
    dispatch(fetch(res.data));
    dispatch(setStatus("data"));
  } catch (error) {
    dispatch(setStatus("error"));
  }
};

export default productSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: {},
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartSuccess: (state, action) => {
      return { ...state, success: action.payload };
    },
    setCartLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setCartError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { setCartSuccess, setCartLoading, setCartError } = cartSlice.actions;

export default cartSlice.reducer;

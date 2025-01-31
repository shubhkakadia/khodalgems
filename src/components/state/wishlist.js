import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: {},
  loading: false,
  error: null,
};

const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistSuccess: (state, action) => {
      return { ...state, success: action.payload };
    },
    setWishlistLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setWishlistError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { setWishlistSuccess, setWishlistLoading, setWishlistError } = wishlist.actions;

export default wishlist.reducer;

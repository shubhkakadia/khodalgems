import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: {},
  loading: false,
  error: null,
};

const stockAPISlice = createSlice({
  name: "stockAPI",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      return { ...state, success: action.payload };
    },
    setLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { setSuccess, setLoading, setError } = stockAPISlice.actions;

export default stockAPISlice.reducer;

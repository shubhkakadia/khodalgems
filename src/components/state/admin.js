import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: {},
  loading: false,
  error: null,
};

const loggedInAdmin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminSuccess: (state, action) => {
      return { ...state, success: action.payload };
    },
    setAdminLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setAdminError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { setAdminSuccess, setAdminLoading, setAdminError } = loggedInAdmin.actions;

export default loggedInAdmin.reducer;

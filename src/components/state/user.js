import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: {},
  loading: false,
  error: null,
};

const loggedInUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSuccess: (state, action) => {
      return { ...state, success: action.payload };
    },
    setUserLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setUserError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { setUserSuccess, setUserLoading, setUserError } = loggedInUser.actions;

export default loggedInUser.reducer;

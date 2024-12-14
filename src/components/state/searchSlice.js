import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Shapes: [],
  Colors: [],
  Clarity: [],
  Cut: [],
  Polish: [],
  Symmetry: [],
  Fluorescence: [],
  Lab: [],
  HeartsAndArrows: [],
  Location: [],
  CaratWt: [],
  EyeClean: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSelections: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSelection: () => initialState,
  },
});

export const { setSelections, resetSelection } = searchSlice.actions;

export default searchSlice.reducer;

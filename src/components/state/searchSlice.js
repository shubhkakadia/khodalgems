import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Shape: "",
  Color: "",
  Clarity: "",
  Cut: "",
  Polish: "",
  Symmetry: "",
  Flr: "",
  Lab: "",
  HandA: "",
  Location: "",
  FromToCtsSize: "",
  EyeClean: "",
  Intensity: "",
  Overtone: "",
  FancyColor: "",
  FromCts: 0,
  ToCts: 0,
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

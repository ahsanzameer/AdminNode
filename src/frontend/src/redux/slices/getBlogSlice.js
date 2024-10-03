import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const getBlogSlice = createSlice({
  name: "getBlogData",
  initialState,
  reducers: {
    setBlogData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBlogData } = getBlogSlice.actions;

export default getBlogSlice.reducer;

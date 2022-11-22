import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateToken: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    randomizeUpdateToken(state) {
      state.updateToken = Math.random();
    },
  },
});

export const { randomizeUpdateToken } = appSlice.actions;
export const selectApp = (state) => state.app;
export default appSlice.reducer;

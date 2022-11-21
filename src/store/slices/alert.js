import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "success",
  title: "",
  show: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.show = true;
    },
    clearAlert: (state) => {
      state.message = "";
      state.type = "success";
      state.title = "";
      state.show = false;
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export const selectAlert = (state) => state.alert;
export default alertSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserDetails: (state, action) => {
      state.details = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.details = null;
    },
  },
});

export const { setUser, clearUser, setUserDetails } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: null,
  user: null,
  google_token: null,
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
    setGoogleToken: (state, action) => {
      state.google_token = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.details = null;
      state.google_token = null;
    },
  },
});

export const { setUser, clearUser, setUserDetails, setGoogleToken } =
  userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;

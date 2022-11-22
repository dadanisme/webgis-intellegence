import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user";
import alert from "./slices/alert";
import app from "./slices/app";

const store = configureStore({
  reducer: {
    user,
    alert,
    app,
  },
});

export default store;

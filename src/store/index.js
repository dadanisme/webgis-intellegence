import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user";
import alert from "./slices/alert";

const store = configureStore({
  reducer: {
    user,
    alert,
  },
});

export default store;

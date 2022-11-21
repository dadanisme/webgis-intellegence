import store from "../store";
import { setAlert, clearAlert } from "../store/slices/alert";

const alert = {
  success: (message, title = "") => {
    store.dispatch(setAlert({ message, type: "success", title }));
    setTimeout(() => {
      store.dispatch(clearAlert());
    }, 5000);
  },
  error: (message, title = "") => {
    store.dispatch(setAlert({ message, type: "error", title }));
    setTimeout(() => {
      store.dispatch(clearAlert());
    }, 5000);
  },
  warning: (message, title = "") => {
    store.dispatch(setAlert({ message, type: "warning", title }));
    setTimeout(() => {
      store.dispatch(clearAlert());
    }, 5000);
  },
  info: (message, title = "") => {
    store.dispatch(setAlert({ message, type: "info", title }));
    setTimeout(() => {
      store.dispatch(clearAlert());
    }, 5000);
  },
};

export default alert;

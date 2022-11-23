import store from "../store";
import { setAlert, clearAlert } from "../store/slices/alert";

let timeout = null;

const alert = {
  success: (message, title = "") => {
    store.dispatch(setAlert({ message, type: "success", title }));

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      store.dispatch(clearAlert());
    }, 5000);
  },
  error: (message, title = "") => {
    store.dispatch(setAlert({ message, type: "error", title }));

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      store.dispatch(clearAlert());
    }, 5000);
  },
  warning: (message, title = "") => {
    store.dispatch(setAlert({ message, type: "warning", title }));

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      store.dispatch(clearAlert());
    }, 5000);
  },
  info: (message, title = "") => {
    store.dispatch(setAlert({ message, type: "info", title }));

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      store.dispatch(clearAlert());
    }, 5000);
  },
};

export default alert;

import { set, get, ref } from "firebase/database";
import db from "./database";

export const writeUserData = (userId, company, role) => {
  set(ref(db, "/users/" + userId), {
    company: company,
    role: role,
  });
};

export const readUserData = (userId) => {
  return get(ref(db, "/users/" + userId));
};

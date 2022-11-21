import { set, get, ref } from "firebase/database";
import db from "./database";

export const writeUserData = (userId, company, role, displayName) => {
  set(ref(db, "/users/" + userId), {
    uid: userId,
    company: company,
    role: role,
    displayName: displayName,
  });
};

export const readUserData = (userId) => {
  return get(ref(db, "/users/" + userId));
};

export const getAdmins = async () => {
  const users = await get(ref(db, "/users"));

  const admins = [];
  users.forEach((user) => {
    if (user.val().role === "admin") {
      admins.push(user.val());
    }
  });

  return admins;
};

import { set, get, ref, update, remove } from "firebase/database";
import db from "../database";

export const writeUserData = (userId, company, role, displayName) => {
  set(ref(db, "/users/" + userId), {
    uid: userId,
    company: company,
    role: role,
    displayName: displayName,
  });
};

export const updateUserData = (userId, ...props) => {
  update(ref(db, "/users/" + userId), {
    uid: userId,
    ...props[0],
  });
};

export const readUserData = (userId) => {
  return get(ref(db, "/users/" + userId));
};

export const deleteUserData = (userId) => {
  remove(ref(db, "/users/" + userId));

  const api = import.meta.env.VITE_API;

  fetch(`${api}/user/${userId}`, {
    method: "DELETE",
  });
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

export const promoteUser = (userId) => {
  update(ref(db, "/users/" + userId), {
    role: "admin",
  });
};

export const demoteAdmin = (userId) => {
  update(ref(db, "/users/" + userId), {
    role: "user",
  });
};

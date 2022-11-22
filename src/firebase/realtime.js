import db from "./database";
import { ref, onValue } from "firebase/database";

export const realTimeUserData = (userId, callback) => {
  onValue(ref(db, "/users/" + userId), (snapshot) => {
    callback(snapshot.val());
  });
};

export const realTimeUsersData = (callback) => {
  onValue(ref(db, "/users"), (snapshot) => {
    callback(snapshot.val());
  });
};

export const realTimeAdminsData = (callback) => {
  onValue(ref(db, "/users"), (snapshot) => {
    const admins = [];
    snapshot.forEach((user) => {
      if (user.val().role === "admin") {
        admins.push(user.val());
      }
    });
    callback(admins);
  });
};

export const realTimeFeaturesData = (callback) => {
  onValue(ref(db, "/features"), (snapshot) => {
    callback(snapshot.val());
  });
};

export const realTimeFeatureData = (featureId, callback) => {
  onValue(ref(db, "/features/" + featureId), (snapshot) => {
    callback(snapshot.val());
  });
};

export const realTimePackagesData = (callback) => {
  onValue(ref(db, "/packages"), (snapshot) => {
    callback(snapshot.val());
  });
};

export const realTimePackageData = (packageId, callback) => {
  onValue(ref(db, "/packages/" + packageId), (snapshot) => {
    callback(snapshot.val());
  });
};

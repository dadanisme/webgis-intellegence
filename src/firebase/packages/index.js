import { set, get, ref, update, remove } from "firebase/database";
import db from "../database";

export const getPackages = async () => {
  const packages = await get(ref(db, "/packages"));

  const packagesArray = [];
  packages.forEach((pack) => {
    packagesArray.push(pack.val());
  });

  return packagesArray;
};

export const getPackage = async (id) => {
  const pack = await get(ref(db, "/packages/" + id));

  return pack.val();
};

export const getFeatures = async () => {
  const features = await get(ref(db, "/features"));

  const featuresArray = [];
  features.forEach((feature) => {
    featuresArray.push(feature.val());
  });

  return featuresArray;
};

export const getFeature = async (id) => {
  const feature = await get(ref(db, "/features/" + id));

  return feature.val();
};

export const createFeature = async (newFeature) => {
  const randomId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const newFeatureWithId = {
    ...newFeature,
    id: randomId,
  };

  set(ref(db, "/features/" + randomId), newFeatureWithId);
};

export const updateFeature = async (id, ...props) => {
  update(ref(db, "/features/" + id), {
    ...props[0],
  });
};

export const deleteFeature = async (id) => {
  remove(ref(db, "/features/" + id));
};

export const createPackage = async (newPackage) => {
  const randomId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const newPackageWithId = {
    ...newPackage,
    id: randomId,
  };

  set(ref(db, "/packages/" + randomId), newPackageWithId);
};

export const updatePackage = async (id, ...props) => {
  update(ref(db, "/packages/" + id), {
    ...props[0],
  });
};

export const deletePackage = async (id) => {
  remove(ref(db, "/packages/" + id));
};

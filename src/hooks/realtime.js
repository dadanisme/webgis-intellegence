import {
  realTimeAdminsData,
  realTimeUserData,
  realTimeUsersData,
  realTimeFeatureData,
  realTimeFeaturesData,
  realTimePackageData,
  realTimePackagesData,
} from "../firebase/realtime";
import { useEffect, useState } from "react";

const useRealTimeAdmins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    realTimeAdminsData(setAdmins);
  }, []);

  return admins;
};

const useRealTimeUser = (userId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    realTimeUserData(userId, setUser);
  }, [userId]);

  return user;
};

const useRealTimeUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    realTimeUsersData(setUsers);
  }, []);

  return users;
};

const useRealTimeFeature = (featureId) => {
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    realTimeFeatureData(featureId, setFeature);
  }, [featureId]);

  return feature;
};

const useRealTimeFeatures = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    realTimeFeaturesData(setFeatures);
  }, []);

  return features;
};

const useRealTimePackage = (packageId) => {
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    realTimePackageData(packageId, setPackageData);
  }, [packageId]);

  return packageData;
};

const useRealTimePackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    realTimePackagesData(setPackages);
  }, []);

  return packages;
};

export {
  useRealTimeAdmins,
  useRealTimeUser,
  useRealTimeUsers,
  useRealTimeFeature,
  useRealTimeFeatures,
  useRealTimePackage,
  useRealTimePackages,
};

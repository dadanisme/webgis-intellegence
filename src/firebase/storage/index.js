import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "..";

const storage = getStorage(app);

export const uploadImage = async (file) => {
  const storageRef = ref(storage, "users/images/" + file.name);

  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

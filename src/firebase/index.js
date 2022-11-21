// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9A6NE-_BVMqGPNnQyZN18OsasCTWhWoc",
  authDomain: "webgis-abbauf.firebaseapp.com",
  databaseURL:
    "https://webgis-abbauf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webgis-abbauf",
  storageBucket: "webgis-abbauf.appspot.com",
  messagingSenderId: "751131860109",
  appId: "1:751131860109:web:214d9e127bfe1b7d85d6c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

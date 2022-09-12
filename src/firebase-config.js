import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "aadis-kitchen",
  storageBucket: "aadis-kitchen.appspot.com",
  messagingSenderId: "34081911070",
  appId: "1:34081911070:web:4618f156d6b7ca36d8990f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const remoteConfig = getRemoteConfig(app);

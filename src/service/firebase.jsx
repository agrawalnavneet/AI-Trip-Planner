import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { config } from "../config/env.js";

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
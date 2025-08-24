// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeIoA2Uz4UHrFPqbLHLo2BbOTYppg1m-I",
  authDomain: "tourvia-7bc35.firebaseapp.com",
  projectId: "tourvia-7bc35",
  storageBucket: "tourvia-7bc35.firebasestorage.app",
  messagingSenderId: "969825677655",
  appId: "1:969825677655:web:c3241ac41ece23fbf20e12",
  measurementId: "G-08CD0BHF1Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);
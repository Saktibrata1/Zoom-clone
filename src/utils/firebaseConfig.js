import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMCW4kxeDUobvRMu44ZbOPyePLqzsOJFw",
  authDomain: "zoom-clone-app-19fa3.firebaseapp.com",
  projectId: "zoom-clone-app-19fa3",
  storageBucket: "zoom-clone-app-19fa3.appspot.com",
  messagingSenderId: "558681701377",
  appId: "1:558681701377:web:13c7888cca16697ecc5400",
  measurementId: "G-E8GK5WZDLK"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");

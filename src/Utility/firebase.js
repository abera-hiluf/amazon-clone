// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBt_ESq5yiSmtfBOOmmwN1GvTz996ULAL4",
  authDomain: "cloning-536ef.firebaseapp.com",
  projectId: "cloning-536ef",
  storageBucket: "cloning-536ef.firebasestorage.app",
  messagingSenderId: "268215760219",
  appId: "1:268215760219:web:ad963e6a2697209195d67e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // You asked about this
export const db = app.firestore(); // And this

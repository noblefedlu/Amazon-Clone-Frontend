// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6uEvfByv_ldtj-488FlcM-hI4_4z9Idw",
  authDomain: "clone-499ea.firebaseapp.com",
  projectId: "clone-499ea",
  storageBucket: "clone-499ea.firebasestorage.app",
  messagingSenderId: "266880768706",
  appId: "1:266880768706:web:ae7dbdf8ff0932e390795b",
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();

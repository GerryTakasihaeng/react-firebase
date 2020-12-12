import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDbYIr0FfFfv8Dw8PbvOfroXLg8txDQs9A",
  authDomain: "simple-notes-firebase-284dc.firebaseapp.com",
  projectId: "simple-notes-firebase-284dc",
  storageBucket: "simple-notes-firebase-284dc.appspot.com",
  messagingSenderId: "486490206515",
  appId: "1:486490206515:web:3660bedc6f248291dc8e46",
  measurementId: "G-METQC05E32"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const database = firebase.database();

export default firebase;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJtixWHBaSorru7iVF-XV0wnG_F0o7fdA",
  authDomain: "lens-sql.firebaseapp.com",
  projectId: "lens-sql",
  storageBucket: "lens-sql.appspot.com",
  messagingSenderId: "825745446073",
  appId: "1:825745446073:web:4dd05eb7ee6d7c7344b768",
  measurementId: "G-NJK883873B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
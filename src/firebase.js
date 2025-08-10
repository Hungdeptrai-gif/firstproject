// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc4tR_WS_d2GiL7gwAVYoW1PqYrP1jaw8",
  authDomain: "firstproject-20494.firebaseapp.com",
  projectId: "firstproject-20494",
  storageBucket: "firstproject-20494.firebasestorage.app",
  messagingSenderId: "1083236811344",
  appId: "1:1083236811344:web:5f6d08d323b96e15ebc755",
  measurementId: "G-S0L3D74D1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
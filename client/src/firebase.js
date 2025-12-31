// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9af28.firebaseapp.com",
  projectId: "mern-estate-9af28",
  storageBucket: "mern-estate-9af28.appspot.com",
  messagingSenderId: "233878301208",
  appId: "1:233878301208:web:675ba512070b760c83f16d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
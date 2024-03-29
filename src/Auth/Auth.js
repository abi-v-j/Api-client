// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAarzB2ynjLevEb0X-ym-XUnS5HVDZb-RI",
  authDomain: "api-auth-418620.firebaseapp.com",
  projectId: "api-auth-418620",
  storageBucket: "api-auth-418620.appspot.com",
  messagingSenderId: "236434089165",
  appId: "1:236434089165:web:cfa6f83aba691b49743584",
  measurementId: "G-FV0R5PN4DL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCopRzE6McaWQAiCD9CYtNOBqtEIWhCxBA",
  authDomain: "footie-aa96d.firebaseapp.com",
  databaseURL:
    "https://footie-aa96d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "footie-aa96d",
  storageBucket: "footie-aa96d.appspot.com",
  messagingSenderId: "1041873364470",
  appId: "1:1041873364470:web:d1998582b08bb6075613d7",
  measurementId: "G-7NP3YZ1KEP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode;

// "firebaseConfig": {
//   "apiKey": "AIzaSyCopRzE6McaWQAiCD9CYtNOBqtEIWhCxBA",
//   "authDomain": "footie-aa96d.firebaseapp.com",
//   "databaseURL": "https://footie-aa96d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   "projectId": "footie-aa96d",
//   "storageBucket": "footie-aa96d.appspot.com",
//   "messagingSenderId": "1041873364470",
//   "appId": "1:1041873364470:web:d1998582b08bb6075613d7",
//   "measurementId": "G-7NP3YZ1KEP"
// }

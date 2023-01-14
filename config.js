import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

// import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
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

export const defaultApp = firebase.initializeApp(firebaseConfig);

// firebase.auth().useDeviceLanguage;

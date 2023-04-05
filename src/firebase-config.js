// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfdsirwY86REOCTG8l-DpeK0zCP27Lqa8",
  authDomain: "learnlab-f284b.firebaseapp.com",
  projectId: "learnlab-f284b",
  storageBucket: "learnlab-f284b.appspot.com",
  messagingSenderId: "283801463443",
  appId: "1:283801463443:web:8af484f3a5fccd27253b66",
  measurementId: "G-NSVRKC6004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
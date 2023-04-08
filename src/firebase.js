import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDzydHxVSdGUpr-DSLuW3hT6AvfPDm2XQ",
  authDomain: "learnlab-master-your-ski.firebaseapp.com",
  projectId: "learnlab-master-your-ski",
  storageBucket: "learnlab-master-your-ski.appspot.com",
  messagingSenderId: "639470988121",
  appId: "1:639470988121:web:e3c07f7d422509d70f3a48",
  measurementId: "G-HC5X9W74KX",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize other Firebase services
const analytics = getAnalytics(app);
const signIn = signInWithEmailAndPassword;
const signUp = createUserWithEmailAndPassword;
const auth = getAuth(app);
const db = getFirestore(app);

export { signUp, signIn, auth, db };

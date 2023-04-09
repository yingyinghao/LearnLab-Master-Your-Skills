import { initializeApp } from "firebase/app";
// import {getAnalytics} from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

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
// const analytics = getAnalytics(app);
const signIn = signInWithEmailAndPassword;
const signUp = createUserWithEmailAndPassword;
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

//Google Authentication
const popUpSignIn = signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
//Google Authentication

export { signUp, signIn, auth, db, popUpSignIn };

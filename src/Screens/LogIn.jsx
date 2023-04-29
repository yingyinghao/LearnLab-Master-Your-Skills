import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signIn } from "../firebase";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const db = getFirestore();

function LogIn() {
  //   const handleGoogleSignIn = () => {
  //     signInWithPopup(auth, new GoogleAuthProvider())
  //       .then((result) => {
  //         // The signed-in user info.
  //         const user = result.user;
  //         // Do something with the user object...
  //         dispatch({ type: "LOGIN", payload: user });
  //         navigate("/dashboard");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   const [error, setError] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  //   const { dispatch } = useContext(AuthContext);

  //   // console.log(dispatch, 12345);
  //   const handleLogin = (e) => {
  //     e.preventDefault();

  //     signIn(auth, email, password)
  //       .then((userCredential) => {
  //         // setError(false);
  //         const user = userCredential.user;
  //         dispatch({ type: "LOGIN", payload: user });
  //         navigate("/dashboard");
  //       })
  //       .catch((error) => {
  //         // const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // setError(true);
  //         console.log(errorMessage);
  //       });
  //   };

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { emailVerified: true });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      if (!loading) {
        if (user && user.emailVerified) {
          navigate("/");
        } else {
          await auth.signOut();
          setError("Please verify email to continue...");
        }
      }
    };

    checkUserAndRedirect();
  }, [user, loading]);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        const { displayName, email, uid, photoURL } = user;
        const nameParts = displayName.split(" ");
        const firstName = nameParts[0];
        const lastName =
          nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const response = await setDoc(userDocRef, {
            firstName,
            lastName,
            displayName,
            email,
            photoURL,
          })
            .then(() => {
              console.log("Document written successfully!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const resendVerificationEmail = async () => {
    try {
      const userCredential = await signIn(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setError("Verification email resent. Please check your inbox.");
      }
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  // console.log(dispatch, 12345);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signIn(auth, email, password);
      const user = userCredential.user;

      console.log(`EMAIL VERIFIED? ${user.emailVerified}`);

      // if (user.emailVerified === true) {
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
      // } else {
      // setError("Please verify your email before logging in.");
      // }
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <>
      <div className="mt-20">
        <section className="bg-white">
          <div className="lg:grid lg:min-h-[93vh] lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
              <img
                alt="Pattern"
                src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </aside>

            <main
              aria-label="Main"
              className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
            >
              <div className="max-w-xl lg:max-w-3xl">
                <Link className="block text-blue-600" to="/">
                  <span className="sr-only">Login Page</span>
                  <span className="self-center text-xl font-semibold whitespace-nowrap">
                    Learn Lab
                  </span>
                </Link>

                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome back to Learn Lab 💻
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Access your Learn Lab account to continue your learning
                  journey. <br />
                  Login with your credentials and start exploring today!
                </p>

                <form
                  action="#"
                  onSubmit={handleLogin}
                  className="mt-8 grid grid-cols-6 gap-6"
                >
                  <div className="col-span-6">
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>

                    <input
                      id="Email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="Password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      id="Password"
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-20 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                      Log In
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      <span>New to Learn Lab? </span>
                      <Link to="/signup">
                        <span className="text-blue-700 underline font-medium">
                          Sign Up
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  <div className="col-span-4 sm:col-span-2">
                    <div className="w-auto py-2">
                      <button
                        className="flex items-center p-4 bg-white hover:bg-gray-50 border rounded-lg transition ease-in-out duration-200"
                        onClick={handleGoogleSignIn}
                      >
                        <img
                          className="mr-3 w-[20px]"
                          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                          alt="google"
                        />
                        <span className="font-semibold leading-normal">
                          Sign in with Google
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </section>
      </div>
    </>
  );
}

export default LogIn;

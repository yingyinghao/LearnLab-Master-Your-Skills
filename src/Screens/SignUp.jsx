import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth, signUp, db } from "../firebase";
import { auth, signUp } from "../firebase";
import { useState } from "react";
// import firebase from "firebase/compat/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
const db = getFirestore();

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      // passwords don't match, handle error
      setError("Passwords do not match");
      return;
    }

    signUp(auth, email, password)
      .then(async (userCredential) => {
        setError(false);
        const user = userCredential.user;

        const userDocRef = collection(db, "users");

        const response = await setDoc(doc(userDocRef, user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          coursesEnrolled: [],
          coursesCompleted: [],
        })
          .then(() => {
            console.log("Document written successfully!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        navigate("/login");

        console.log(response);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
        console.log(errorMessage);
      });
  };

  return (
    <>
      <div classNameName="mt-20">
        <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
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
                  Welcome to Learn Lab 💻
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Access your Learn Lab account to start your learning journey.{" "}
                  <br />
                  Sign up and start exploring today!
                </p>

                <form
                  action="#"
                  onSubmit={handleSubmit}
                  className="mt-8 grid grid-cols-6 gap-6"
                >
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="FirstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="LastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      for="Email"
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
                      for="Password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      id="Password"
                      name="password"
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="PasswordConfirmation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password Confirmation
                    </label>

                    <input
                      type="password"
                      id="PasswordConfirmation"
                      name="passwordConfirmation"
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring"
                      required
                    />
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    {error && <p>{error}</p>}
                    <button
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                      type="submit"
                    >
                      Create an account
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      <span>Already have an account? </span>
                      <Link to="/login">
                        <span className="text-blue-700 underline font-medium">
                          Sign In
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  <div className="col-span-4 sm:col-span-2">
                    <div className="w-auto py-2">
                      <button className="flex items-center p-4 bg-white hover:bg-gray-50 border rounded-lg transition ease-in-out duration-200">
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

export default SignUp;

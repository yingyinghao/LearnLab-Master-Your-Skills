import React, {useEffect, useState, useContext} from "react";
import {auth} from "../firebase";
import {AuthContext} from "../context/AuthContext";
// import { useAuthState } from "react-firebase-hooks/auth";
import {getFirestore, doc, updateDoc, getDoc} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import {updatePassword, signOut, getAuth} from "firebase/auth";

const db = getFirestore();

const MyAccount = () => {
  const [user, loading] = useAuthState(auth);
  // const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isGoogleProvider, setIsGoogleProvider] = useState(false);

  const logToken = async (user) => {
    // console.log(await user.getIdToken());
  };
  if (!loading) {
    logToken(user);
  }

  // For changing the value of display name when the valuye of the first name or last name changes.
  useEffect(() => {
    setDisplayName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setUserId(user.uid);
        setEmail(user.email);

        // console.log("This got fired!");

        const googleProvider = user.providerData.some(
          (provider) => provider.providerId === "google.com"
        );
        setIsGoogleProvider(googleProvider);

        // console.log("This got fired!");

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setDisplayName(userData.displayName);
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate, user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const {dispatch} = useContext(AuthContext);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // console.log("Successfully Logged Out!");
        dispatch({type: "LOGOUT"});
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveClick = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        displayName,
        firstName,
        lastName,
      });

      if (password) {
        if (password === passwordConfirmation) {
          await updatePassword(user, password);
        } else {
          setErrorMessage("Error: Passwords do not match");
          return;
        }
      }

      setEditing(false);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='max-w-xl lg:max-w-3xl mx-auto py-8 mt-24'>
        {editing ? (
          <>
            <div className='mb-4'>
              <h3 className='text-gray-800 mb-6 text-3xl font-bold'>
                Update Your Information,
              </h3>
              <label
                htmlFor='FirstName'
                className='block text-gray-700 text-lg font-bold mb-2'>
                First Name:
              </label>
              <input
                type='text'
                id='FirstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='w-full text-gray-700 border border-gray-300 rounded py-2 px-4'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='LastName'
                className='block text-gray-700 text-lg font-bold mb-2'>
                Last Name:
              </label>
              <input
                type='text'
                id='LastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='w-full text-gray-700 border border-gray-300 rounded py-2 px-4'
              />
            </div>
            {!isGoogleProvider && (
              <>
                <div className='mb-4'>
                  <label
                    htmlFor='Password'
                    className='block text-gray-700 text-lg font-bold mb-2'>
                    New Password:
                  </label>
                  <input
                    type='password'
                    id='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='PasswordConfirmation'
                    className='block text-gray-700 text-lg font-bold mb-2'>
                    Password Confirmation
                  </label>

                  <input
                    type='password'
                    id='PasswordConfirmation'
                    name='passwordConfirmation'
                    placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring'
                    required
                  />
                </div>
              </>
            )}
            {errorMessage && (
              <div className='text-red-500 mt-2'>{errorMessage}</div>
            )}
            <button
              onClick={handleSaveClick}
              className='w-full my-6 bg-blue-600 text-white font-bold py-2 px-4 rounded transition hover:bg-blue-500 focus:outline-none focus:ring'>
              Save
            </button>
          </>
        ) : (
          <>
            <h1 className='text-gray-800 text-3xl font-bold mb-2'>
              Welcome User,
            </h1>
            <p className='text-gray-600 text-md font-semibold my-3'>
              You can change your Personal Info Here!
            </p>
            <button
              onClick={handleEditClick}
              className='w-full my-3 bg-blue-600 text-white font-bold py-2 px-4 rounded transition hover:bg-blue-500 focus:outline-none focus:ring'>
              Edit
            </button>

            <div className='flex items-center mt-4 lg:mt-0'>
              <button
                className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded transition hover:bg-blue-500 focus:outline-none focus:ring'
                aria-label='show notifications'
                onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyAccount;

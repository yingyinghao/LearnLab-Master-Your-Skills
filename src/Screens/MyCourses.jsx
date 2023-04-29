// import React, {useState, useEffect, useContext} from "react";
// import {getFirestore, doc, getDoc} from "firebase/firestore";
// import {AuthContext} from "../context/AuthContext";
// import courseDataList from "../Data/courseDataList";
// import Card from "../components/Card";
// import {Link} from "react-router-dom";
// import Loader from "../components/Loading";

// const db = getFirestore();

// function MyCourses() {
//   const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
//   const [completedCourseIds, setCompletedCourseIds] = useState([]);
//   const {currentUser} = useContext(AuthContext);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [completedCourses, setCompletedCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       const usersDocRef = doc(db, "users", currentUser.uid);
//       const userDoc = await getDoc(usersDocRef);
//       if (userDoc.exists()) {
//         const enrolledCourses = userDoc
//           .data()
//           .coursesEnrolled.map((enrolledCourse) => enrolledCourse.courseUid);
//         setEnrolledCourseIds(enrolledCourses);
//         const completedCourses = userDoc
//           .data()
//           .coursesCompleted.map((completedCourse) => completedCourse.courseUid);
//         setCompletedCourseIds(completedCourses);
//       }
//     };
//     fetchEnrolledCourses();
//   }, [currentUser.uid]);

//   useEffect(() => {
//     const filteredEnrolledCourses = courseDataList.filter((course) =>
//       enrolledCourseIds.includes(String(course.id))
//     );
//     setEnrolledCourses(filteredEnrolledCourses);
//     const filteredCompletedCourses = courseDataList.filter((course) =>
//       completedCourseIds.includes(String(course.id))
//     );
//     setCompletedCourses(filteredCompletedCourses);
//     setLoading(false);
//   }, [enrolledCourseIds, completedCourseIds]);

//   return loading ? (
//     <>
//       <h1 className='col-span-4 -mb-3 mx-auto text-4xl text-blue-600 font-semibold'>
//         <Loader />
//       </h1>
//     </>
//   ) : (
//     // <div className='grid grid-cols-4 gap-8 my-6 px-16 mt-28'>
//     //   {enrolledCourses.length > 0 && (
//     //     <>
//     //       <h1 className='col-span-4 -mb-3 text-4xl text-blue-600 font-semibold'>
//     //         Enrolled Courses
//     //       </h1>
//     //       {enrolledCourses.map((course) => (
//     //         <Card key={course.id} courseData={course} />
//     //       ))}
//     //     </>
//     //   )}
//     //   {completedCourses.length > 0 && (
//     //     <>
//     //       <h1 className='col-span-4 mt-6 -mb-3 text-4xl text-blue-600 font-semibold'>
//     //         Completed Courses
//     //       </h1>
//     //       {completedCourses.map((course) => (
//     //         <Card key={course.id} courseData={course} />
//     //       ))}
//     //     </>
//     //   )}
//     //   {enrolledCourses.length === 0 && completedCourses.length === 0 && (
//     //     <>
//     //       <h1 className='col-span-4 -mb-3 mx-auto text-4xl text-blue-600 font-semibold'>
//     //         You have no courses enrolled yet.
//     //       </h1>
//     //       <h2 className='col-span-4 -mb-3 mx-auto text-xl text-blue-600 font-semibold'>
//     //         You can find courses that you like at Dashboard
//     //       </h2>
//     //       <Link
//     //         className='col-span-4 mx-auto w-48 mt-4 items-center justify-center'
//     //         to='/dashboard'>
//     //         <button className='text-white font-semibold py-2 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700'>
//     //           Go to Dashboard
//     //         </button>
//     //       </Link>
//     //     </>
//     //   )}
//     // </div>
//     <div className='mt-36 md:mt-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-6 sm:px-12 md:px-20 lg:px-28 justify-items-center'>
//       {enrolledCourses.length > 0 && (
//         <>
//           <h1 className='col-span-1 md:col-span-2 lg:col-span-3 -mb-3 text-4xl text-blue-600 font-semibold'>
//             Enrolled Courses
//           </h1>
//           {enrolledCourses.map((course) => (
//             <Card key={course.id} courseData={course} />
//           ))}
//         </>
//       )}
//       {completedCourses.length > 0 && (
//         <>
//           <h1 className='col-span-1 md:col-span-2 lg:col-span-3 mt-6 -mb-3 text-4xl text-blue-600 font-semibold'>
//             Completed Courses
//           </h1>
//           {completedCourses.map((course) => (
//             <Card key={course.id} courseData={course} />
//           ))}
//         </>
//       )}
//       {enrolledCourses.length === 0 && completedCourses.length === 0 && (
//         <>
//           <h1 className='col-span-1 md:col-span-2 lg:col-span-3 -mb-3 mx-auto text-4xl text-blue-600 font-semibold'>
//             You have no courses enrolled yet.
//           </h1>
//           <h2 className='col-span-1 md:col-span-2 lg:col-span-3 -mb-3 mx-auto text-xl text-blue-600 font-semibold'>
//             You can find courses that you like at Dashboard
//           </h2>
//           <Link
//             className='col-span-1 md:col-span-2 lg:col-span-3 mx-auto w-48 mt-4 items-center justify-center'
//             to='/dashboard'>
//             <button className='text-white font-semibold py-2 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700'>
//               Go to Dashboard
//             </button>
//           </Link>
//         </>
//       )}
//     </div>
//   );
// }
// export default MyCourses;

import React, { useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
// import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile, updatePassword, signOut, getAuth } from "firebase/auth";

const db = getFirestore();

const MyAccount = () => {
  const [user, loading] = useAuthState(auth);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [photo, setPhoto] = useState(user.photoURL);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logToken = async (user) => {
    console.log(await user.getIdToken());
  };
  if (!loading) {
    logToken(user);
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoChanged(true);
    }
  };

  // For changing the value of display name when the valuye of the first name or last name changes.
  useEffect(() => {
    setDisplayName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setUserId(user.uid);
        setEmail(user.email);

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
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Successfully Logged Out!");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveClick = async () => {
    let updatedPhotoURL = user.photoURL || "/user.png";

    try {
      await updateDoc(doc(db, "users", user.uid), {
        displayName,
        firstName,
        lastName,
        photoURL: updatedPhotoURL,
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
      <div className="max-w-xl lg:max-w-3xl mx-auto py-8">
        {editing ? (
          <>
            <div className="mb-4">
              <label
                htmlFor="FirstName"
                className="block text-white text-lg font-bold mb-2"
              >
                First Name:
              </label>
              <input
                type="text"
                id="FirstName"
                value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
                className="w-full text-white bg-blue-700 rounded py-2 px-4"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="LastName"
                className="block text-white text-lg font-bold mb-2"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="LastName"
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
                className="w-full text-white bg-blue-700 rounded py-2 px-4"
              />
            </div>
            {
              <>
                <div className="mb-4">
                  <label
                    htmlFor="Password"
                    className="block text-white text-lg font-bold mb-2"
                  >
                    New Password:
                  </label>
                  <input
                    type="password"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    for="PasswordConfirmation"
                    className="block text-white text-lg font-bold mb-2"
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
              </>
            }
            {errorMessage && (
              <div className="text-red-500 mt-2">{errorMessage}</div>
            )}
            <button
              onClick={handleSaveClick}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded transition hover:bg-blue-500 focus:outline-none focus:ring"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="text-white text-xl font-bold mb-6">
              Email: {email}
            </h3>
            <button
              onClick={handleEditClick}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded transition hover:bg-blue-500 focus:outline-none focus:ring"
            >
              Edit
            </button>

            <div className="flex items-center mt-4 lg:mt-0">
              <button
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded transition hover:bg-blue-500 focus:outline-none focus:ring"
                aria-label="show notifications"
                onClick={handleLogout}
              >
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

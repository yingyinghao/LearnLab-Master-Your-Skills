import React, {useState, useEffect} from "react";
import {getFirestore, collection, getDocs, doc, updateDoc} from "firebase/firestore";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const db = getFirestore();

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesData = coursesSnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
      });
      setCourses(coursesData);
    };

    getCourses();
  }, []);

  const handleAddToFavorite = async (courseId) => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, { addedToFavorite: true });
      setCourses((prevState) =>
        prevState.map((course) =>
          course.id === courseId ? { ...course, addedToFavorite: true } : course
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromFavorite = async (courseId) => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, { addedToFavorite: false });
      setCourses((prevState) =>
        prevState.map((course) =>
          course.id === courseId ? { ...course, addedToFavorite: false } : course
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mt-24'>
      <h1>Dashboard</h1>
      {courses.map((courseData, index) => (
        <div key={index}>
          <Card courseData={courseData} />
          {courseData.addedToFavorite ? (
            <button-added onClick={() => handleRemoveFromFavorite(courseData.id)}>
              Added
            </button-added>
          ) : (
            <button-addtofavorite onClick={() => handleAddToFavorite(courseData.id)}>
              Add to my favorite
            </button-addtofavorite>
          )}
          {/* {courseData.addedToFavorite ? (
            <button disabled>Added</button>
          ) : (
            <button onClick={() => handleAddToFavorite(courseData.id)}>
              Add to my favorite
            </button>
          )} */}
        </div>
      ))}
            <Link
            to="/favorite"
              // target='_blank'
              className='relative inline-block items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-blue-500 sm:mt-0'>
              <span className='absolute inset-0 w-full h-full bg-gradient-to-br from-sky-500 via-violet-600 to-blue-800'></span>
              <span className='absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-indigo-600 rounded-full opacity-30 group-hover:rotate-90 ease'></span>
              <span className='relative text-white'>My Favorite</span>
            </Link>
      {/* <Link to="/favorite">My Favorite</Link> */}
    </div>
  );
};

export default Dashboard;

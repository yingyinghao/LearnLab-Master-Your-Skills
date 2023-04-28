import React, {useState, useEffect, useContext} from "react";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import courseDataList from "../Data/courseDataList";
import Card from "../components/Card";
import {Link} from "react-router-dom";
import Loader from "../components/Loading";

const db = getFirestore();

function MyCourses() {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [completedCourseIds, setCompletedCourseIds] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const usersDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(usersDocRef);
      if (userDoc.exists()) {
        const enrolledCourses = userDoc
          .data()
          .coursesEnrolled.map((enrolledCourse) => enrolledCourse.courseUid);
        setEnrolledCourseIds(enrolledCourses);
        const completedCourses = userDoc
          .data()
          .coursesCompleted.map((completedCourse) => completedCourse.courseUid);
        setCompletedCourseIds(completedCourses);
      }
    };
    fetchEnrolledCourses();
  }, [currentUser.uid]);

  useEffect(() => {
    const filteredEnrolledCourses = courseDataList.filter((course) =>
      enrolledCourseIds.includes(String(course.id))
    );
    setEnrolledCourses(filteredEnrolledCourses);
    const filteredCompletedCourses = courseDataList.filter((course) =>
      completedCourseIds.includes(String(course.id))
    );
    setCompletedCourses(filteredCompletedCourses);
    setLoading(false);
  }, [enrolledCourseIds, completedCourseIds]);

  return loading ? (
    <>
      <h1 className='col-span-4 -mb-3 mx-auto text-4xl text-blue-600 font-semibold'>
        <Loader />
      </h1>
    </>
  ) : (
    // <div className='grid grid-cols-4 gap-8 my-6 px-16 mt-28'>
    //   {enrolledCourses.length > 0 && (
    //     <>
    //       <h1 className='col-span-4 -mb-3 text-4xl text-blue-600 font-semibold'>
    //         Enrolled Courses
    //       </h1>
    //       {enrolledCourses.map((course) => (
    //         <Card key={course.id} courseData={course} />
    //       ))}
    //     </>
    //   )}
    //   {completedCourses.length > 0 && (
    //     <>
    //       <h1 className='col-span-4 mt-6 -mb-3 text-4xl text-blue-600 font-semibold'>
    //         Completed Courses
    //       </h1>
    //       {completedCourses.map((course) => (
    //         <Card key={course.id} courseData={course} />
    //       ))}
    //     </>
    //   )}
    //   {enrolledCourses.length === 0 && completedCourses.length === 0 && (
    //     <>
    //       <h1 className='col-span-4 -mb-3 mx-auto text-4xl text-blue-600 font-semibold'>
    //         You have no courses enrolled yet.
    //       </h1>
    //       <h2 className='col-span-4 -mb-3 mx-auto text-xl text-blue-600 font-semibold'>
    //         You can find courses that you like at Dashboard
    //       </h2>
    //       <Link
    //         className='col-span-4 mx-auto w-48 mt-4 items-center justify-center'
    //         to='/dashboard'>
    //         <button className='text-white font-semibold py-2 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700'>
    //           Go to Dashboard
    //         </button>
    //       </Link>
    //     </>
    //   )}
    // </div>
    <div className='mt-36 md:mt-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-6 sm:px-12 md:px-20 lg:px-28 justify-items-center'>
      {enrolledCourses.length > 0 && (
        <>
          <h1 className='col-span-1 md:col-span-2 lg:col-span-3 -mb-3 text-4xl text-blue-600 font-semibold'>
            Enrolled Courses
          </h1>
          {enrolledCourses.map((course) => (
            <Card key={course.id} courseData={course} />
          ))}
        </>
      )}
      {completedCourses.length > 0 && (
        <>
          <h1 className='col-span-1 md:col-span-2 lg:col-span-3 mt-6 -mb-3 text-4xl text-blue-600 font-semibold'>
            Completed Courses
          </h1>
          {completedCourses.map((course) => (
            <Card key={course.id} courseData={course} />
          ))}
        </>
      )}
      {enrolledCourses.length === 0 && completedCourses.length === 0 && (
        <>
          <h1 className='col-span-1 md:col-span-2 lg:col-span-3 -mb-3 mx-auto text-4xl text-blue-600 font-semibold'>
            You have no courses enrolled yet.
          </h1>
          <h2 className='col-span-1 md:col-span-2 lg:col-span-3 -mb-3 mx-auto text-xl text-blue-600 font-semibold'>
            You can find courses that you like at Dashboard
          </h2>
          <Link
            className='col-span-1 md:col-span-2 lg:col-span-3 mx-auto w-48 mt-4 items-center justify-center'
            to='/dashboard'>
            <button className='text-white font-semibold py-2 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700'>
              Go to Dashboard
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
export default MyCourses;

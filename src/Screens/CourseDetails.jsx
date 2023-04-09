import React, {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";
import EnrolledDetail from "../components/EnrolledDetail";
import NotEnrolledDetail from "../components/NotEnrolledDetail";

const db = getFirestore();

function CourseDetails() {
  const {id} = useParams();
  const [courseData, setCourseData] = useState({});
  const [enrolled, setEnrolled] = useState(false);

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const getCourse = async () => {
      const coursesDocRef = doc(db, "courses", id);
      const courseDoc = await getDoc(coursesDocRef);
      if (courseDoc.exists()) {
        setCourseData(courseDoc.data());
      }
    };

    const hasUserEnrolled = async () => {
      const usersDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(usersDocRef);
      if (userDoc.exists()) {
        for (const i of userDoc.data().coursesEnrolled) {
          if (JSON.stringify(i.courseUid) === JSON.stringify(id)) {
            setEnrolled(true);
          }
        }
      }
    };
    getCourse();
    hasUserEnrolled();
  }, [currentUser.uid, id]);

  return (
    <div className='mt-24'>
      {/* <p className='mt-24'>{JSON.stringify(enrolled)}</p> */}
      {enrolled ? (
        <EnrolledDetail courseData={courseData} />
      ) : (
        <NotEnrolledDetail courseData={courseData} />
      )}
    </div>
  );
}

export default CourseDetails;

import React, {useState, useRef, useContext, useEffect} from "react";
import {AiFillStar} from "react-icons/ai";
import ReactPlayer from "react-player";
import {AuthContext} from "../context/AuthContext";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
import {useParams} from "react-router-dom";

const db = getFirestore();

const EnrolledDetail = ({courseData}) => {
  const {id} = useParams();

  const {currentUser} = useContext(AuthContext);

  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const getPlayTime = async () => {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      let courseFound = false;
      if (userDoc.exists()) {
        if (!courseFound) {
          for (const i of userDoc.data().coursesEnrolled) {
            if (i.courseUid === id) {
              setPlayed(i.playedTime);
              courseFound = true;
            }
          }
        }
        if (!courseFound) {
          for (const i of userDoc.data().coursesCompleted) {
            if (i.courseUid === id) {
              setPlayed(0);
              courseFound = true;
            }
          }
        }
      }
    };
    getPlayTime();
  }, [currentUser.uid, id]);

  const handleProgress = async (state) => {
    const {playedSeconds} = state;
    if (played <= playedSeconds) {
      setPlayed(playedSeconds);
    }
  };

  const handlePause = async () => {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    const coursesEnrolled = userDoc.data().coursesEnrolled;
    const courseIndex = coursesEnrolled.findIndex(
      (course) => course.courseUid === id
    );
    coursesEnrolled[courseIndex].playedTime = played;

    await setDoc(userDocRef, {coursesEnrolled}, {merge: true});
  };

  const handleEnded = async () => {
    // When video ends, remove the course from the coursesEnrolled to coursesCompleted

    // Remove the course from coursesEnrolled
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    const coursesEnrolled = userDoc.data().coursesEnrolled;
    const courseIndex = coursesEnrolled.findIndex(
      (course) => course.courseUid === id
    );
    coursesEnrolled.splice(courseIndex, 1);

    // Add the course to coursesCompleted
    const coursesCompleted = userDoc.data().coursesCompleted;
    const newCompletedCourse = {courseUid: id, completedAt: new Date()};
    coursesCompleted.push(newCompletedCourse);

    // Update the user document in Firestore
    await setDoc(
      userDocRef,
      {coursesEnrolled: coursesEnrolled, coursesCompleted: coursesCompleted},
      {merge: true}
    );
  };

  const handleStart = () => {
    const player = playerRef.current.getInternalPlayer();
    console.log(played);
    player.seekTo(played, "seconds");
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex-2/3'>
          <div className='w-full  h-[65vh] px-28'>
            <ReactPlayer
              url={courseData.videoUrl}
              width='100%'
              height='100%'
              controls
              played={played}
              onProgress={handleProgress}
              onEnded={handleEnded}
              onStart={handleStart}
              onPause={handlePause}
              ref={playerRef}
            />
          </div>
        </div>
        <div className=''>
          <div className='flex flex-row h-full'>
            <div className='w-3/4 h-full px-16 pt-10'>
              <div className=''>
                <p className='text-4xl font-semibold mb-4 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-sky-600  via-purple-600 to-indigo-800'>
                  {courseData.courseName}
                </p>
                <p className='text-[18px] font-medium text-gray-800 mb-2'>
                  Description
                </p>
                <p className='text-sm font-medium text-gray-700'>
                  {courseData.info}
                </p>
              </div>
            </div>
            <div className='w-1/4 h-full px-8 pt-8'>
              <div className='grid grid-cols-1 gap-4 py-2 px-8'>
                <div className='justify-center items-center'>
                  <h1 className='text-xl font-semibold text-indigo-600 text-center'>
                    More Course Information
                  </h1>
                </div>
                <div className='bg-gray-50 rounded-lg transition duration-500 ease-in-out shadow transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 flex justify-between items-center p-4'>
                  <p className='text-lg text-gray-600'>Author</p>
                  <p className='text-lg text-gray-600 font-semibold'>
                    {courseData.authorName}
                  </p>
                </div>
                <div className='bg-gray-50 rounded-lg transition duration-500 ease-in-out shadow transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 flex justify-between items-center p-4'>
                  <p className='text-lg text-gray-600'>Reviews</p>
                  <div className='flex items-center justify-center gap-2'>
                    <AiFillStar className='text-blue-500 text-xl' />
                    <div className=''>
                      <p className='text-gray-600 font-semibold'>
                        {courseData.reviews}
                        <span className='text-gray-600 font-semibold'>
                          ({courseData.reviewers})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolledDetail;

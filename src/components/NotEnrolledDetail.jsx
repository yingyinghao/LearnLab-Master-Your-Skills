import React, {useContext} from "react";
import {useParams} from "react-router-dom";
import {GiNotebook} from "react-icons/gi";
import {AiFillStar} from "react-icons/ai";
import {getFirestore, doc, updateDoc, arrayUnion} from "firebase/firestore";
import {AuthContext} from "../context/AuthContext";

const db = getFirestore();

const NotEnrolledDetail = ({courseData}) => {
  const {id} = useParams();
  const {currentUser} = useContext(AuthContext);

  const enrollNowHandler = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const objToUpdate = {
        courseUid: id,
        playedTime: 0,
      };

      await updateDoc(userDocRef, {
        coursesEnrolled: arrayUnion(objToUpdate),
      });

      window.location.reload();

      console.log("Enrollment successful!");
    } catch (error) {
      console.error("Error enrolling the course:", error);
    }
  };

  return (
    <div className='flex'>
      <div className='w-4/6 h-[85vh] px-8 py-4'>
        <img
          alt='Event Cover'
          src={courseData.imageUrl}
          className='h-2/3 w-full object-cover bg-gray-100 rounded-[2rem]'
        />
        <div className='mt-5 px-3'>
          <p className='text-4xl font-semibold mb-4 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-sky-600  via-purple-600 to-indigo-800'>
            {courseData.courseName}
          </p>
          <p className='text-[20px] font-semibold text-gray-800 my-4'>
            Description
          </p>
          <p className='text-sm font-medium text-gray-700'>{courseData.info}</p>
        </div>
      </div>

      <div className='w-2/6 h-[85vh] px-8 py-8'>
        <div className='grid grid-cols-2 items-center justify-center gap-4 py-2 px-8 mb-6'>
          <div className='col-span-2 justify-center items-center'>
            <h2 className=' text-2xl font-semibold text-indigo-600 text-center'>
              More Course Information
            </h2>
          </div>

          <div className='col-span-2  bg-gray-50 rounded-lg transition duration-500 ease-in-out shadow transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 flex justify-between items-center p-4'>
            <p className='text-lg text-gray-600'>Author</p>
            <p className='text-lg text-gray-600 font-semibold'>
              {courseData.authorName}
            </p>
          </div>

          <div className='col-span-2  bg-gray-50 rounded-lg transition duration-500 ease-in-out shadow transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 flex justify-between items-center p-4'>
            <p className='text-lg text-gray-600'>Reviews</p>
            <div className='flex items-center justify-center gap-2'>
              <AiFillStar className='text-orange-400 text-xl' />
              <div className=''>
                <p className='font-semibold text-gray-600'>
                  {courseData.reviews}
                  <span className=' text-gray-600 font-semibold'>
                    {" "}
                    ({courseData.reviewers})
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='col-span-2  bg-gray-50 rounded-lg transition duration-500 ease-in-out shadow transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 flex justify-between items-center p-4'>
            <p className='text-lg text-gray-600'> Level</p>
            <p className='text-lg text-gray-600 font-semibold'>
              {courseData.level}
            </p>
          </div>

          <div className='col-span-2  bg-gray-50 rounded-lg transition duration-500 ease-in-out shadow transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 flex justify-between items-center p-4'>
            <p className='text-lg text-gray-600'> Time</p>
            <p className='text-lg text-gray-600 font-semibold'>
              {courseData.time}
            </p>
          </div>

          <div className='col-span-2  bg-gray-50 rounded-lg transition duration-500 ease-in-out shadow transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 flex justify-between items-center p-4'>
            <p className='text-lg text-gray-600'> Schedule</p>
            <p className='text-lg text-gray-600 font-semibold'>
              {courseData.schedule}
            </p>
          </div>

          <div className='col-span-2 flex justify-between items-center mx-auto'>
            {/* <Link to={`${courseData.venueLink}`} target='_blank'> */}
            <button
              className='px-4 py-3 w-96 mx-auto bg-blue-600 rounded-xl text-white outline-none focus:ring-4 shadow-lg transform transition-transform flex justify-center items-center  text-center '
              onClick={enrollNowHandler}>
              <GiNotebook className='h-6 w-6' />
              <span className='ml-2 text-center'>Enroll Now</span>
            </button>
          </div>
        </div>
        <div className='grid grid-cols-2 items-center justify-center gap-4 py-2 px-8 mb-6'>
          <div className='col-span-2 justify-center items-center'>
            <h2 className='text-xl font-semibold text-indigo-600 text-center mt-5'>
              What you'll learn
            </h2>
          </div>

          <ul className='col-span-2 w-full'>
            {courseData?.learningOutcomes?.map((outcome, index) => (
              <li key={index} className='flex items-center gap-4 my-3'>
                <svg
                  className='w-6 h-6 mr-1.5 text-blue-500 flex-shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'></path>
                </svg>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotEnrolledDetail;

// import React from "react";
// import {Link} from "react-router-dom";
// import {GiNotebook} from "react-icons/gi";
// import {getFirestore, doc, setDoc} from "firebase/firestore";

// const db = getFirestore();

// const notEnrolledDetail = ({courseData, currentUser}) => {
//   return (
//     <div className='flex'>
//       <div className='w-4/6 h-[85vh] px-8 py-4'></div>

//       <div className='w-2/6 h-[85vh] px-8 py-8'>
//         <div className='grid grid-cols-2 items-center justify-center gap-4 py-2 px-8 mb-6'>
//           <div className='col-span-2 justify-center items-center'>
//             <h2 className=' text-2xl font-semibold text-indigo-600 text-center'>
//               More Course Information
//             </h2>
//           </div>

//           <div className='col-span-2 flex justify-between items-center mx-auto'>
//             <div className='px-4 py-3 w-96 mx-auto bg-blue-600 rounded-xl text-white outline-none focus:ring-4 shadow-lg transform transition-transform flex justify-center items-center  text-center'>
//               <GiNotebook className='h-6 w-6' />
//               <span className='ml-2 text-center'>Enroll Now</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default notEnrolledDetail;

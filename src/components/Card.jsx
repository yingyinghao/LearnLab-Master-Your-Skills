import React from "react";
import {AiFillStar} from "react-icons/ai";
import {Link} from "react-router-dom";

function Card({courseData}) {
  const {imageUrl, authorName, courseName, reviews, reviewers} = courseData;

  return (
    <>
      <div className='block xl:w-[400px] w-[250px] rounded-xl p-4 border border-gray-100 shadow-lg shadow-sky-100'>
        <img
          alt='Home'
          src={imageUrl}
          className='h-56 w-full rounded-md object-cover'
        />

        <div className='mt-2'>
          <dl>
            <div>
              <dt className='sr-only'>Author</dt>

              <dd className='text-sm text-gray-500 py-1'>{authorName}</dd>
            </div>

            <div>
              <dt className='sr-only'>Course Name</dt>

              <dd className='font-medium'>{courseName}</dd>
            </div>
          </dl>

          <div className='mt-3 flex flex-col sm:flex-row items-center justify-between gap-8 px-2 text-xs'>
            <div className='flex items-center gap-2'>
              <AiFillStar className='text-orange-400 text-xl' />

              <div className='mt-1.5'>
                <p className='font-medium'>
                  {reviews}
                  <span className=' text-gray-500'> ({reviewers})</span>
                </p>
              </div>
            </div>

            <Link
              to={`/courseDetail/${courseData.id}`}
              className='relative inline-block items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-blue-500 sm:mt-0'>
              <span className='absolute inset-0 w-full h-full bg-gradient-to-br from-sky-500 via-violet-600 to-blue-800'></span>
              <span className='absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-indigo-600 rounded-full opacity-30 group-hover:rotate-90 ease'></span>
              <span className='relative text-white'>View More</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;

import React from "react";
import courseDataList from "../Data/courseDataList";
import {useState} from "react";
import Card from "../components/Card";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredCourses = courseDataList.filter((course) => {
    return course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
  });

   filteredCourses = filteredCourses.sort((a, b) => {
    return parseInt(a.reviews) > parseInt(b.reviews) ? 1 : -1;
   });

  return (
    <>
      <div className='flex justify-center items-center mt-36 md:mt-24'>
        <input
          type='text'
          placeholder='Search Courses...'
          className='px-4 py-2 rounded-md border border-gray-300 mr-4 w-64 text-base'
          onChange={handleSearch}
        />
        <button className='w-28 h-10 rounded-md bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-sm font-medium text-white'>
          Search
        </button>
      </div>
      <p className='mt-4 text-gray-400 flex justify-center items-center'>
        Start your journey by searching for a course you are interested in.
      </p>
      {/* <div className='grid grid-cols-3 gap-16 mt-8 px-28 justify-items-center align-items-center'>
        {filteredCourses.map((course) => {
          return <Card courseData={course} />;
        })}
      </div> */}
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3  mt-8 px-6 sm:px-12 md:px-20 lg:px-28 justify-items-center'>
        {filteredCourses.map((course) => {
          return <Card courseData={course} />;
        })}
      </div>
    </>
  );
}

export default Search;

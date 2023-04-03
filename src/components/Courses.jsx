import React from "react";
import Carousel from "./Carousel";
function Courses() {
  return (
    <div>
      <h1 className='text-center text-5xl font-bold text-blue-600'>Courses</h1>
      <div className='max-w-screen mt-12'>
        <Carousel />
      </div>
    </div>
  );
}

export default Courses;

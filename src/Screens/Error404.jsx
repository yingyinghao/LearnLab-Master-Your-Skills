import React from "react";
import {Link} from "react-router-dom";
import Image404 from "../components/img/404.svg";

function Error404() {
  return (
    <div class='flex items-center justify-center w-screen h-[90vh] gap-20'>
      <div class='py-12'>
        <div class='gap-4 flex'>
          <div class='flex flex-col items-center justify-center py-32'>
            <h1 class='font-bold text-blue-600 text-9xl'>404</h1>
            <p class='mb-2 text-3xl font-bold text-center text-gray-800 '>
              <span class='text-red-700'>Oops!</span> Page not found
            </p>
            <p class='mb-8 text-center text-gray-600 md:text-lg'>
              The page you're looking for doesn't exist. <br />
            </p>
            <Link
              to='/'
              class='px-10 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl'>
              Go home
            </Link>
          </div>
          <div class='ml-8 flex flex-col items-center justify-center'>
            <img src={Image404} alt='img' class=' w-full h-96' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;

import React from "react";
import Loading from "./img/Atom.gif";

function Loader() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <img src={Loading} alt='loader' width={70} />
      <p className='text-xl mt-2 font-semibold text-blue-600'>Loading...</p>
    </div>
  );
}

export default Loader;

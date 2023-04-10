import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
// import icon from "../components/img/icon.png";
import {AuthContext} from "../context/AuthContext";
import {getAuth, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
// import {auth} from "../firebase";
import Logo from "../Logo_LL.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    setIsLoggedIn(currentUser ? true : false);
  }, [currentUser]);

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({type: "LOGOUT"});
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loggedInNav = (
    <nav className='bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 mb-36'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <div href='/' className='flex items-center'>
          <img src={Logo} alt='logo' className='h-14 w-26' />
        </div>
        <div className='flex md:order-2'>
          <button
            type='button'
            onClick={handleLogout}
            className='text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-3 md:mr-0'>
            Logout
          </button>

          <button
            data-collapse-toggle='navbar-sticky'
            type='button'
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            aria-controls='navbar-sticky'
            aria-expanded='false'>
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'></path>
            </svg>
          </button>
        </div>
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-sticky'>
          <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 md:bg-white'>
            <li>
              <Link>
                <div
                  className='block py-2 pl-3 pr-4 text-blue-700 bg-blue-200 rounded md:bg-transparent md:text-blue-700 md:p-0'
                  aria-current='page'>
                  Dashboard
                </div>
              </Link>
            </li>
            <li>
              <Link>
                <div className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'>
                  Search Courses
                </div>
              </Link>
            </li>
            <li>
              <Link>
                <div className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'>
                  My Account
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  const loggedOutNav = (
    <nav className='bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200 mb-36'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <div href='/' className='flex items-center'>
          <img src={Logo} alt='logo' className='h-14 w-26' />
        </div>
        <div className='flex md:order-2'>
          <Link to='/login'>
            <button
              type='button'
              className='text-blue-600 hover:text-blue-800 font-medium rounded-lg text-md py-2.5 text-center mr-3 md:mr-5'>
              Log In
            </button>
          </Link>

          <Link to='/signup'>
            <button
              type='button'
              className='text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-3 md:mr-0'>
              Sign Up
            </button>
          </Link>

          <button
            data-collapse-toggle='navbar-sticky'
            type='button'
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            aria-controls='navbar-sticky'
            aria-expanded='false'>
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'></path>
            </svg>
          </button>
        </div>
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-sticky'>
          <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 md:bg-white'>
            <li>
              <Link>
                <div
                  className='block py-2 pl-3 pr-4 text-blue-700 bg-blue-200 rounded md:bg-transparent md:text-blue-700 md:p-0'
                  aria-current='page'>
                  Home
                </div>
              </Link>
            </li>
            <li>
              <Link>
                <div className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'>
                  About
                </div>
              </Link>
            </li>
            <li>
              <Link>
                <div className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'>
                  Testimonials
                </div>
              </Link>
            </li>
            <li>
              <Link>
                <div className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0'>
                  Courses
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  return <>{isLoggedIn ? loggedInNav : loggedOutNav}</>;
}

export default Header;

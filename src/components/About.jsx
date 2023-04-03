/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
// import {Link} from "react-router-dom";
import AboutImage from "../components/img/about.png";
// import Job from "./job.png";

function About() {
  return (
    <section className='mb-10 bg-blue-500 w-screen 2xl:py-12'>
      {/* <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="svg absolute hidden lg:block"
      style="height: 560px; width: 100%; z-index: -10; overflow: hidden"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stop-color="hsl(217, 102%, 99%)" offset="0%"></stop>
          <stop stop-color="hsl(217,88%, 93%)" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient-0)"
        d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z"
      ></path>
    </svg>  */}
      <div className='px-6 py-12 lg:my-12 md:px-12 text-gray-800 text-center lg:text-left'>
        <div className='container mx-auto xl:px-32'>
          <div className='gird flex lg:grid-cols-2 gap-12 items-center'>
            <div className='mt-12 lg:mt-0'>
              <h2 className='text-5xl text-white md:text-5xl xl:text-6xl font-bold tracking-tight mb-12'>
                Achieve your goals, <br />
                <span className='text-white'>
                  exceed your expectations with us!
                </span>
              </h2>
              <p className='mt-4 text-white'>
                Our program is designed to help you achieve your goals and
                exceed your expectations. With expert guidance and a supportive
                community, you'll be equipped with the tools and skills to reach
                new heights and unleash your full potential. Let's make your
                dreams a reality.
              </p>
            </div>
            <div className='mb-12 lg:mb-0'>
              <img
                src={AboutImage}
                className='w-full rounded-lg shadow-lg'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

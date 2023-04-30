/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
// import {Link} from "react-router-dom";
import AboutImage from "../components/img/about.png";
// import Job from "./job.png";

function About() {
  return (
    <section id='about' className='mb-10 bg-blue-600 w-screen 2xl:py-12'>
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
              <p className='mt-4 text-white font-medium'>
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
                alt='about'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

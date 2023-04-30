import React from "react";
import OutcomeImage from "../components/img/outcome.png";

function Outcomes() {
  return (
    <section className='py-10 bg-white sm:py-8 lg:py-16'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12'>
          <div className='relative lg:mb-12'>
            <img
              className='absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4'
              src='https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg'
              alt='Outcome'
            />
            <div className='pl-12 pr-6'>
              <img className='relative' src={OutcomeImage} alt='' />
            </div>
            <div className='absolute left-0 pr-12 bottom-8 xl:bottom-20'>
              <div className='max-w-xs bg-blue-600 rounded-lg sm:max-w-md xl:max-w-md'>
                <div className='px-3 py-4 sm:px-5 sm:py-8'>
                  <div className='flex items-start'>
                    <p className='text-3xl sm:text-4xl'>🏆</p>
                    <blockquote className='ml-5'>
                      <p className='text-sm font-medium text-white sm:text-lg'>
                        “Learn from industry experts and gain the confidence you
                        need to tackle any challenge!”
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='2xl:pl-16'>
            <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight'>
              Gain practical knowledge, see real results.
            </h2>
            <p className='text-xl leading-relaxed text-gray-900 mt-9'>
              Our courses offer practical knowledge and expert guidance to help
              you achieve your career goals. Join the
              <span className='text-blue-600 font-bold'> 90%</span> of
              professionals who have reported career benefits such as
              promotions, skill improvements, and new job opportunities.
            </p>
            <p className='mt-6 text-xl leading-relaxed text-gray-900'>
              Start learning today and take your career to the next level!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Outcomes;

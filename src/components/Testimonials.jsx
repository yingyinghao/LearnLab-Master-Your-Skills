import React from "react";

function Testimonials() {
  return (
    <section id='testimonials'>
      <div className='container px-6 py-12 mx-auto'>
        <div className='grid items-center gap-4 xl:grid-cols-5'>
          <div className='max-w-2xl mx-auto my-8 space-y-6 text-center xl:col-span-2 xl:text-left'>
            <h2 className='text-5xl font-bold'>
              See what people <br />
              <span className='block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-sky-500 to-blue-800 lg:inline'>
                Say About Us
              </span>
            </h2>
            <p className='text-gray-700'>
              Find out what our customers have to say about their experience
              working with us. They are firsthand accounts of how our courses
              have positively impacted our customers and their businesses.
            </p>
          </div>
          <div className='p-6 xl:col-span-3'>
            <div className='grid gap-8 md:grid-cols-2'>
              <div className='grid content-center gap-8'>
                <div className='p-6 rounded-lg shadow-lg'>
                  <p className='mb-12'>
                    The accounting certification I earned boosted my credibility
                    and opened doors for me to work with high-profile clients.
                    As a result, my income increased significantly.
                  </p>
                  <div className='flex items-center mt-4 space-x-4'>
                    <img
                      src={"https://source.unsplash.com/50x50/?portrait?1"}
                      alt=''
                      className='w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500'
                    />
                    <div>
                      <p className='text-lg font-semibold text-gray-600'>
                        Leroy Jenkins
                      </p>
                      <p className='text-sm font-medium text-gray-400'>
                        CTO of Company Co.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='p-6 rounded-lg shadow-lg'>
                  <p className='mb-12'>
                    As a data analyst, I use the skills I learned in the course
                    to turn complex data into meaningful insights that inform
                    strategic decision-making for the company. Thanks to the
                    practical projects and real-world examples covered in the
                    course, I feel confident in my ability to tackle any data
                    analysis challenge that comes my way.
                  </p>
                  <div className='flex items-center mt-4 space-x-4'>
                    <img
                      src={"https://source.unsplash.com/50x50/?portrait?2"}
                      alt=''
                      className='w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500'
                    />
                    <div>
                      <p className='text-lg font-semibold text-gray-600'>
                        Leroy Jenkins
                      </p>
                      <p className='text-sm font-medium text-gray-400'>
                        CTO of Company Co.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid content-center gap-8'>
                <div className='p-6 rounded-lg shadow-lg '>
                  <p className='mb-12'>
                    After obtaining a certification in cybersecurity, I was able
                    to land a job as a security analyst at a large technology
                    company. Thanks to the knowledge and skills I gained from
                    the certification program, I was able to quickly adapt to
                    the company's security protocols and make valuable
                    contributions to the team.
                  </p>
                  <div className='flex items-center mt-4 space-x-4'>
                    <img
                      src={"https://source.unsplash.com/50x50/?portrait?3"}
                      alt=''
                      className='w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500'
                    />
                    <div>
                      <p className='text-lg font-semibold text-gray-600'>
                        Leroy Jenkins
                      </p>
                      <p className='text-sm font-medium text-gray-400'>
                        CTO of Company Co.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='p-6 rounded-lg shadow-lg '>
                  <p className='mb-12'>
                    Thanks to the online course I took on digital marketing, I
                    was able to land a job as a social media manager at a top
                    advertising agency. The skills I learned in the course
                    helped me to develop effective social media strategies and
                    grow the agency's clients' online presence.
                  </p>
                  <div className='flex items-center mt-4 space-x-4'>
                    <img
                      src={"https://source.unsplash.com/50x50/?portrait?4"}
                      alt=''
                      className='w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500'
                    />
                    <div>
                      <p className='text-lg font-semibold text-gray-600'>
                        Leroy Jenkins
                      </p>
                      <p className='text-sm font-medium text-gray-400'>
                        CTO of Company Co.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

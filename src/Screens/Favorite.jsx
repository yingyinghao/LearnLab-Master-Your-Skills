import React, {useState, useEffect} from "react";
import courseDataList from "../Data/courseDataList";
import Card from "../components/Card";

// if the course reviews is less than 700, it will not be showed in this page.

const getAverageReview = (courseDataList) => {
  let totalReviews = 0;
  let numCourses = courseDataList.length;

  for (let course of courseDataList) {
    totalReviews += parseFloat(course.reviews);
  }

  let averageReview = totalReviews / numCourses;
  return averageReview.toFixed(2);
};

function recalculateAndSortCourses(courses) {
  courses.forEach((course) => {
    const reviews = parseFloat(course.reviews);
    const reviewers = parseInt(course.reviewers, 10);
    const averageReview = getAverageReview(courseDataList);
    // renewScorce = reviewers/(reviewers+700)*reviews + 700/(700+reviewers)*averageReview
    course.score =
      (reviewers / (reviewers + 600)) * reviews +
      (600 / (reviewers + 600)) * averageReview;
  });

  courses.sort((a, b) => b.score - a.score);
  return courses;
}

function FavoriteCourses() {
  const [courses, setCourses] = useState([]);
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    setCourses(courseDataList);
  }, []);

  const sortedCourses = recalculateAndSortCourses(courses);
  const topCourses = sortedCourses
    .filter((course) => parseInt(course.reviewers, 10) >= 700)
    .slice(0, displayCount);

  const eligibleCourseCount = sortedCourses.filter(
    (course) => parseInt(course.reviewers, 10) >= 700
  ).length;

  const handleCountChange = (e) => {
    setDisplayCount(parseInt(e.target.value, 10));
  };

  return (
    <div className='mt-36 md:mt-24'>
      <div className='flex justify-center items-center mb-4 bg-blue-600 text-white p-4 w-72 md:w-96 mx-auto rounded-md'>
        <div className='font-bold'>Favorite Courses</div>
        <div className='font-bold mx-4 text-2xl'>|</div>
        <div>
          <label htmlFor='courseCount' className='mr-2 font-medium'>
            Show top:
          </label>
          <select
            name='courseCount'
            id='courseCount'
            value={displayCount}
            onChange={handleCountChange}
            className='bg-blue-600 border font-medium rounded-md px-2 py-1'>
            {Array.from({length: eligibleCourseCount}, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className='w-full md:w-1/2 mt-4 mb-6 mx-auto text-center text-gray-600'>
        Here are the most popular courses, based on the combination of course
        scores and the total number of participants. We hope this helps you with
        your course selection.
      </p>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8 px-6 sm:px-12 md:px-20 lg:px-28 justify-items-center'>
        {topCourses.map((course) => {
          return <Card key={course.id} courseData={course} />;
        })}
      </div>
    </div>
  );
}

export default FavoriteCourses;

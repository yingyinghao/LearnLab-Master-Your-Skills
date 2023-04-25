import React, { useState, useEffect } from "react";
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
      (reviewers / (reviewers + 600)) * reviews + (600 / (reviewers + 600)) * averageReview;
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
    <div className="mt-24">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          backgroundColor: "#4169E1",
          color: "#fff",
          padding: "10px 20px",
          maxWidth: "25%",
          margin: "0 auto",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            marginRight: "20px",
          }}
        >
          Favorite Courses
        </h1>
        <div>
          <label htmlFor="courseCount" style={{ marginRight: "8px" }}>
            Show top:
          </label>
          <select
            name="courseCount"
            id="courseCount"
            value={displayCount}
            onChange={handleCountChange}
            style={{
              backgroundColor: "#4169E1",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              padding: "4px 8px",
            }}
          >
            {Array.from({ length: eligibleCourseCount }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p
        style={{
          width: "50%",
          margin: "0 auto",
          color: "#666",
        }}
        className="text-center"
      >
        Here are the most popular courses, based on the combination of course scores and the total number of
        participants. We hope this helps you with your course selection.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {topCourses.map((course, index) => (
          <div key={index} style={{ flex: 1, margin: "0 8px" }}>
            <Card courseData={course} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCourses;

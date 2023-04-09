import courseDataList from "../Data/courseDataList";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Card from "../components/Card";

const db = getFirestore();

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
// Sort courses by reviews and reviewers
// renewScorce = reviewers/(reviewers+600)*reviews + 600/(600+reviewers)*averageReview
    const reviews = parseFloat(course.reviews);
    const reviewers = parseInt(course.reviewers, 10);
    const averageReview = getAverageReview(courseDataList);
    course.score =
      (reviewers / (reviewers + 600)) * reviews + (600 / (reviewers + 600)) * averageReview;
  });

  courses.sort((a, b) => b.score - a.score);
  return courses;
}

function FavoriteCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesData = coursesSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setCourses(coursesData);
    };

    getCourses();
}, []);

  const sortedCourses = recalculateAndSortCourses(courses);
  const topThreeCourses = sortedCourses.slice(0, 3);

  return (
    <div className="mt-24">
      <h1>Favorite Courses</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {topThreeCourses.map((course, index) => (
          <div key={index} style={{ flex: 1, margin: "0 8px" }}>
            <Card courseData={course} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCourses;

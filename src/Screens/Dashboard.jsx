import React, {useState, useEffect} from "react";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import Card from "../components/Card";

const db = getFirestore();

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesData = coursesSnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()};
      });
      setCourses(coursesData);
    };

    getCourses();
  }, []);

  return (
    <div className='mt-24'>
      <h1>Dashboard</h1>
      {courses.map((courseData, index) => (
        <div key={index}>
          <Card courseData={courseData} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

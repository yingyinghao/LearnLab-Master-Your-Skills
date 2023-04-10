import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, where, query, updateDoc} from "firebase/firestore";
import Card from "../components/Card";

const db = getFirestore();

const Favorite = () => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  useEffect(() => {
    const getFavoriteCourses = async () => {
      const favoriteCoursesQuery = query(collection(db, "courses"), where("addedToFavorite", "==", true));
      const favoriteCoursesSnapshot = await getDocs(favoriteCoursesQuery);
      const favoriteCoursesData = favoriteCoursesSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setFavoriteCourses(favoriteCoursesData);
    };

    getFavoriteCourses();
  }, []);

  return (
    <div className="mt-24">
      <h1>My Favorite</h1>
      {favoriteCourses.length ? (
        favoriteCourses.map((courseData, index) => (
          <div key={index}>
            <Card courseData={courseData} />
          </div>
        ))
      ) : (
        <p>No favorite courses</p>
      )}
    </div>
  );
};

export default Favorite;

import React from "react";
import courseDataList from "../Data/courseDataList";
import { useState } from "react";
import Card from "../components/Card";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courseDataList.filter((course) => {
    return course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <p style={{ marginTop: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        Start your journey by searching for a course you are interested in.
      </p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
            width: "200px",
            fontSize: "16px",
          }}
          onChange={handleSearch}
        />

        <button
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-20 py-3 text-sm font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring active:text-blue-500"
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#ADD8E6", // light blue color
            color: "white",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease", // add transition effect
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#007AFF")} // change background color on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ADD8E6")} // revert background color when hover is off
        >
          Search
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredCourses.map((course) => {
          return (
            <Card courseData={course} />
          );
        })}
      </div>
    </>
  );
}


export default Search;
import React, { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "HTML",
    "CSS",
    "MongoDB",
    "Express",
  ]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Search</h1>
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
            width: "200px",
            fontSize: "16px",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#008CBA",
            color: "white",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      <br />
      <card>
        <h3>Courses: </h3>
        {filteredCourses.map((course, index) => (
          <div key={index}>{course}</div>
        ))}
      </card>
    </>
  );
}

export default Search;

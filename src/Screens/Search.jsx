import React from "react";
import courseDataList from "../Data/courseDataList";
import { useState } from "react";

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
  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-20 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
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
  onMouseEnter={(e) => e.target.style.backgroundColor = "#007AFF"} // change background color on hover
  onMouseLeave={(e) => e.target.style.backgroundColor = "#ADD8E6"} // revert background color when hover is off
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
            <div key={course.id} style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "5px", overflow: "hidden", backgroundColor: "#fff" }}>
              <img src={course.imageUrl} alt={course.courseName} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 10px" }}>{course.courseName}</h3>

              <div style={{marginBottom: 0}}>
                <p style={{ margin: "0" }}>By {course.authorName}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ margin: "0" }}>Reviews: {course.reviews}</p>
                  <p style={{ margin: "0" }}>Reviewers: {course.reviewers}</p>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </>
  );
}

export default Search;

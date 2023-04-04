import React from "react";

function Search() {
  return (
    <>
      <h1>Search</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, quod, quia, quae quas voluptatibus voluptatem quibusdam
        voluptatum quidem quos nemo. Quisquam, quae. Quisquam, quae. Quisquam,
        quae. Quisquam, quae.
      </p>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px"
      }}>
        <input
          type="text"
          placeholder="Search"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
            width: "200px",
            fontSize: "16px"
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
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default Search;

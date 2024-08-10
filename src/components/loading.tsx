import React from "react";
import "../TriangleLoader.css"; // Import the CSS file

const TriangleLoader = () => {
  return (
    <div className="loader-container">
      <div className="triangle"></div>
      <h4>Loading</h4>
    </div>
  );
};

export default TriangleLoader;

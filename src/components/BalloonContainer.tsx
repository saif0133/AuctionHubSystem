import React, { useEffect } from "react";
import "./BalloonContainer.css"

const BalloonContainer = () => {
  // Utility function to get a random number
  const random = (num: number): number => Math.floor(Math.random() * num);

  // Function to get random styles for each balloon
  const getRandomStyles = () => {
    const r = random(255);
    const g = random(255);
    const b = random(255);
    const mt = random(200); // Random margin-top
    const ml = random(50); // Random margin-left
    const dur = random(5) + 5; // Random animation duration between 5 and 10 seconds
    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.7)`,
      color: `rgba(${r}, ${g}, ${b}, 0.7)`,
      boxShadow: `inset -7px -3px 10px rgba(${r - 10}, ${g - 10}, ${b - 10}, 0.7)`,
      margin: `${mt}px 0 0 ${ml}px`,
      animation: `float ${dur}s ease-in infinite`,
    };
  };

  // Function to create balloons on component load
  const createBalloons = () => {
    const balloons = Array.from({ length: 30 }, (_, i) => (
      <div key={i} className="balloon" style={getRandomStyles()} />
    ));
    return balloons;
  };

  // Handle component unmount by fading out balloons
 // Function to handle balloon removal safely
const handleRemoveBalloons = () => {
    const balloonContainer = document.getElementById("balloon-container");
    if (balloonContainer) { // Check if balloonContainer exists
      balloonContainer.style.opacity = "0";
      setTimeout(() => {
        balloonContainer.remove();
      }, 500);
    }
  };
  

  // Add click event on load to trigger balloon removal
  useEffect(() => {
    window.addEventListener("click", handleRemoveBalloons);
    return () => window.removeEventListener("click", handleRemoveBalloons);
  }, []);

  return (
    <div id="balloon-container" style={{ opacity: 1 }}>
      {createBalloons()}
    </div>
  );
};

export default BalloonContainer;

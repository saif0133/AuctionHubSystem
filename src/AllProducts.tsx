import React, { useState, useEffect } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ListGroup from "./components/ListGroup";
import "./script";

function AllProducts() {
  const [fromValue, setFromValue] = useState(10);
  const [toValue, setToValue] = useState(1000);

  const items = [{ text: "Home", icon: faHome, link: "/" }];
  const logo = "https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png";

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < toValue) {
      setFromValue(value);
    }
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > fromValue) {
      setToValue(value);
    }
  };

  // Function to update the slider background
  const updateSliderBackground = () => {
    const rangeDistance = 1000 - 10; // Adjust based on your slider range
    const fromPosition = ((fromValue - 10) / rangeDistance) * 100;
    const toPosition = ((toValue - 10) / rangeDistance) * 100;

    const sliders = document.querySelectorAll<HTMLInputElement>(
      '.sliders_control input[type="range"]'
    );

    sliders.forEach((slider) => {
      slider.style.background = `linear-gradient(
        to right,
        #C6C6C6 ${fromPosition}%,
        #740000 ${fromPosition}%,
        #740000 ${toPosition}%,
        #C6C6C6 ${toPosition}%
      )`;
    });
  };

  // Update slider background whenever the values change
  useEffect(() => {
    updateSliderBackground();
  }, [fromValue, toValue]);

  return (
    <div className="menu">
      <ListGroup items={items} logo={logo} />

      <div className="logo-container">
        <div className="logo-spacer"></div>
      </div>

      <div className="filter">Filter</div>
      <div className="range_container list-group-item">
        <div className="sliders_control">
          <input
            id="fromSlider"
            type="range"
            value={fromValue}
            min="10"
            max="1000"
            step={10}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= toValue) {
                setFromValue(value);
              }
            }}
          />
          <input
            id="toSlider"
            type="range"
            value={toValue}
            min="10"
            max="1000"
            step={10}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= fromValue) {
                setToValue(value);
              }
            }}
          />
        </div>
        <div className="form_control">
          <div className="form_control_container">
            <div className="form_control_container__time">Min</div>
            <input
              className="form_control_container__time__input"
              type="number"
              id="fromInput"
              value={fromValue}
              min="10"
              max={toValue - 10}
              onChange={handleFromInputChange}
            />
          </div>
          <div className="form_control_container">
            <div className="form_control_container__time">Max</div>
            <input
              className="form_control_container__time__input"
              type="number"
              id="toInput"
              value={toValue}
              min={fromValue + 10}
              max="1000"
              onChange={handleToInputChange}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <p>
          <a href="legal.html">Legal</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <a href="privacy.html">Privacy Policy</a>
        </p>
        <p>© 2024 Auction Hub. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default AllProducts;

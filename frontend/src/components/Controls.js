import React, { useState } from "react";
import "../styles/Controls.css";

const Controls = ({
  height,
  radius,
  segments,
  isSmooth,
  setHeight,
  setRadius,
  setSegments,
  setIsSmooth,
}) => {
  const [show, setShow] = useState(true);

  const checkInput = (str, upper) => {
    if (str.length === 0 || (str.length === 1 && (str === "." || str === ",")))
      return true;
    else if (!isNaN(str) && Number(str) < upper && Number(str) > 0) return true;
  };

  const handleHeightChange = (e) => {
    if (checkInput(e.target.value, 10)) setHeight(e.target.value);
  };

  const handleRadiusChange = (e) => {
    if (checkInput(e.target.value, 10)) setRadius(e.target.value);
  };

  const handleSegmentsChange = (e) => {
    if (e.target.value.length === 0) setSegments(e.target.value);
    else if (!isNaN(e.target.value)) {
      const newSegments = Math.floor(Number(e.target.value));
      if (newSegments > 0 && newSegments <= 250) setSegments(newSegments);
    }
  };

  return (
    <div className={`controls${!show ? " hidden" : ""}`}>
      <form>
        <p>
          <label htmlFor="height">Height: </label>
          <input
            type="text"
            name="height"
            id="height"
            value={height}
            onChange={handleHeightChange}
          />
        </p>
        <p>
          <label htmlFor="radius">Radius: </label>
          <input
            type="text"
            name="radius"
            id="radius"
            value={radius}
            onChange={handleRadiusChange}
          />
        </p>
        <p>
          <label htmlFor="segments">Segments: </label>
          <input
            type="text"
            name="segments"
            id="segments"
            value={segments}
            onChange={handleSegmentsChange}
          />
        </p>
        <p>
          <label htmlFor="smooth">Smooth: </label>
          <input
            type="checkbox"
            name="smooth"
            id="smooth"
            value={isSmooth}
            onChange={() => setIsSmooth(!isSmooth)}
          />
        </p>
      </form>
      <div className="arrow" onClick={() => setShow(!show)}>
        {show ? (
          <i className="fas fa-chevron-right fa-2x"></i>
        ) : (
          <i className="fas fa-chevron-left fa-2x"></i>
        )}
      </div>
    </div>
  );
};

export default Controls;

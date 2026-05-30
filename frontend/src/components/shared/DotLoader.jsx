import React from "react";
import "./DotLoader.css";

const DotLoader = ({ color = "currentColor", size = 6 }) => {
  return (
    <div className="dot-loader-container">
      <div
        className="dot-loader-dot"
        style={{ backgroundColor: color, width: size, height: size }}
      />

      <div
        className="dot-loader-dot"
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          animationDelay: "0.15s",
        }}
      />

      <div
        className="dot-loader-dot"
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          animationDelay: "0.3s",
        }}
      />
    </div>
  );
};

export default DotLoader;

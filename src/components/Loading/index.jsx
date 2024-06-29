import React from "react";
import "./LoadingStyle.css"
const Loading = () => {
  return (
    <div className="text-center no-data h-100 mb-0">
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default Loading;

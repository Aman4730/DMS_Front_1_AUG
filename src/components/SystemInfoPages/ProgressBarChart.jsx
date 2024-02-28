import { Card, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./style.css";

const ProgressBar = ({
  label,
  initialPercentage,
  isUser,
  used_quota,
  total,
  free,
}) => {
  const colorMap = {
    WS1: "#3498DB",
    fs2: "#3498DB",
    // amce_rest: "#48C9B0",
    ram: "#3498DB",
  };

  const [percentage, setPercentage] = useState(0);

  const barColor = isUser ? "#48C9B0" : "#3498DB";
  const calculatedPercentage = ((total - free) / total) * 100;
  const roundedPercentage = calculatedPercentage.toFixed(2); // Rounding to 2 decimal places

  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (percentage < initialPercentage) {
        setPercentage((prevPercentage) =>
          Math.min(prevPercentage + 1, initialPercentage)
        );
      }
    }, 1); // Adjust the interval duration as needed

    return () => clearInterval(animationInterval);
  }, [initialPercentage]);
  const progress = roundedPercentage;

  const progressBarStyle = {
    width: progress + "%",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </div>
        <div
          style={{
            flex: 1,
            height: "13px",
            background: "white",
            borderRadius: "2rem",
            width: "50%",
          }}
        >
          <div className="progress-bar">
            <div
              className="progress-bar--gradient"
              style={{
                background: `linear-gradient(to right, ${barColor} 80%, #F39C12 80%, #CB4335 90%)`,
              }}
            >
              <div className="progress-bar--progress" style={progressBarStyle}>
                <span className="progress-bar--progress-value"></span>
              </div>
              <div className="progress-bar--not-progress"></div>
            </div>
          </div>
        </div>
        <div
          style={{ marginLeft: "10px", width: "40px" }}
        >{`${roundedPercentage}%`}</div>
      </div>
    </>
  );
};

const ProgressBarchat = ({ system_Info }) => {
  return (
    <Card
      sx={{
        ml: 2,
        mr: 2,
        overflowY: "auto", // Enable vertical scrolling
        maxHeight: "180px", // Set a maximum height for the card
      }}
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h6>Disk Storage</h6>
      <Grid container>
        {system_Info?.driveDetails?.map((data, index) => (
          <Grid item xs={12} key={index}>
            <ProgressBar
              label={data.drive}
              total={data.total}
              free={data.free}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ProgressBarchat;

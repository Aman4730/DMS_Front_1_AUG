import "./style.css";
import React from "react";
import { Card, Grid } from "@mui/material";

const ProgressBar = ({ label, initialPercentage, isUser, used_quota }) => {
  const barColor = isUser ? "#48C9B0" : "#3498DB";
  const calculatedPercentage = (used_quota / initialPercentage) * 100;
  const roundedPercentage = calculatedPercentage.toFixed(2);
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
            width: "150px",
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
          style={{ marginLeft: "10px", width: "50px", marginRight: "10px" }}
        >{`${roundedPercentage}%`}</div>
      </div>
    </>
  );
};

const ProgressBarchat = ({ quotadetail, userquota }) => {
  return (
    <Card
      sx={{
        ml: 2,
        mr: 2,
        mb: 1,
        overflowY: "hidden",
        maxHeight: "184px",
        fontFamily: "Arial, sans-serif",
        padding: "15px 0px 15px 15px",
        borderRadius: "10px",
      }}
    >
      <h6>Storage Quota</h6>
      <div
        style={{
          maxHeight: "150px",
          overflowY: "auto",
          paddingBottom: "15px",
        }}
      >
        <Grid container>
          {quotadetail.map((data, index) => (
            <Grid item xs={12} key={index}>
              <ProgressBar
                label={data.workspace_name}
                initialPercentage={data.workspace_quota}
                used_quota={data.used_quota}
                isUser={false}
              />
            </Grid>
          ))}
          {userquota.map((data, index) => (
            <Grid item xs={12} key={index}>
              <ProgressBar
                label={data.user_email}
                initialPercentage={data.max_quota}
                used_quota={data.used_quota}
                isUser={true}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Card>
  );
};

export default ProgressBarchat;

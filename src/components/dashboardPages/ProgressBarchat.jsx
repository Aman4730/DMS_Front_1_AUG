import "./style.css";
import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import Icon from "../icon/Icon";

const ProgressBar = ({
  label,
  initialPercentage,
  isUser,
  used_quota,
  icon,
  style,
}) => {
  const barColor = isUser ? "#48C9B0" : "#3498DB";
  const calculatedPercentage = (used_quota / initialPercentage) * 100;
  const roundedPercentage = calculatedPercentage.toFixed(2);
  const progress = roundedPercentage;

  function formatSizeInGB(sizeInBytes) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2);
  }

  function formatSizeWithLabel(sizeInBytes) {
    return formatSizeInGB(sizeInBytes) + " GB";
  }

  const formattedSize = formatSizeWithLabel(initialPercentage);
  const userQuotaInGB = formatSizeInGB(used_quota);

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
            width: "225px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Icon name={icon} style={style}></Icon>
          <abbr
            title={`${userQuotaInGB} / ${formattedSize}`}
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            {label}
          </abbr>
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
    <Grid item xs={12} container spacing={1}>
      <Grid item lg={12} sm={12} xs={12}>
        <Card
          sx={{
            overflowY: "hidden",
            fontFamily: "Arial, sans-serif",
            padding: "15px 0px 15px 15px",
            borderRadius: "7px",
          }}
        >
          <h6>Storage Quota</h6>
          <div
            style={{
              maxHeight: "25vh",
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
                    icon="folder-fill"
                    style={{ marginRight: "2px", color: "#F4D03F" }}
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
                    icon="user-fill"
                    style={{ marginRight: "2px", color: "#117A65" }}
                  />
                </Grid>
              ))}
            </Grid>
            {!quotadetail.length && !userquota.length ? (
              <Typography>No storage available</Typography>
            ) : null}
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProgressBarchat;

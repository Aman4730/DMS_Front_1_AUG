import "./style.css";
import React from "react";
import { Card, Stack, Grid } from "@mui/material";

const CustomCards = ({ counts }) => {
  let arr = [
    {
      data: "Custom Card",
      color: "#5984ED",
      name: "Worksapce",
      icon: "ni ni-google-wallet",
      counts: counts.workspaceCount,
    },
    {
      data: "Custom Card",
      color: "#4BCD93",
      name: "Teamspace",
      icon: "ni ni-share-fill",
      counts: counts.TeamSpace,
    },
    {
      data: "Custom Card",
      color: "#AF7AC5",
      name: "Dataroom",
      icon: "ni ni-slack",
      counts: counts.dataRoom,
    },
    {
      data: "Custom Card",
      color: "#E66794",
      name: "Folders",
      icon: "ni ni-folders-fill",
      counts: counts.folders,
    },
    {
      data: "Custom Card",
      color: "#4CBACE",
      name: "Files",
      icon: "ni ni-file-text-fill",
      counts: counts.files,
    },
    {
      data: "Custom Card",
      color: "#F4AD15",
      name: "Approvals",
      icon: "ni ni-user-check-fill",
      counts: counts.approvals,
    },
  ];

  return (
    <Grid item xs={12} container spacing={1}>
      {arr.map((data) => (
        <Grid item lg={2} sm={4} xs={6} key={data.name}>
          <Card className="customCard">
            <Stack
              direction="row"
              alignItems="center"
              sx={{ textAlign: "left" }}
            >
              <div
                className="verticleLine"
                style={{
                  border: `4px solid ${data.color}`,
                  height: "65px",
                }}
              ></div>
              <h4 style={{ margin: "5px 0px 0px 16px" }}>{data.counts || 0}</h4>
              <h6 style={{ margin: "5px 0px 0px 16px" }}>{data.name}</h6>
            </Stack>
            <i
              className={data.icon}
              style={{
                padding: "20px 5px 0px 0px",
                fontSize: "33px",
                color: "lightgrey",
              }}
            ></i>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomCards;

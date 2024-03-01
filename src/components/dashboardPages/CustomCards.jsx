import "./style.css";
import React from "react";
import { Card, Stack } from "@mui/material";

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
    <>
      <Stack
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "left",
          flexWrap: "wrap",
        }}
        sx={{ pl: 1 }}
      >
        {arr.map((data) => (
          <Card
            key={data.name}
            sx={{
              mb: 1,
              ml: 1,
              width: "100%",
              maxWidth: "19%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              overflow: "hidden",
              flexDirection: !data.column ? "row" : "column",
              textAlign: "left",
              "@media screen and (max-width: 1200px)": {
                maxWidth: "30%",
              },
              "@media screen and (max-width: 768px)": {
                maxWidth: "45%",
              },
            }}
          >
            <Stack
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                textAlign: "left",
              }}
            >
              <div
                className="verticleLine"
                style={{
                  border: `4px solid ${data.color}`,
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
        ))}
      </Stack>
    </>
  );
};

export default CustomCards;

import "./SystemInfoCustomCard.css";
import React from "react";
import { Button, Card, Stack } from "@mui/material";

const SystemInfoCustomCard = ({
  system_Info,
  addStopService,
  addStartService,
  addRestartService,
}) => {
  let mongodb = system_Info.mongodbService;
  let postgresql = system_Info.postgresService;
  let nginx = system_Info.nginxService;
  let mongodbstatus = mongodb?.split(" ")[0];
  let postgresqlstatus = postgresql?.split(" ")[0];
  let nginxstatus = nginx?.split(" ")[0];
  let arr = [
    {
      data: "Custom Card",
      color: mongodbstatus === "active" ? "#4BCD93" : "#E66794",
      name: "Mongo DB",
      icon: "ni ni-server",
      start: "true",
      stop: "true",
      counts: system_Info.mongodbService,
    },
    {
      data: "Custom Card",
      color: postgresqlstatus === "active" ? "#4BCD93" : "#E66794",
      name: "Postgresql",
      icon: "ni ni-share-fill",
      start: "true",
      stop: "true",
      counts: system_Info.postgresService,
    },
    {
      data: "Custom Card",
      color: nginxstatus === "active" ? "#4BCD93" : "#E66794",
      name: "Nginx",
      icon: "ni ni-slack",
      counts: system_Info.nginxService,
    },
    {
      data: "Custom Card",
      style: { marginTop: "22px" },
      color:
        system_Info?.pm2Service?.status === "online" ? "#4BCD93" : "#E66794",
      name: "PM2",
      icon: "ni ni-folders-fill",
      counts: `${system_Info?.pm2Service?.name || "Dms_Backend"} , ${"Mem:"} ${
        system_Info?.pm2Service?.mem || 0
      } , ${"CPU:"} ${system_Info?.pm2Service?.cpu || 0}`,
    },
  ];

  return (
    <React.Fragment>
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "left",
          flexWrap: "wrap",
        }}
        sx={{ p: 1, ml: 2, mr: 2 }}
      >
        <h6 style={{ width: "100%" }}>Services</h6>
        {arr.map((data) => (
          <Card
            key={data.name}
            sx={{
              ml: 1,
              width: "100%",
              maxWidth: "24%",
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
                maxWidth: "47.5%",
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
                  height: "105px",
                }}
              ></div>
              <div style={{ paddingLeft: "5px" }}>
                <h6>{data.name}</h6>
                <p style={{ margin: "-5px 0px -5px 0px" }}>{data.counts}</p>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{ mr: 1 }}
                    id="systemInfoBtn"
                    style={data.style}
                    onClick={() => addRestartService(data.name)}
                  >
                    Restart
                  </Button>
                  {data.start && (
                    <Button
                      sx={{ mr: 1 }}
                      id="systemInfoBtn"
                      onClick={() => addStartService(data.name)}
                    >
                      Start
                    </Button>
                  )}
                  {data.stop && (
                    <Button
                      id="systemInfoBtn"
                      onClick={() => addStopService(data.name)}
                    >
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            </Stack>
          </Card>
        ))}
      </Card>
    </React.Fragment>
  );
};

export default SystemInfoCustomCard;

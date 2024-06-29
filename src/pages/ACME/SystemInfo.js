import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Grid, LinearProgress, Stack } from "@mui/material";
import Head from "../../layout/head/Head";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import ProgressBar from "../../components/SystemInfoPages/ProgressBar";
import SystemInfoCustomCard from "../../components/SystemInfoCustomCard";
import ProgressBarchat from "../../components/SystemInfoPages/ProgressBarChart";
import SystemLineChart from "../../components/SystemInfoPages/SystemLineChart";
import { notification } from "antd";
const SystemInfo = () => {
  const { getSystemInfo } = useContext(UserContext);
  const [system_Info, setSystem_Info] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getsystemInfo();
  }, []);
  const getsystemInfo = () => {
    getSystemInfo(
      {},
      (apiRes) => {
        setSystem_Info(apiRes.data);
        setLoading(true);
      },
      (apiErr) => {}
    );
  };
  const addRestartService = async (addRestartService) => {
    try {
      const queryObject = {
        postgres: addRestartService === "Postgresql",
        mongo: addRestartService === "Mongo DB",
        nginx: addRestartService === "Nginx",
        pm2: addRestartService === "PM2",
      };

      const queryString = Object.entries(queryObject)
        .filter(([key, value]) => value)
        .map(([key]) => `${key}=true`)
        .join("&");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/restartService?${queryString}`,
        {}
      );
      if (response.data.status == true) {
        notification["success"]({
          placement: "top",
          description: "",
          message: `${response.data.service} ,${response.data.message}`,
          style: {
            height: 75,
          },
        });
        getsystemInfo();
      }
    } catch (error) {
      notification["success"]({
        placement: "top",
        description: "",
        message: error?.message,
        style: {
          height: 60,
        },
      });
    }
  };
  const addStopService = async (addStopService) => {
    try {
      const queryObject = {
        postgres: addStopService === "Postgresql",
        mongo: addStopService === "Mongo DB",
        nginx: addStopService === "Nginx",
      };

      const queryString = Object.entries(queryObject)
        .filter(([key, value]) => value)
        .map(([key]) => `${key}=true`)
        .join("&");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/stopService?${queryString}`,
        {}
      );
      if (response.data.status == true) {
        notification["success"]({
          placement: "top",
          description: "",
          message: `${response.data.service} ,${response.data.message}`,
          style: {
            height: 75,
          },
        });
        getsystemInfo();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addStartService = async (addStartService) => {
    try {
      const queryObject = {
        postgres: addStartService === "Postgresql",
        mongo: addStartService === "Mongo DB",
        nginx: addStartService === "Nginx",
        pm2: addStartService === "PM2",
      };

      const queryString = Object.entries(queryObject)
        .filter(([key, value]) => value)
        .map(([key]) => `${key}=true`)
        .join("&");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/startService?${queryString}`,
        {}
      );
      if (response.data.status == true) {
        notification["success"]({
          placement: "top",
          description: "",
          message: `${response.data.service} ,${response.data.message}`,
          style: {
            height: 75,
          },
        });
        getsystemInfo();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      notification["success"]({
        placement: "top",
        description: "",
        message: error.response.data.message,
        style: {
          height: 75,
        },
      });
    }
  };
  return (
    <React.Fragment>
      <Head title="SystemInfo - Regular"></Head>
      <Stack style={{ marginTop: "78px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 2 }}>
          {loading === true ? (
            ""
          ) : (
            <LinearProgress
              color="primary"
              sx={{
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "rgb(121, 139, 255)",
                  width: "400px",
                  animationDuration: "3000ms",
                },
              }}
              style={{
                width: "100%",
                position: "absolute",
                zIndex: 100,
                left: 0,
                backgroundColor: "lightgray",
              }}
            />
          )}
          <Grid item xs={12} md={12}>
            <SystemInfoCustomCard
              system_Info={system_Info}
              addStopService={addStopService}
              addStartService={addStartService}
              addRestartService={addRestartService}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <ProgressBar system_Info={system_Info} />
          </Grid>
          <Grid item xs={12} md={12}>
            <ProgressBarchat system_Info={system_Info} />
          </Grid>
          <Grid item xs={12} md={12}>
            <SystemLineChart system_Info={system_Info} />
          </Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
};

export default SystemInfo;

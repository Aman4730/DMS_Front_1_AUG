import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Grid, LinearProgress, Stack } from "@mui/material";
import Head from "../../layout/head/Head";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import ProgressBar from "../../components/SystemInfoPages/ProgressBar";
import ProgressBarchat from "../../components/SystemInfoPages/ProgressBarChart";
import SystemLineChart from "../../components/SystemInfoPages/SystemLineChart";
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

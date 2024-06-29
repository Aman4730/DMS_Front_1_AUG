import React, { useContext, useEffect, useState } from "react";
import Head from "../../layout/head/Head";
import { Grid, Stack } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import CustomCards from "../../components/dashboardPages/CustomCards";
import DataGridCard from "../../components/dashboardPages/DataGridCard";
import ProgressBarchat from "../../components/dashboardPages/ProgressBarchat";
import Piedoughnutchart from "../../components/dashboardPages/Piedoughnutchart";

const Dashboard = () => {
  // Destructure useContext variables
  const {
    getquotadetails,
    getCountworkspace,
    getcountextension,
    getlatestfolderfiles,
  } = useContext(UserContext);
  const [counts, setCounts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [userquota, setUserquota] = useState([]);
  const [extension, setExtension] = useState({});
  const [quotadetail, setQuotadetail] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    getworkspace();
    getExtension();
    getFolderFile();
    getQuotadetails();
    return () => {
      abortController.abort();
    };
  }, []);
  //Card Data
  const getworkspace = () => {
    getCountworkspace(
      {},
      (apiRes) => {
        setCounts(apiRes.data);
      },
      (apiErr) => {}
    );
  };
  //dashboard table
  const getFolderFile = () => {
    getlatestfolderfiles(
      {},
      (apiRes) => {
        const { latestFiles, latestFolders } = apiRes.data;
        const combinedData = [...(latestFiles || []), ...(latestFolders || [])];
        setTableData(combinedData);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  //storage Quota
  const getQuotadetails = () => {
    getquotadetails(
      {},
      (apiRes) => {
        setUserquota(apiRes.data.user_list);
        setQuotadetail(apiRes.data.workspaces);
      },
      (apiErr) => {}
    );
  };
  //Total Extension Data
  const getExtension = () => {
    getcountextension(
      {},
      (apiRes) => {
        setExtension(apiRes.data);
      },
      (apiErr) => {}
    );
  };
  return (
    <React.Fragment>
      <Head title="Dashboard - Regular" />
      <Stack style={{ marginTop: "70px" }}>
        <Grid container spacing={1} p={1}>
          <Grid item lg={12} sm={12} xs={12}>
            <CustomCards counts={counts} />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <ProgressBarchat quotadetail={quotadetail} userquota={userquota} />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Piedoughnutchart extension={extension} />
          </Grid>
          <Grid item lg={8} sm={12} xs={12}>
            <DataGridCard tableData={tableData} />
          </Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
};

export default Dashboard;

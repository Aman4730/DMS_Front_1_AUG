import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Head from "../../layout/head/Head";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import CustomCards from "../../components/dashboardPages/CustomCards";
import DataGridCard from "../../components/dashboardPages/DataGridCard";
import ProgressBarchat from "../../components/dashboardPages/ProgressBarchat";
import Piedoughnutchart from "../../components/dashboardPages/Piedoughnutchart";
const Dashboard = () => {
  // Destructure useContext variables
  const {
    getCountworkspace,
    getlatestfolderfiles,
    getquotadetails,
    getcountextension,
  } = useContext(UserContext);
  const [counts, setCounts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [quotadetail, setQuotadetail] = useState([]);
  const [userquota, setUserquota] = useState([]);
  const [extension, setExtension] = useState({});
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
        setTableData([
          ...apiRes?.data?.latestFiles,
          ...apiRes?.data?.latestFolders,
        ]);
      },
      (apiErr) => {}
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
      <Head title="Dashboard - Regular"></Head>
      <Stack style={{ marginTop: "77px" }}>
        <CustomCards counts={counts} />
        <ProgressBarchat quotadetail={quotadetail} userquota={userquota} />
        <Stack flexDirection="row">
          <Piedoughnutchart extension={extension} />
          <DataGridCard tableData={tableData} />
        </Stack>
      </Stack>
    </React.Fragment>
  );
};
export default Dashboard;

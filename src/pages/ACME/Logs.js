import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import { Stack, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import LogTable from "../../components/Logs/LogTable";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";

const WS1 = () => {
  const { setAuthToken } = useContext(AuthContext);
  const { addfolderlogs, getloggs, userDropdownU } = useContext(UserContext);
  useEffect(() => {
    getUserRselect();
    getCurrentMonthLog();
  }, []);
  // --------------------------------------logs
  const [logsDataList, setLogsDataList] = useState([]);
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [currentMonthLog, setCurrentMonthLog] = useState([]);
  const [formDataLogs, setFormDataLogs] = useState({
    selectUser: "",
    selectedCategory: "",
    selectedFromDate: null,
    selectedToDate: null,
  });
  const handleChangelogs = (event, value, fieldName) => {
    setFormDataLogs((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const resetForm = () => {
    setFormDataLogs({
      selectedCategory: "",
      selectedFromDate: null,
      selectedToDate: null,
    });
  };

  const selectedStartDate = formDataLogs?.selectedFromDate?.$d;
  const selectedeEndDate = formDataLogs?.selectedToDate?.$d;
  let formattedStartDate, formattedEndDate;
  if (selectedStartDate || selectedeEndDate) {
    const formatDateString = (date) => {
      const dateObject = new Date(date);
      return dateObject.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    };
    formattedStartDate = formatDateString(selectedStartDate);
    formattedEndDate = formatDateString(selectedeEndDate);
  } else {
    console.log("Invalid dates selected.");
  }

  // ------------------------------------------------postApis Start
  const onFormSubmit = async () => {
    let data = {
      category: formDataLogs?.selectedCategory?.value,
      user_email: formDataLogs?.selectUser?.value,
    };
    if (formattedStartDate && formattedStartDate !== "Invalid Date") {
      data.start_date = formattedStartDate;
    }
    if (formattedEndDate && formattedEndDate !== "Invalid Date") {
      data.end_date = formattedEndDate;
    }
    addfolderlogs(
      data,
      (apiRes) => {
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Data Fetch Successfully",
            style: {
              height: 60,
            },
          });
          setLogsDataList(apiRes?.data?.obj);
          resetForm();
          handleClose();
        }
      },
      (apiErr) => {
        if (apiErr?.response?.status === 400) {
          notification["warning"]({
            placement: "top",
            description: "",
            message: apiErr?.response?.data?.error,
            style: {
              height: 60,
            },
          });
        }
      }
    );
  };
  const getCurrentMonthLog = async () => {
    getloggs(
      {},

      (apiRes) => {
        setCurrentMonthLog(apiRes.data.data);
      },
      (apiErr) => {}
    );
  };
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        const data = apiRes?.data?.data;
        setUserDropdowns(data);
      },
      (apiErr) => {}
    );
  };

  const tableData = logsDataList.length > 0 ? logsDataList : currentMonthLog;
  // ------------------------------------------------postApis End
  const tableHeader = [
    {
      id: "createdAt",
      numeric: false,
      disablePadding: true,
      label: "Date/Time",
    },
    {
      id: "user_id" || "guest_id",
      numeric: false,
      disablePadding: true,
      label: "User Id",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: true,
      label: "Category",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: true,
      label: "Description",
    },
    {
      id: "system_ip",
      numeric: false,
      disablePadding: true,
      label: "System Details",
    },
  ];

  return (
    <>
      <Head title="Logs - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <Typography
            style={{
              fontSize: "24.5px",
              fontWeight: "bold",
            }}
          >
            Logs
          </Typography>
          <LogTable
            rows={tableData}
            headCells={tableHeader}
            handlefilter={onFormSubmit}
            formDataLogs={formDataLogs}
            userDropdowns={userDropdowns}
            handleChangelogs={handleChangelogs}
            selectLogs={(e, v) => setSelectLog(v)}
          />
        </Stack>
      </Content>
    </>
  );
};
export default WS1;

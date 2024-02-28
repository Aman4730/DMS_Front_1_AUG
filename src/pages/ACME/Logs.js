import React, { useContext, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import LogTable from "../../components/Logs/LogTable";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
} from "../../components/Component";
// import ip from "ip";

//import publicIp from "public-ip";
const WS1 = () => {
  const { addfolderlogs, getloggs } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);

  // --------------------------------------logs
  const [folderList, setFolderList] = useState([{ name: "test", class: "56" }]);
  const [formDataLogs, setFormDataLogs] = useState({
    selectedCategory: "",
    selectedFromDate: null,
    selectedToDate: null,
  });
  const [logsDataList, setLogsDataList] = useState([]);

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

  // ------------------------------------------------postApis Start
  const [ipAddress, setIpAddress] = useState("");
  // useEffect(() => {
  //   const fetchIpAddress = async () => {
  //     try {
  //       const response = await fetch("https://api.ipify.org?format=json");
  //       const data = await response.json();
  //       setIpAddress(data.ip);
  //     } catch (error) {
  //     }
  //   };
  //   fetchIpAddress();
  // }, []);

  const onFormSubmit = async () => {
    let data = {
      id_address: ipAddress,
      category: formDataLogs?.selectedCategory?.value,
      start_date: formDataLogs?.selectedFromDate?.$d,
      end_date: formDataLogs?.selectedToDate?.$d,
    };
    addfolderlogs(
      data,
      (apiRes) => {
        resetForm();
        setLogsDataList(apiRes?.data?.obj);
        handleClose();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  const [currentMonthLog, setCurrentMonthLog] = useState([]);
  const getCurrentMonthLog = async () => {
    let data = {
      id_address: ipAddress,
      category: formDataLogs?.selectedCategory?.value,
      start_date: formDataLogs?.selectedFromDate?.$d,
      end_date: formDataLogs?.selectedToDate?.$d,
    };
    getloggs(
      data,

      (apiRes) => {
        setCurrentMonthLog(apiRes.data.data);
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getCurrentMonthLog();
  }, []);
  const tableData = logsDataList.length > 0 ? logsDataList : currentMonthLog;
  // ------------------------------------------------postApis End
  const tableHeader = [
    {
      id: "Date/Time",
      numeric: false,
      disablePadding: true,
      label: "Date/Time",
    },
    {
      id: "User Id",
      numeric: false,
      disablePadding: true,
      label: "User Id",
    },
    {
      id: "Category",
      numeric: false,
      disablePadding: true,
      label: "Category",
    },
    {
      id: "Description",
      numeric: false,
      disablePadding: true,
      label: "Description",
    },
    {
      id: "System Details",
      numeric: false,
      disablePadding: true,
      label: "System Details",
    },
  ];

  function callIp() {
    // Function to extract IP address from the RTCSessionDescription object
    function extractIP(sdp) {
      const regex = /(\d+\.\d+\.\d+\.\d+)/;
      const result = regex.exec(sdp);
      return result && result.length > 0 ? result[0] : "Unknown";
    }

    return new Promise((resolve, reject) => {
      // Create a peer connection object
      const pc = new RTCPeerConnection();

      // Create a data channel (optional)
      const dc = pc.createDataChannel("ipAddressChannel");

      // Create an offer and set local description
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          // Access the SDP description
          const sdp = pc.localDescription.sdp;
          // Extract the IP address
          const ipAddress = extractIP(sdp);
          resolve(ipAddress);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Usage example
  callIp()
    .then((ip) => {
      setIpAddress(ip);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return (
    <>
      <Head title="Logs - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography
                  style={{
                    fontSize: "24.5px",
                    fontWeight: "bold",
                  }}
                >
                  Logs
                </Typography>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <LogTable
            handleChangelogs={handleChangelogs}
            handlefilter={onFormSubmit}
            formDataLogs={formDataLogs}
            rows={folderList}
            headCells={tableHeader}
            allfolderlist={tableData}
            selectLogs={(e, v) => setSelectLog(v)}
          />
        </Stack>
      </Content>
    </>
  );
};
export default WS1;

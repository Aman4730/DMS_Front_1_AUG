import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { Stack, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import CreateLinkModel from "../../components/CreateLinkModel";
import { BlockHeadContent } from "../../components/Component";
import GlobalSearchTable from "../../components/AllTables/GlobalSearchTable";
const GlobalSearch = () => {
  useEffect(() => {
    getUserRselect();
  }, []);
  const {
    isLogin,
    deletefile,
    getWorkspace,
    getfetchlink,
    userDropdownU,
    getcountextension,
  } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);
  // ------------------------------------------------getApis Start
  const PermissionPolicy = isLogin?.Permission;
  const [userDropdowns, setUserDropdowns] = useState([]);
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        setUserDropdowns(apiRes.data.data);
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------------getApis End
  // ------------------------------------------------Delete File Folder
  const [deleteId, setDeleteId] = useState(false);
  useEffect(() => {
    setDeleteId(false);
  }, [deleteId]);
  const [openDelete, setOpenDelete] = React.useState({
    status: false,
    data: {},
  });
  const handleClickOpen = (id, file_type) => {
    setOpenDelete({
      status: true,
      data: { id, file_type },
    });
  };
  const handleCloseDelete = () => {
    setOpenDelete({
      status: false,
      data: "",
    });
  };
  const onDeleteClick = (id, file_type) => {
    handleCloseDelete();
    setDeleteId(true);
    let data = {
      id: id,
      file: file_type,
    };
    deletefile(
      data,
      (apiRes) => {
        notification["success"]({
          placement: "top",
          description: "",
          message: "Delete Successfully...",
          style: {
            marginTop: "45px",
            height: "60px",
          },
        });
        setDeleteId(true);
        setAuthToken(token);
        getNoteslist();
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------------Delete File Folder
  // ------------------------------------------------Create Folder Start
  const [open, setOpen] = useState({
    status: false,
    data: "",
  });
  // ------------------------------------------------Create Folder End
  // ------------------------------------------------file Download
  const onDownloadfolders = (filemongo_id) => {
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfolders`;
    const requestData = { folder_id: filemongo_id };

    axios
      .post(apiUrl, requestData, { responseType: "arraybuffer" }) // Specify responseType as arraybuffer
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_blank";
        anchor.download = "your-download-filename.zip";
        anchor.click();

        URL.revokeObjectURL(url); // Clean up the object URL
      })
      .catch((error) => {
        console.error("Error downloading the folder:", error);
      });
  };
  const onFileDownload = (filemongo_id, file_name) => {
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfile`;
    const requestData = { filemongo_id: filemongo_id };

    axios
      .post(apiUrl, requestData, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data]);

        const fileName = file_name;

        // Use the split() method to separate the name and extension
        const parts = fileName?.split(".");
        const name = parts[0];
        const extension = parts[1];

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;

        // Replace 'your_file_name.extension' with the desired file name and extension
        link.download = `${name}.${extension}`;
        // Append the link to the DOM and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the temporary URL and link
        URL.revokeObjectURL(url);
        link.remove();
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };
  // ------------------------------------------------file Download
  // ------------------------------------------------Start Share Link Modal
  const [shareId, setShareId] = useState({});
  const [shareLink, setShareLink] = useState([]);
  const [openLink, setOpenLink] = useState(false);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [shareFormData, setShareFormData] = useState({
    Email: "",
    Password: "",
    Message: "",
    Subject: "",
    Type: "",
    userDropdowns: "",
  });
  const [checkboxValues, setCheckboxValues] = useState({
    View: false,
    Download: false,
    Upload: false,
    Print: false,
    create_folder: false,
    upload_file: false,
    upload_folder: false,
  });
  const handleClickLinkOpen = (id, name) => {
    setShareId({ id: id, name: name });
    setOpenLink(true);
  };
  const handleLinkClose = () => {
    resetState();
    setOpenLink(false);
    resetCheckboxState();
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleShareData = (e) => {
    const { name, value } = e.target;
    setShareFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const handleSubmitShareData = () => {
    onFetchlink();
  };
  const onFetchlink = () => {
    handleLinkClose();
    let data = {
      id: shareId.id,
      link_expiry: selectedDate,
      type: shareFormData.Type,
      view: checkboxValues.View,
      email: shareFormData.Email,
      print: checkboxValues.Print,
      upload: checkboxValues.Upload,
      file_folder_name: shareId.name,
      message: shareFormData.Message,
      subject: shareFormData.Subject,
      password: shareFormData.Password,
      download: checkboxValues.Download,
      upload_file: checkboxValues.upload_file,
      email: shareFormData.userDropdowns.email,
      create_folder: checkboxValues.create_folder,
      upload_folder: checkboxValues.upload_folder,
    };

    getfetchlink(
      data,
      (apiRes) => {
        setShareLink(apiRes?.data);
        // Show success notification
        notification["success"]({
          placement: "top",
          description: "",
          message: "Link Shared Successfully...",
          style: {
            marginTop: "45px",
            height: "60px",
          },
        });
      },
      (apiErr) => {
        // For example, you can show an error notification if needed
        console.error("Error sharing link:", apiErr);
        notification["error"]({
          placement: "top",
          description: "An error occurred while sharing the link.",
          message: "Error",
          style: {
            marginTop: "45px",
            height: "60px",
          },
        });
      }
    );
  };
  // ------------------------------------------------End Share Link Modal
  // ------------------------------------------------Reset Form Start
  const resetState = () => {
    setShareFormData({
      Email: "",
      Password: "",
      Message: "",
      Subject: "",
    });
  };
  const resetCheckboxState = () => {
    setCheckboxValues({
      View: false,
      Download: false,
      Upload: false,
      Print: false,
    });
  };
  // ------------------------------------------------Reset Form End
  const [folderList, setFolderList] = useState([{ name: "test" }]);
  const [propertys, setPropertys] = useState([]);
  // ------------------------------------------------Folder Routing
  const [searchTerm, setSearchTerm] = React.useState("");
  // --------------------------------------search start
  useEffect(() => {
    getExtension();
    getAllWorkspace();
  }, []);
  // --------------------------------------logs
  const [workspace, setWorkspace] = useState([]);
  const [extension, setExtension] = useState({});
  const [searchDataTable, setSearchDataTable] = useState([]);
  const [formData, setFormData] = useState({
    workspace: "",
    extension: "",
    search: "",
  });
  const handleChangeS = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const labels = Object.keys(extension);
  //reset form
  const resetFormS = () => {
    setFormData({
      workspace: "",
      extension: "",
      search: "",
    });
  };
  // ------------------------------------------------postApis Start
  const onHandleSearch = () => {
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/search?q=${formData.search}`;

    axios
      .post(apiUrl, formData)
      .then((response) => {
        resetFormS();
        setSearchDataTable(response.data);
        // Handle the response data here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error here
      });
  };
  // ------------------------------------------------postApis End
  // ------------------------------------------------getApis Start
  //Get All workspace
  const getAllWorkspace = () => {
    getWorkspace(
      {},
      (apiRes) => {
        const data = apiRes.data.data;
        setWorkspace(
          data.map((gro) => ({
            label: gro.workspace_name,
            value: gro.workspace_name,
          }))
        );
      },
      (apiErr) => {}
    );
  };
  //Get All Extension
  const getExtension = () => {
    getcountextension(
      {},
      (apiRes) => {
        setExtension(apiRes.data);
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------------getApis End
  const tableHeader = [
    {
      id: "File Name",
      numeric: false,
      disablePadding: true,
      label: "File Name",
    },
    {
      id: "Updated Date/Time",
      numeric: false,
      disablePadding: true,
      label: "Updated Date/Time",
    },

    {
      id: "Size",
      numeric: false,
      disablePadding: true,
      label: "Size",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "230px" },
    },
  ];

  // --------------------------------------search end
  return (
    <>
      <Head title="Global Search - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHeadContent>
            <Typography
              style={{
                fontSize: "24.5px",
                fontWeight: "bold",
              }}
            >
              Global Search
            </Typography>
          </BlockHeadContent>
          <ModalPop
            open={openDelete.status}
            handleClose={handleCloseDelete}
            handleOkay={onDeleteClick}
            title="User Delete?Are You Sure!"
            data={openDelete?.data?.id}
            file_type={openDelete.data.file_type}
          />
          <CreateLinkModel
            error={error}
            openLink={openLink}
            userDropdowns={userDropdowns}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            shareFormData={shareFormData}
            checkboxValues={checkboxValues}
            handleShareData={handleShareData}
            handleLinkClose={handleLinkClose}
            handleDateChange={handleDateChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmitShareData={handleSubmitShareData}
            shareLink={shareLink}
          />
          <GlobalSearchTable
            rows={folderList}
            isLogin={isLogin}
            propertys={propertys}
            headCells={tableHeader}
            setPropertys={setPropertys}
            searchTerm={searchTerm}
            onFileDownload={onFileDownload}
            onDownloadfolders={onDownloadfolders}
            PermissionPolicy={PermissionPolicy}
            handleOpenDeleteFile={handleClickOpen}
            handleClickLinkOpen={handleClickLinkOpen}
            openModal={() => setOpen({ ...open, status: true })}
            labels={labels}
            formData={formData}
            workspace={workspace}
            handleChange={handleChangeS}
            handleSearch={onHandleSearch}
            allfolderlist={searchDataTable}
          />
        </Stack>
      </Content>
    </>
  );
};
export default GlobalSearch;

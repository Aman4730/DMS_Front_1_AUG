import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { LinearProgress, Stack } from "@mui/material";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import WS1Header from "../../components/WS1Header.jsx";
import { UserContext } from "../../context/UserContext";
import CommonTable from "../../components/AllTables/index.jsx";
import CreateLinkModel from "../../components/CreateLinkModel";
import Ws1_Rights from "../../components/Forms/Ws1_Rights.jsx";
import FileVersion from "../../components/FileVersion/index.jsx";
import FileUpload from "../../components/FileUploadModal/FileUpload";
import Foldercreate from "../../components/Foldercreate/Foldercreate";
import LinearProgressBar from "../../components/ProgressBar/index.jsx";
import FileFolderMove from "../../components/FileFolderMove/index.jsx";
import FileFolderComments from "../../components/FileFolderComments/index.jsx";
import FileFolderProperties from "../../components/FileFolderProperties/index.jsx";
import { addDays, format } from "date-fns";
import JSZip from "jszip";
import FolderUpload from "../../components/FolderUploaded/index.jsx";
import TestFile from "../../TestFile/index.jsx";
import QRGenerate from "../../components/QRGenerate/index.jsx";
import html2canvas from "html2canvas";
const WS1 = () => {
  useEffect(() => {
    getdoclistuploadfile();
    getUserRselect();
    getGroupDropdown();
    getmetatypelist();
  }, []);
  const {
    isLogin,
    getnotes,
    getdoclist,
    deletefile,
    deleteNotes,
    CommonNotes,
    contextData,
    getmetalist,
    getfetchlink,
    getWorkspace,
    userDropdownU,
    workSpaceData,
    sharingcancel,
    getallversions,
    add_permission,
    addcreatefolder,
    getquotadetails,
    add_updatefolder,
    getGroupsDropdown,
    getfoldernameslist,
    add_metaproperties,
    getWorkspacePermission,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [userData, setUserData] = contextData;
  const [fileDesc, setFileDesc] = useState("");
  const [metaList, setMetaList] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [allMoveFile, setAllMoveFile] = useState([]);
  const [docListUpload, setDocListupload] = useState([]);
  const [addProperties, setAddProperties] = useState([]);
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [allfolderlist, setAllfolderlist] = useState([]);
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  const [permissionUserList, setPermissionUserList] = useState([]);
  const [workspacePermissionWs1, setWorkspacePermissionWs1] = useState({});
  const [getAllfolderPermission, setGetAllfolderPermission] = useState({});
  const [currentFolderData, setCurrentFolderData] = useState({
    folder_name: "",
    levels: 0,
    parent_id: 0,
    id: 0,
    workspace_name: workSpaceData.workspace_name,
  });
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setUserData([...newData]);
  }, []);
  // ------------------------------------------------getApis Start
  useEffect(() => {
    getWorkspaces();
  }, [workSpaceData.workspace_name]);
  //main policy
  const PermissionPolicy = isLogin?.Permission;
  const [ws1Policy, setWs1Policy] = useState({});
  useEffect(() => {
    PermissionPolicy?.map((permission) => {
      if (permission?.policy_type === "My Workspace") {
        setWs1Policy(permission);
      }
    });
  }, [isLogin]);
  const [mainPolicy, setMainPolicy] = useState({});
  useEffect(() => {
    PermissionPolicy?.map((permission) => {
      if (permission?.policy_type === "TeamSpace") {
        setMainPolicy(permission);
      }
    });
  }, [isLogin]);
  const getdoclistuploadfile = () => {
    getdoclist(
      {},
      (apiRes) => {
        setDocListupload(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const getWorkspaces = () => {
    getWorkspace(
      {},
      (apiRes) => {
        setWorkspace(apiRes?.data?.data);
        const filteredUserList = apiRes?.data?.data
          ?.filter(
            (user) => user?.workspace_name === workSpaceData?.workspace_name
          )
          ?.map((user) => user.users_list)
          ?.filter((userList) => userList !== null && userList !== undefined);

        setPermissionUserList(filteredUserList[0] || []);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const getmetatypelist = () => {
    getmetalist(
      {},
      (apiRes) => {
        setMetaList(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        setUserDropdowns(apiRes.data.data);
        setPermissionUserList(apiRes?.data?.data?.map((gro) => gro?.email));
      },
      (apiErr) => {}
    );
  };
  const getGroupDropdown = () => {
    getGroupsDropdown(
      {},
      (apiRes) => {
        const data = apiRes?.data;
        setGroupsDropdown(data?.groups?.map((gro) => gro?.group_name));
      },
      (apiErr) => {}
    );
  };
  const getAllfoldernames = (
    data = {
      workspace_name: workSpaceData?.workspace_name,
      workspace_id: workSpaceData.workspace_id,
    }
  ) => {
    getfoldernameslist(
      data,
      (apiRes) => {
        setAllMoveFile(apiRes?.data?.folders);
        setAllfolderlist([...apiRes?.data?.files, ...apiRes?.data?.folders]);
      },
      (apiErr) => {
        console.log("====> api get folder name", apiErr);
      }
    );
  };

  // ------------------------------------------------getApis End

  const [individualPer, setIndividualPer] = useState({});
  useEffect(() => {
    individualPermission();
  }, [allfolderlist?.length]);
  const individualPermission = () => {
    allfolderlist?.map((data) => {
      if (data) {
        setIndividualPer(data?.permission);
      }
    });
  };
  const teamSpace = isLogin?.teamspace;
  const moveData =
    workspace
      ?.filter((data) => isLogin?.my_workspace?.includes(data.workspace_name))
      .map(({ id: workspace_id, workspace_name }) => ({
        workspace_id,
        workspace_name,
      })) || [];
  const matchedWorkspace = metaList
    ?.filter((data) => data?.workspace_name === workSpaceData?.workspace_name)
    .map((data) => data);

  // ------------------------------------------------Doc Type Start
  const [doctypeName, setDoctypeName] = useState("");
  const handleDoctypeAutocomplete = (doctype) => {
    setDoctypeName(doctype);
    if (doctype) {
      onSubmitProperties(doctype);
    }
  };
  const onSubmitProperties = (doctype) => {
    let data = {
      doctype: doctype,
      workspace_name: workSpaceData?.workspace_name,
    };
    add_metaproperties(
      data,
      (apiRes) => {
        setAddProperties(apiRes.data);
      },
      (apiErr) => {
        notification["error"]({
          placement: "top",
          description: "",
          message: apiErr.response.data.message,
          style: {
            height: 60,
          },
        });
      }
    );
  };
  // ------------------------------------------------Doc Type End
  // ------------------------------------------------Delete File Folder
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
    let data = {
      id: id,
      file: file_type,
    };
    deletefile(
      data,
      (apiRes) => {
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes?.data.message,
            style: {
              height: 60,
            },
          });
          let newData = {
            parent_id: currentFolderData?.id,
            levels: currentFolderData?.levels + 1,
            workspace_name: workSpaceData?.workspace_name,
            workspace_id: JSON.stringify(workSpaceData.workspace_id),
          };
          getAllfoldernames(newData);
        }
      },
      (apiErr) => {
        notification["error"]({
          placement: "top",
          description: "",
          message: apiErr.response.data.message,
          style: {
            height: 60,
          },
        });
      }
    );
  };
  // ------------------------------------------------Delete File Folder
  // ------------------------------------------------Create Folder Start
  const [editFolderId, setEditFolderId] = useState(0);
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [folderNameInput, setFolderNameInput] = useState({
    name: "",
  });
  const handleOpenFolderModal = () => {
    setOpenFolderModal(true);
  };
  const handleCloseFolderModal = () => {
    setOpenFolderModal(false);
    resetFolderForm();
  };
  const handleChangeFolder = (event) => {
    const { name, value } = event.target;
    setFolderNameInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onFolderFormSubmit = () => {
    if (editFolderId) {
      let data = {
        folder_id: editFolderId,
        new_folder_name: folderNameInput.name,
      };
      add_updatefolder(
        data,
        async (apiRes) => {
          if (apiRes.status === 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Folder Updated Successfully",
              style: {
                height: 60,
              },
            });
            handleCloseFolderModal();
            let newData = {
              parent_id: currentFolderData?.id,
              levels: currentFolderData?.levels + 1,
              workspace_name: workSpaceData?.workspace_name,
              workspace_id: JSON.stringify(workSpaceData.workspace_id),
            };
            getAllfoldernames(newData);
          }
        },
        (apiErr) => {
          notification["error"]({
            placement: "top",
            description: "",
            message: apiErr.response.data.message,
            style: {
              height: 60,
            },
          });
        }
      );
    } else {
      let data = {
        workspace_id: JSON.stringify(workSpaceData.workspace_id),
        workspace_name: workSpaceData.workspace_name,
        workspace_type: "My Workspace",
        policies_id: isLogin?.user_type == "Admin" ? "" : ws1Policy?.id,
        folder_name: folderNameInput.name,
        levels: currentFolderData.levels,
        parent_id: currentFolderData.parent_id,
        folder_id: currentFolderData.id,
      };
      addcreatefolder(
        data,
        async (apiRes) => {
          if (apiRes.status === 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Folder Created Successfully",
              style: {
                height: 60,
              },
            });
            handleCloseFolderModal();
            let newData = {
              parent_id: currentFolderData?.id,
              levels: currentFolderData?.levels + 1,
              workspace_name: workSpaceData?.workspace_name,
              workspace_id: JSON.stringify(workSpaceData.workspace_id),
            };
            getAllfoldernames(newData);
          }
        },
        (apiErr) => {
          notification["error"]({
            placement: "top",
            description: "",
            message: apiErr.response.data.message,
            style: {
              height: 60,
            },
          });
        }
      );
    }
  };
  const onEditFolderClick = (id) => {
    setUploadStatus("selected");
    allfolderlist.map((item) => {
      if (item?.id == id) {
        setFolderNameInput((prevFormData) => ({
          ...prevFormData,
          name: item.folder_name,
        }));
      }
    });
    setEditFolderId(id);
    handleOpenFolderModal();
  };
  const resetFolderForm = () => {
    setFolderNameInput({
      name: "",
    });
    setEditFolderId(0);
  };
  // ------------------------------------------------Create Folder End
  // ------------------------------------------------file upload
  //change
  const [file, setFile] = useState([]);
  const multiplefilesArray = Object.values(file);

  const [fileName, setFileName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editFileId, setEditFileId] = useState(0);
  const [filetypeEdit, setFiletypeEdit] = useState("");
  const [openFileModal, setOpenFileModal] = useState(false);
  const [fileNameInput, setFileNameInput] = useState({
    name: "",
    file_description: "",
  });
  const [fileModal, setFileModal] = useState({
    status: false,
    data: "",
  });
  const handleOpenFileModal = () => {
    setOpenFileModal(true);
  };
  const handleCloseFileModal = () => {
    setProgress(0);
    resetFileForm();
    setUploadStatus("select");
    setOpenFileModal(false);
  };
  const handleChangeFile = (event) => {
    const { name, value } = event.target;
    setFileNameInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onEditFileClick = (id, file_type) => {
    setUploadStatus("selected");
    allfolderlist.map((item) => {
      if (item?.id == id) {
        const fileNameWithoutExtension = item.file_name
          .split(".")
          .slice(0, -1)
          .join(".");
        setFileNameInput((prevFormData) => ({
          ...prevFormData,
          name: fileNameWithoutExtension,
          file_description: item.file_description,
        }));
      }
    });
    setEditFileId(id);
    setFiletypeEdit(file_type);
    handleOpenFileModal();
  };
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange = (e, fieldName) => {
    const value = e?.target ? e.target.value : e;
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
  };

  //fileupload new
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const onChooseFile = () => {
    inputRef.current.click();
  };

  //change
  const clearFileInput = (id) => {
    inputRef.current.value = "";
    setProgress(0);
    if (window.confirm("Are you sure you want to remove this file?")) {
      const result = multiplefilesArray.filter(
        (data) => data.lastModified !== id
      );
      setFile(result);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files);
    setUploadStatus("selected");
  };
  const cancelTokenSource = useRef(null);
  const handleSubmit = async (event) => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }
    event.preventDefault();
    if (editFileId) {
      const data = {
        file_id: editFileId,
        doctype: doctypeName,
        Feilds_Name: formValues,
        new_file_name: `${fileNameInput?.name}.${filetypeEdit}`,
        fileDesc: fileNameInput?.file_description,
      };
      add_updatefolder(
        data,
        async (apiRes) => {
          if (apiRes.status === 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Folder Updated Successfully",
              style: {
                height: 60,
              },
            });
            handleCloseFileModal();
            let newData = {
              parent_id: currentFolderData?.id,
              levels: currentFolderData?.levels + 1,
              workspace_name: workSpaceData?.workspace_name,
              workspace_id: JSON.stringify(workSpaceData.workspace_id),
            };
            getAllfoldernames(newData);
          }
        },
        (apiErr) => {}
      );
    } else {
      try {
        setUploadStatus("uploading");
        let multipleFileExtensions = "";
        let totalmultipleFileSize = 0;
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
          formData.append("files", file[i]);
          //multipleFileSize
          totalmultipleFileSize += multiplefilesArray[i].size;
          //extensions
          let extension = file[i]?.name?.split(".").pop();
          if (extension) {
            if (multipleFileExtensions) {
              multipleFileExtensions += ",";
            }
            multipleFileExtensions += extension;
          }
        }
        const data = {
          workspace_id: workSpaceData.workspace_id,
          workspace_name: workSpaceData.workspace_name,
          folder_id: currentFolderData.id || null,
          policies_id: isLogin?.user_type == "Admin" ? "" : ws1Policy?.id,
          doctype: doctypeName,
          fileDesc: fileNameInput?.file_description,
          file_Size: totalmultipleFileSize,
          Feilds_Name: formValues,
          workspace_type: "My Workspace",
        };

        formData.append("data", JSON.stringify(data));

        cancelTokenSource.current = axios.CancelToken.source();
        const quary = [[totalmultipleFileSize], [workSpaceData.workspace_name]];
        const response = await axios.post(
          `${
            process.env.REACT_APP_API_URL_LOCAL
          }/uploadcreate?q=${quary}&fileExtension=${multipleFileExtensions}&workspace_type=${"My Workspace"}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            cancelToken: cancelTokenSource.current.token,
            onUploadProgress: (progressEvent) => {
              console.log(progressEvent, "====progressEvent");
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            },
          }
        );
        setUploadStatus("done");
        setDoctypeName("");
        setFileName(response.data);
        if (response.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: response.data.message,
            style: {
              height: 60,
            },
          });
          let newData = {
            parent_id: currentFolderData?.id,
            levels: currentFolderData?.levels + 1,
            workspace_id: JSON.stringify(workSpaceData.workspace_id),
            workspace_name: workSpaceData?.workspace_name,
          };
          getAllfoldernames(newData);
        }
      } catch (error) {
        setUploadStatus("select");
        notification["warning"]({
          placement: "top",
          description: "",
          message: error?.response?.data?.message,
        });
        handleCloseFileModal();
        // setLoading(false);
      }
    }
  };
  const onCancelUpload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Upload cancelled by user.");
      notification["success"]({
        placement: "top",
        description: "",
        message: "File Upload Canceled",
        style: {
          height: 60,
        },
      });
      handleCloseFileModal();
    }
  };

  const [userquota, setUserquota] = useState([]);
  useEffect(() => {
    getQuotaDetails();
  }, []);

  const getQuotaDetails = () => {
    getquotadetails(
      {},
      (apiRes) => {
        const fetchedUserQuota = apiRes.data.user_list;
        fetchedUserQuota?.forEach((data) => {
          if (data.user_email === isLogin?.email) {
            let leftquota = data.max_quota - data.used_quota;
            setUserquota(leftquota);
          }
        });
      },
      (apiErr) => {
        console.error("Error fetching quota details:", apiErr);
      }
    );
  };

  const resetFileForm = () => {
    setFile([]);
    setEditFileId(0);
    setFormValues({});
    setDoctypeName("");
    setAddProperties([]);
    setFileNameInput({
      name: "",
      file_description: "",
    });
  };
  // ------------------------------------------------file upload
  // ------------------------------------------------file & folder Download
  const [progressBar, setProgressBar] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const onDownloadfolders = (filemongo_id, folder_name, folder_size) => {
    setLoading(true);
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfolders`;
    const requestData = { folder_id: filemongo_id };
    axios
      .post(apiUrl, requestData, {
        responseType: "arraybuffer",
        onDownloadProgress: (progressEvent) => {
          const loaded = progressEvent.loaded;
          const totalBytes = folder_size;
          let progress = 0;
          if (totalBytes > 0 && loaded > 0) {
            progress = Math.round((loaded / totalBytes) * 100);
          }
          console.log(progressEvent, "==progressEvent");
        },
      })
      .then((response) => {
        setProgressBar(0);
        notification["success"]({
          placement: "top",
          description: "",
          message: "Folder Download Successfully...",
          style: {
            height: 60,
          },
        });
        setLoading(false);
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_blank";
        anchor.download = `${folder_name}`;
        anchor.click();

        URL.revokeObjectURL(url); // Clean up the object URL
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error downloading the folder:", error);
      });
  };
  const onFileDownload = (filemongo_id, file_name, file_size, file_type) => {
    setDisabledBtn(true);
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfile`;
    const requestData = { filemongo_id: filemongo_id };

    let downloadCompleted = false;

    axios
      .post(apiUrl, requestData, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          if (!downloadCompleted) {
            const totalBytes = parseInt(file_size, 10);

            const loaded = progressEvent.loaded;
            if (totalBytes > 0) {
              const progress = Math.min(
                Math.round((loaded / totalBytes) * 100),
                99
              );
              setProgressBar(progress);
            }
          }
        },
      })
      .then((response) => {
        downloadCompleted = true;
        setProgressBar(100);
        setDisabledBtn(false);
        setTimeout(() => setProgressBar(0), 500);

        notification["success"]({
          placement: "top",
          description: "",
          message: "File Download Successfully...",
          style: {
            height: 60,
          },
        });

        const blob = new Blob([response.data], { type: file_type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file_name;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      })
      .catch((error) => {
        downloadCompleted = true; // Stop further progress updates in case of error
        setProgressBar(0);
        notification["error"]({
          placement: "top",
          message: error?.response?.statusText || "Download Failed",
          style: {
            height: 60,
          },
        });
      });
  };
  const onCancelDownload = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Upload cancelled by user.");
      notification["success"]({
        placement: "top",
        description: "",
        message: "File Upload Canceled",
        style: {
          height: 60,
        },
      });
      handleCloseFileModal();
    }
  };
  // Add watermark
  const onFileWatermarkDownload = (
    filemongo_id,
    file_name,
    file_size,
    file_type
  ) => {
    setDisabledBtn(true);
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfile`;
    const requestData = { filemongo_id: filemongo_id };

    let downloadCompleted = false;

    axios
      .post(apiUrl, requestData, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const loaded = progressEvent?.loaded;
          const totalBytes = file_size || 0;
          let progress = 0;

          if (totalBytes > 0 && loaded > 0) {
            progress = Math.round((loaded / totalBytes) * 100);
          }

          // Only update progress if download is ongoing
          if (!downloadCompleted) {
            setProgressBar(progress);
          }
        },
      })
      .then(async (response) => {
        downloadCompleted = true; // Stop progress updates after download is complete
        setProgressBar(100);
        setDisabledBtn(false);

        notification["success"]({
          placement: "top",
          description: "",
          message: "File Download Successfully...",
          style: {
            height: 60,
          },
        });

        // Handling PDF watermark logic
        if (file_type === "pdf") {
          const arrayBuffer = await response.data.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const pages = pdfDoc.getPages();
          pages.forEach((page) => {
            const { width, height } = page.getSize();
            page.drawText("ACME", {
              x: width / 2 - 50,
              y: height / 2,
              size: 50,
              color: rgb(0.5, 0.5, 0.5),
              opacity: 0.5,
              rotate: degrees(30),
            });
          });

          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = file_name;
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
          link.remove();
        } else {
          // For non-PDF files, directly download the file
          const blob = response.data;
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = file_name;
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
          link.remove();
        }
      })
      .catch((error) => {
        downloadCompleted = true; // Ensure no further progress updates on error
        setProgressBar(0);
        setDisabledBtn(false);

        console.error("Error downloading the file:", error);
        notification["error"]({
          placement: "top",
          description: "Failed to download the file.",
          message: "Download Error",
          style: {
            height: 60,
          },
        });
      });
  };

  // ------------------------------------------------Start Share Link Modal
  const checkboxData = [
    { label: "View", name: "view" },
    { label: "Move", name: "move" },
    { label: "Share", name: "share" },
    { label: "Rights", name: "rights" },
    { label: "Rename", name: "rename" },
    { label: "Delete", name: "delete" },
    {
      label: "Comments",
      name: "comment",
    },
    {
      label: "Download",
      name: "download",
    },
    {
      label: "Properties",
      name: "properties",
    },
    {
      label: "Upload Folder",
      name: "upload_folder",
    },
    {
      label: "Create Folder",
      name: "create_folder",
    },

    {
      label: "Upload File",
      name: "upload_file",
    },
    {
      label: "View W",
      name: "view_watermark",
    },
    {
      label: "Download W",
      name: "download_watermark",
    },
  ];
  const [shareId, setShareId] = useState({});
  const [shareLink, setShareLink] = useState([]);
  const [openLink, setOpenLink] = useState(false);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [shareFormData, setShareFormData] = useState({
    Email: "",
    Password: "",
    Message: "",
    Subject: "",
    Type: "",
    userDropdowns: "",
    workspace_name: "",
  });
  const [checkboxValues, setCheckboxValues] = useState({
    view: false,
    share: false,
    rename: false,
    upload_folder: false,
    create_folder: false,
    upload_file: false,
    delete: false,
    download: false,
    move: false,
    rights: false,
    comment: false,
    properties: false,
    view_watermark: false,
    download_watermark: false,
  });

  const handleClickLinkOpen = (id, file_type, name) => {
    setShareId({ id: id, file_type: file_type, name: name });
    setOpenLink(true);
  };
  const handleLinkClose = () => {
    resetState();
    setError(false);
    setOpenLink(false);
    resetCheckboxState();
  };
  //min and max dates

  useEffect(() => {
    if (
      isLogin.user_type === "User" &&
      mainPolicy &&
      mainPolicy?.minimum_maximum_days
    ) {
      const PolicyMinDays = mainPolicy?.minimum_maximum_days[0];
      const PolicyMaxDays = mainPolicy?.minimum_maximum_days[1];
      const today = new Date();
      const min = format(addDays(today, PolicyMinDays), "yyyy-MM-dd");
      const max = format(addDays(today, PolicyMaxDays), "yyyy-MM-dd");
      setMinDate(min);
      setMaxDate(max);
    }
  }, [isLogin, PermissionPolicy, mainPolicy]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    let hasError = false;
    let errorMessage = "";
    if (isLogin.user_type === "User") {
      const {
        minimum_character,
        minimum_numeric,
        minimum_Alphabets,
        minimum_special_character,
      } = ws1Policy;
      if (newPassword?.length < minimum_character) {
        hasError = true;
        errorMessage = `Password must be at least ${minimum_character} characters long.`;
      } else {
        const numericCount = (newPassword.match(/\d/g) || "").length;
        const alphabetsCount = (newPassword.match(/[a-zA-Z]/g) || "").length;
        const specialCount = (newPassword.match(/[^a-zA-Z0-9]/g) || "").length;

        if (minimum_numeric && numericCount < minimum_numeric) {
          hasError = true;
          errorMessage = `Password must contain at least ${minimum_numeric} numeric character(s).`;
        } else if (minimum_Alphabets && alphabetsCount < minimum_Alphabets) {
          hasError = true;
          errorMessage = `Password must contain at least ${minimum_Alphabets} alphabet character(s).`;
        } else if (
          minimum_special_character &&
          specialCount < minimum_special_character
        ) {
          hasError = true;
          errorMessage = `Password must contain at least ${minimum_special_character} special character(s).`;
        }
      }
      setError(hasError);
      setErrorMessage(errorMessage);
    }
    setPassword(newPassword);
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
  const onFetchlink = () => {
    setLoading(true);
    let data = {
      id: shareId.id,
      link_expiry: selectedDate || minDate,
      user_type: shareFormData.Type,
      email: shareFormData?.Email,
      sharedfrom: "My Workspace",
      shared_workspace_id: workSpaceData.workspace_id,
      file_type: shareId.file_type || "",
      workspace_name: shareFormData.workspace_name,
      name: shareId.name,
      message: shareFormData.Message,
      subject: shareFormData.Subject,
      password: shareFormData.Password,
      user_email: shareFormData?.userDropdowns?.email,
      view: checkboxValues.view,
      share: checkboxValues.share,
      rename: checkboxValues?.rename,
      view_watermark: checkboxValues?.view_watermark,
      download_watermark: checkboxValues.download_watermark,
      upload_folder: checkboxValues.upload_folder,
      create_folder: checkboxValues.create_folder,
      upload_file: checkboxValues.upload_file,
      delete_action: checkboxValues.delete,
      download: checkboxValues.download,
      move: checkboxValues?.move,
      rights: checkboxValues?.rights,
      comment: checkboxValues?.comment,
      properties: checkboxValues?.properties,
    };
    getfetchlink(
      data,
      (apiRes) => {
        setLoading(false);
        handleLinkClose();
        setShareLink(apiRes?.data);
        notification["success"]({
          placement: "top",
          description: "",
          message: apiRes?.data.message,
          style: {
            height: 60,
          },
        });
      },
      (apiErr) => {
        notification["error"]({
          placement: "top",
          description: "",
          message: apiErr?.response?.data?.message,
        });
        setLoading(false);
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
    setPassword("");
    setShareId({});
  };
  const resetCheckboxState = () => {
    setCheckboxValues({
      view: false,
      share: false,
      rename: false,
      upload_folder: false,
      create_folder: false,
      upload_file: false,
      delete: false,
      download: false,
      move: false,
      rights: false,
      comment: false,
      properties: false,
      view_watermark: false,
      download_watermark: false,
    });
  };
  // ------------------------------------------------Reset Form End
  const [propertys, setPropertys] = useState([]);
  const [folderList, setFolderList] = useState([{ name: "test" }]);
  const tableHeader = [
    {
      id: "file_name",
      numeric: false,
      disablePadding: true,
      label: "Folder / File Name ",
    },

    {
      id: "updatedAt",
      numeric: false,
      disablePadding: true,
      label: "Update D/T",
    },
    {
      id: "user_email",
      numeric: false,
      disablePadding: true,
      label: "Uploaded By",
    },
    {
      id: "file_size",
      numeric: false,
      disablePadding: true,
      label: "Size",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Actions",
      style: { marginLeft: "130px" },
    },
  ];
  // ------------------------------------------------Folder Routing
  const [state, setState] = useState({ id: 0, data: [] }); //
  const [newArr, setNewArr] = useState({ data: [] });
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [id, setId] = useState(0);
  const retrievedWorkspaceName = localStorage.getItem("workspace_name");
  const retrievedWorkspaceId = localStorage.getItem("workspace_id");

  useEffect(() => {
    let api = [];
    setState({ id: 0, data: api });
  }, []);
  const [list, setList] = useState([
    { id: "its_me", folder_name: workSpaceData.workspace_name },
  ]);
  useEffect(() => {
    setList([{ id: "its_me", folder_name: retrievedWorkspaceName }]);
    getAllfoldernames({
      workspace_name: retrievedWorkspaceName,
      workspace_id: retrievedWorkspaceId,
    });
  }, [workSpaceData?.workspace_name]);
  const nestedFolder = (obj, folderName) => {
    if (folderName == "ws1") {
      return setNewArr(state);
    }
    if (obj.folderName == folderName) {
      return setNewArr(obj);
    }
    obj.data.map((newData) => nestedFolder(newData, folderName));
  };
  const findFolder = (folder) => {
    nestedFolder(state, folder);
  };
  const [innerDefaultPermission, setInnerDefaultPermission] = useState({});
  // console.log(innerDefaultPermission, "=innerDefaultPermission");

  const callApi = async (data) => {
    setList((prev) => {
      return [...prev, data];
    });
    let apiData = {
      parent_id: data?.id,
      levels: data?.levels + 1,
      workspace_name: data?.workspace_name,
      workspace_id: data?.workspace_id,
    };

    if (Object.keys(data?.permission || {}).length > 0) {
      const truePermissions = Object.keys(data.permission).filter(
        (key) => data.permission[key] === true
      );

      setInnerDefaultPermission((prev) => {
        let updatedPermissions = { ...prev };

        truePermissions.forEach((perm) => {
          if (!updatedPermissions[perm]) {
            updatedPermissions[perm] = true;
          }
        });

        return updatedPermissions;
      });
    }

    if (
      data.view == "true" ||
      data?.rename == "true" ||
      data.download == "true" ||
      data?.move == "true" ||
      data.share == "true" ||
      data.delete_action == "true" ||
      data.comment == "true" ||
      data?.properties == "true" ||
      data.rights == "true" ||
      data.create_folder == "true" ||
      data.upload_file == "true" ||
      data.upload_folder == "true"
    ) {
      setInnerDefaultPermission(data?.permission);
    }
    getAllfoldernames(apiData);
    setCurrentFolderData(data);
  };
  const callApiHeader = async (data) => {
    if (data.id === "its_me") {
      getAllfoldernames({
        workspace_name: retrievedWorkspaceName,
        workspace_id: retrievedWorkspaceId,
      });
      setCurrentFolderData({
        folder_name: "name",
        levels: 0,
        parent_id: 0,
        id: 0,
      });
      setList([{ id: "its_me", folder_name: workSpaceData.workspace_name }]);
      setInnerDefaultPermission({});
    } else {
      let apiData = {
        parent_id: data.id,
        levels: data.levels + 1,
        workspace_name: retrievedWorkspaceName,
        workspace_id: retrievedWorkspaceId,
      };
      getAllfoldernames(apiData);
      setCurrentFolderData(data);
      let arr = list;
      arr.splice(data.index + 1, 100);
      setList(arr);
      if (data?.permission) {
        const truePermissions = Object.keys(data.permission).filter(
          (key) => data.permission[key] === true
        );

        setInnerDefaultPermission((prev) => {
          if (data?.levels === 0) {
            return prev;
          }

          const updatedPermissions = { ...prev };
          truePermissions.forEach((permission) => {
            delete updatedPermissions[permission];
          });

          return updatedPermissions;
        });

        delete data.permission;
      }
    }
  };
  // ---------------------------------Properties
  const [propertiesModel, setPropertiesModel] = useState({
    status: false,
    data: "",
  });
  const handleClickOpenProperties = (data) => {
    setPropertiesModel({ status: true, data: data });
  };
  const propertiesModelClose = () => {
    setPropertiesModel({ status: false, data: "" });
  };
  // ---------------------------------Properties
  // ---------------------------------Comments
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [openCommets, setOpenCommets] = React.useState(false);
  const [addProperty, setAddProperty] = useState({
    notes: "",
  });
  const handleClickOpenCommets = (data) => {
    setOpenCommets({ status: true, data: data });
    getNoteslist(data);
  };
  const handleCloseCommets = () => {
    setOpenCommets(false);
  };
  const resetFormComment = () => {
    setAddProperty({
      notes: "",
    });
  };
  // ------------------------------------------apis
  const onNotesSubmit = () => {
    let data = {
      id: openCommets?.data,
      notes: addProperty.notes,
    };

    CommonNotes(
      data,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification.success({
            message: "Comment Created Successfully",
            placement: "topRight",
            duration: 3,
            style: {
              height: 60,
            },
          });
          resetFormComment();
          getNoteslist(apiRes?.data?.details?.file_id);
        }
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const getNoteslist = (data) => {
    let data_note = {
      id: data,
    };
    getnotes(
      data_note,
      (apiRes) => {
        setNotes(apiRes.data.details);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const onDeleteClickComment = (id) => {
    let data = {
      id: id,
    };
    deleteNotes(
      data,
      (apiRes) => {
        notification["success"]({
          placement: "topRight",
          description: "",
          message: "Comment Deleted Successfully",
          style: {
            height: 60,
          },
        });
        getNoteslist(openCommets?.data);
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------apis
  const property = () => {
    addProperties?.map((data) => {
      setPropertys(data.metaproperties);
    });
  };
  useEffect(() => {
    property();
  }, [addProperties]);
  const addTask = () => {
    setTodos([...todos, addProperty]);
    setAddProperty("");
  };
  // ---------------------------------Comments
  // ---------------------------------Version
  const [openVersion, setOpenVersion] = React.useState(false);
  const [versionTableData, setVersionTableData] = useState([]);
  const handleClickVersionOpen = (data) => {
    setOpenVersion(true);
    getFileversion(data);
  };
  const handleVersionClose = () => {
    setOpenVersion(false);
  };
  const getFileversion = (data) => {
    let requestData = {
      folder_id: data.folder_id,
      file_name: data.file_name,
      workspace_id: workSpaceData.workspace_id,
    };
    getallversions(
      requestData,
      (apiRes) => {
        setVersionTableData(apiRes);
      },
      (apiErr) => {
        // Handle error case
      }
    );
  };
  // ---------------------------------Version
  // ---------------------------------move
  const [openMove, setOpenMove] = useState(false);
  const [hideMoveData, setHideMoveData] = useState(false);
  const [moveHeader, setMoveHeader] = useState([
    { id: "its_me", folder_name: workSpaceData.workspace_name },
  ]);
  const onClickWorksapce = () => {
    setHideMoveData(false);
  };
  const handleClickMove = (data) => {
    setOpenMove({ status: true, data: data });
  };
  const handleCloseMove = () => {
    setOpenMove(false);
  };
  const moveFileFolder = async (data) => {
    setHideMoveData(true);
    setMoveHeader((prev) => {
      return [...prev, data];
    });
    let apiData = {
      workspace_name: data?.workspace_name,
      workspace_id: JSON.stringify(data?.workspace_id),
    };
    getAllfoldernames(apiData);
  };
  const onSubmitUpdatefolder = () => {
    let data;
    if (openMove?.data?.file_type) {
      data = {
        policies_id: isLogin?.user_type == "Admin" ? "" : ws1Policy?.id,
        file_id: openMove?.data?.id,
        folder_id: currentFolderData.id || null,
        workspace_name: workSpaceData.workspace_name,
        workspace_id: workSpaceData.workspace_id,
      };
    } else {
      data = {
        workspace_name: workSpaceData.workspace_name,
        workspace_id: workSpaceData.workspace_id,
        policies_id: isLogin?.user_type == "Admin" ? "" : ws1Policy?.id,
        levels: currentFolderData.levels,
        parent_id: currentFolderData.id,
        folder_id: openMove?.data?.id || null,
      };
    }
    add_updatefolder(
      data,
      (apiRes) => {
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes?.data?.message,
            style: {
              height: 60,
            },
          });
        }
        handleCloseMove();
      },
      (apiErr) => {}
    );
  };
  // ---------------------------------move
  // ---------------------------------Ws1 Rights

  const [PermissionEditedId, setPermissionEditedId] = useState({});
  const [openDialog, setOpenDialog] = useState({
    status: false,
    data: {},
  });
  const [editPermission, setEditPermission] = useState({});

  const [checkboxWs1, setCheckboxWs1] = useState({
    view: false,
    share: false,
    rename: false,
    upload_folder: false,
    create_folder: false,
    upload_file: false,
    delete: false,
    download: false,
    move: false,
    rights: false,
    comment: false,
    properties: false,
    view_watermark: false,
    download_watermark: false,
  });
  const [permissionForm, setPermissionForm] = useState({
    selected_group: [],
    selected_users: [],
  });
  const handleAutocompleteChange = (id, value) => {
    setPermissionForm((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  useEffect(() => {
    if (permissionForm.selected_users.length) {
      getEditWorkspacePermission();
    }
  }, [permissionForm.selected_users.length]);

  const getEditWorkspacePermission = () => {
    let data = {
      email: permissionForm?.selected_users,
      group: permissionForm?.selected_group,
    };
    if (openDialog?.data?.file_type) {
      data.file_id = openDialog?.data?.id;
    } else {
      data.folder_id = openDialog?.data?.id;
    }
    getWorkspacePermission(
      data,
      (apiRes) => {
        setEditPermission(apiRes.data.workspace_permissions);
      },
      (apiErr) => {}
    );
  };
  const handleOpenPermission = (id, file_name, folder_name, file_type) => {
    setOpenDialog({
      status: true,
      data: {
        id,
        file_name,
        folder_name,
        file_type,
      },
    });
  };
  const handleClosePermission = () => {
    setOpenDialog({
      status: false,
      data: {},
    });
    resetWs1Permission();
  };
  const handleCheckboxWs1 = (event) => {
    const { name, checked } = event.target;
    setCheckboxWs1((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const onSubmitAddPermission = () => {
    let data = {
      policy_type: "My Workspace",
      view: checkboxWs1.view,
      share: checkboxWs1.share,
      rename: checkboxWs1?.rename,
      selected_users: permissionForm?.selected_users,
      selected_group: permissionForm?.selected_group,
      upload_folder: checkboxWs1.upload_folder,
      view_watermark: checkboxWs1?.view_watermark,
      download_watermark: checkboxWs1.download_watermark,
      create_folder: checkboxWs1.create_folder,
      upload_file: checkboxWs1.upload_file,
      delete_per: checkboxWs1.delete,
      download_per: checkboxWs1.download,
      move: checkboxWs1?.move,
      rights: checkboxWs1?.rights,
      comments: checkboxWs1?.comment,
      properties: checkboxWs1?.properties,
      workspace_name: workSpaceData.workspace_name,
      ...(openDialog.data.file_type
        ? { file_id: openDialog.data.id, file_name: openDialog.data.file_name }
        : {
            folder_id: openDialog.data.id,
            folder_name: openDialog.data.folder_name,
          }),
      ...(editPermission?.id && { id: editPermission.id }),
    };
    add_permission(
      data,
      (apiRes) => {
        if (apiRes.status === 200 || apiRes.status === 201) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes?.data?.message,
            style: { height: 60 },
          });
          handleClosePermission();

          let newData = {
            parent_id: currentFolderData?.id,
            levels: currentFolderData?.levels + 1,
            workspace_name: workSpaceData?.workspace_name,
            workspace_id: JSON.stringify(workSpaceData.workspace_id),
          };
          getAllfoldernames(newData);
        }
      },
      (apiErr) => {
        console.error(apiErr);
      }
    );
  };

  useEffect(() => {
    if (editPermission) {
      setCheckboxWs1((prevFormData) => ({
        ...prevFormData,
        view: editPermission.view || false,
        share: editPermission.share || false,
        rename: editPermission.rename || false,
        upload_folder: editPermission.upload_folder || false,
        create_folder: editPermission.create_folder || false,
        upload_file: editPermission.upload_file || false,
        delete: editPermission.delete_per || false,
        download: editPermission.download_per || false,
        move: editPermission.move || false,
        rights: editPermission.rights || false,
        comment: editPermission.comments || false,
        properties: editPermission.properties || false,
        view_watermark: editPermission.view_watermark || false,
        download_watermark: editPermission.download_watermark || false,
      }));
    }
  }, [editPermission]);
  const permissionWs1 = {
    title: "Workspace Permission",
    permissionArray: [
      { label: "View", name: "view" },
      { label: "Move", name: "move" },
      { label: "Share", name: "share" },
      { label: "Rename", name: "rename" },
      {
        label: "Rights",
        name: "rights",
      },
      {
        label: "Delete",
        name: "delete",
      },
      {
        label: "Comments",
        name: "comment",
      },
      {
        label: "Download",
        name: "download",
      },
      {
        label: "Properties",
        name: "properties",
      },
      {
        label: "Upload Folder",
        name: "upload_folder",
      },
      {
        label: "Create Folder",
        name: "create_folder",
      },

      {
        label: "Upload File",
        name: "upload_file",
      },
      {
        label: "View W",
        name: "view_watermark",
      },
      {
        label: "Download W",
        name: "download_watermark",
      },
    ],
    buttonLabels: {
      agree: "Grant Access",
      disagree: "Deny Access",
    },
  };
  const resetWs1Permission = () => {
    setCheckboxWs1({
      view: false,
      share: false,
      rename: false,
      upload_folder: false,
      create_folder: false,
      upload_file: false,
      delete: false,
      download: false,
      move: false,
      rights: false,
      comment: false,
      properties: false,
      view_watermark: false,
      download_watermark: false,
    });
    setPermissionEditedId({});
    setPermissionForm({
      selected_group: [],
      selected_users: [],
    });
    setEditPermission({});
  };

  // ---------------------------------Ws1 Rights
  // ---------------------------------workspace Permission
  // useEffect(() => {
  //   workspacePermission();
  // }, [workspace?.length]);
  // const workspacePermission = () => {
  //   workspace?.map((data) => {
  //     if (data.workspace_name == workSpaceData?.workspace_name) {
  //       setWorkspacePermissionWs1(data.workspacePermission);
  //     }
  //   });
  // };
  const [loginUserPermission, setLoginUserPermission] = useState("");
  useEffect(() => {
    workspacePermission();
    getallfolderPermission();
  }, [workspace.length, workSpaceData, shareId.id, PermissionEditedId.id]);

  const workspacePermission = () => {
    workspace?.forEach((data) => {
      if (data.workspace_name === workSpaceData?.workspace_name) {
        setLoginUserPermission(data.selected_users);
        setWorkspacePermissionWs1(data.workspacePermission);
      }
    });
  };
  const getallfolderPermission = () => {
    allfolderlist?.forEach((data) => {
      if (
        (data.workspace_name === workSpaceData?.workspace_name &&
          data.id === shareId.id) ||
        data.id === PermissionEditedId.id
      ) {
        setGetAllfolderPermission(data.permission);
      }
    });
  };
  // ---------------------------------workspace Permission
  // ---------------------------------sharingcancel
  const [openShare, setOpenShare] = React.useState({
    status: false,
    data: {},
  });
  const handleClickShareOpen = (id, file_type) => {
    setOpenShare({
      status: true,
      data: { id, file_type },
    });
  };
  const handleCloseShare = () => {
    setOpenShare({
      status: false,
      data: "",
    });
  };
  const onSharingcancel = (id, file_type) => {
    let data;
    if (file_type) {
      data = { file_id: id };
    } else {
      data = { folder_id: id };
    }
    sharingcancel(
      data,
      (apiRes) => {
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "topRight",
            description: "",
            message: "All Sharing Cancel Successfully",
            style: {
              height: 60,
            },
          });
          handleCloseShare();
        }
        let newData = {
          parent_id: currentFolderData?.id,
          levels: currentFolderData?.levels + 1,
          workspace_id: JSON.stringify(workSpaceData.workspace_id),
          workspace_name: workSpaceData?.workspace_name,
        };
        getAllfoldernames(newData);
      },
      (apiErr) => {}
    );
  };
  // ---------------------------------sharingcancel
  // ---------------------------------folderupload
  const [openUploadFolder, setOpenUploadFolder] = useState(false);

  const handleClickOpenUploadFolder = () => {
    setOpenUploadFolder(true);
  };

  const handleCloseUploadFolder = () => {
    setOpenUploadFolder(false);
    setCurrentFile(null);
    setProgressFolderUpload(0);
  };

  const [progressFolderUpload, setProgressFolderUpload] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [totalFiles, setTotalFiles] = useState("");
  const [zipFolder, setZipFolder] = useState({});
  let token = localStorage.getItem("token") || "";

  const updateImageDisplay = (event) => {
    const zip = new JSZip();
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      zip.file(file.webkitRelativePath, file);
    });
    const folderName = files[0].webkitRelativePath.split("/")[0];
    setFolderName(folderName);
    setTotalFiles(event?.target?.files?.length);
    zip
      .generateAsync({ type: "blob" }, (metadata) => {
        setProgressFolderUpload(metadata.percent.toFixed(2));
        if (metadata.currentFile) {
          setCurrentFile(metadata.currentFile);
        }
      })

      .then((content) => {
        setZipFolder(content);
      })
      .catch((error) => {
        console.error("Error generating ZIP file:", error);
      });
  };
  const folderUpload = () => {
    const data = {
      workspace_id: workSpaceData.workspace_id,
      workspace_name: workSpaceData.workspace_name,
      policies_id: isLogin?.user_type === "Admin" ? "" : ws1Policy?.id,
      workspace_type: "My Workspace",
      parent_id: currentFolderData?.id,
      level: currentFolderData?.id ? currentFolderData?.levels + 1 : 0,
    };

    const formData = new FormData();
    formData.append("folder", zipFolder, `${folderName}.zip`);
    formData.append("data", JSON.stringify(data));

    fetch(`${process.env.REACT_APP_API_URL_LOCAL}/uploadfolder`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == true) {
          notification["success"]({
            placement: "top",
            description: "",
            message: data?.message,
          });
          handleCloseUploadFolder();
          let newData = {
            parent_id: currentFolderData?.id,
            levels: currentFolderData?.levels + 1,
            workspace_name: workSpaceData?.workspace_name,
            workspace_id: JSON.stringify(workSpaceData.workspace_id),
          };
          getAllfoldernames(newData);
        } else {
          notification["warning"]({
            placement: "top",
            description: "",
            message: data.message,
          });
          handleCloseUploadFolder();
        }
      })
      .catch((apiErr) => {
        console.log("Error uploading file:", apiErr);
      });
  };
  // ---------------------------------folderupload
  const [openQRGenerate, setOpenQRGenerate] = useState(false);
  const qrData = "fileshare.acme.in:8086"; 

  const handleClickOpenQRGenerate = () => {
    setOpenQRGenerate(true);
  };

  const handleCloseQRGenerate = () => {
    setOpenQRGenerate(false);
  };

  const downloadQRCode = () => {
    const cardElement = document.getElementById("qr-card");
    if (!cardElement) {
      console.error("QR card element not found");
      return;
    }

    html2canvas(cardElement)
      .then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "qr-card.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error capturing the QR card:", error);
      });
  };
  return (
    <React.Fragment>
      <Head title="My Workspace - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          {loading ? (
            <LinearProgress
              color="primary"
              sx={{
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "rgb(16, 25, 36)",
                  width: "400px",
                  animationDuration: "3000ms",
                },
              }}
              style={{
                width: "100%",
                position: "absolute",
                zIndex: 100,
                top: 5,
                left: 0,
                backgroundColor: "lightgray",
              }}
            />
          ) : (
            ""
          )}
          {progressBar > 0 && progressBar < 100 && (
            <div
              style={{
                width: "100%",
                position: "absolute",
                zIndex: 100,
                top: -3,
                left: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "grey",
                  height: "5px",
                  flex: 1,
                  position: "relative",
                  borderRadius: "3px",
                }}
              >
                <div
                  style={{
                    width: `${progressBar}%`,
                    backgroundColor: "#203556",
                    height: "100%",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
              <div
                style={{
                  color: "#463a99",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  position: "relative",
                  top: "5px",
                  marginRight: "10px",
                }}
              >
                {progressBar}%
              </div>
            </div>
          )}
          <ModalPop
            open={openDelete.status}
            handleOkay={onDeleteClick}
            data={openDelete?.data?.id}
            handleClose={handleCloseDelete}
            file_type={openDelete.data.file_type}
            title={
              openDelete.data.file_type
                ? "File Deleted?  You Sure!"
                : "Folder Deleted?  You Sure!"
            }
          />
          <QRGenerate
            qrData={qrData}
            open={openQRGenerate}
            onFileDownload={onFileDownload}
            downloadQRCode={downloadQRCode}
            handleClose={handleCloseQRGenerate}
          />
          <ModalPop
            open={openShare.status}
            handleOkay={onSharingcancel}
            data={openShare?.data?.id}
            handleClose={handleCloseShare}
            file_type={openShare.data.file_type}
            title="Sharing Cancel? You Sure!"
          />
          <FileFolderProperties
            list={list}
            propertiesModel={propertiesModel}
            propertiesModelClose={propertiesModelClose}
          />
          <Ws1_Rights
            title="Add Permissions"
            autocomplete="true"
            isLogin={isLogin}
            data={openDialog.data}
            permission={permissionWs1}
            checkboxValues={checkboxWs1}
            openDialog={openDialog.status}
            groupsDropdown={groupsDropdown}
            permissionForm={permissionForm}
            userDropdowns={permissionUserList}
            handleCheckboxWs1={handleCheckboxWs1}
            handleClickPermission={onSubmitAddPermission}
            handleClosePermission={handleClosePermission}
            getAllfolderPermission={getAllfolderPermission}
            workspacePermissionWs1={workspacePermissionWs1}
            handleAutocompleteChange={handleAutocompleteChange}
          />
          <FileFolderComments
            notes={notes}
            addTask={addTask}
            addProperty={addProperty}
            openCommets={openCommets}
            onNotesSubmit={onNotesSubmit}
            setAddProperty={setAddProperty}
            handleCloseCommets={handleCloseCommets}
            onDeleteClickComment={onDeleteClickComment}
          />
          <FileVersion
            openVersion={openVersion}
            onFileDownload={onFileDownload}
            versionTableData={versionTableData}
            handleOpenDeleteFile={handleClickOpen}
            handleVersionClose={handleVersionClose}
          />
          <FileFolderMove
            list={list}
            callApi={callApi}
            moveData={moveData}
            openMove={openMove}
            hideMoveData={hideMoveData}
            findFolder={findFolder}
            onClickWorksapce={onClickWorksapce}
            allMoveFile={allMoveFile}
            callApiHeader={callApiHeader}
            moveFileFolder={moveFileFolder}
            handleCloseMove={handleCloseMove}
            onSubmitUpdatefolder={onSubmitUpdatefolder}
          />
          <CreateLinkModel
            error={error}
            validity="true"
            minDate={minDate}
            maxDate={maxDate}
            isLogin={isLogin}
            moveData={moveData}
            openLink={openLink}
            password={password}
            guestFromshow="true"
            workspace={workspace}
            shareLink={shareLink}
            teamSpace={teamSpace}
            errorMessage={errorMessage}
            selectedDate={selectedDate}
            userDropdowns={userDropdowns}
            accesscheckbox={checkboxData}
            shareFormData={shareFormData}
            checkboxValues={checkboxValues}
            setSelectedDate={setSelectedDate}
            handleShareData={handleShareData}
            handleLinkClose={handleLinkClose}
            handleDateChange={handleDateChange}
            handleSubmitShareData={onFetchlink}
            handlePasswordChange={handlePasswordChange}
            handleCheckboxChange={handleCheckboxChange}
            getAllfolderPermission={getAllfolderPermission}
            workspacePermissionWs1={workspacePermissionWs1}
          />
          <FolderUpload
            folderName={folderName}
            totalFiles={totalFiles}
            currentFile={currentFile}
            folderUpload={folderUpload}
            openUploadFolder={openUploadFolder}
            updateImageDisplay={updateImageDisplay}
            progressFolderUpload={progressFolderUpload}
            handleCloseUploadFolder={handleCloseUploadFolder}
          />
          <FileUpload
            loading={loading}
            selectedFile={file}
            fileName={fileName}
            open={openFileModal}
            userquota={userquota}
            formValues={formValues}
            editFileId={editFileId}
            close={onCancelUpload}
            handleOkay={handleSubmit}
            Properties={addProperties}
            docListUpload={docListUpload}
            fileNameInput={fileNameInput}
            handleChangeFile={handleChangeFile}
            matchedWorkspace={matchedWorkspace}
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            handleCloseFileModal={handleCloseFileModal}
            inputRef={inputRef}
            onChooseFile={onChooseFile}
            progress={progress}
            doctypeName={doctypeName}
            uploadStatus={uploadStatus}
            multiplefilesArray={multiplefilesArray}
            clearFileInput={clearFileInput}
            handleDoctypeAutocomplete={handleDoctypeAutocomplete}
            fileDesc={(e) => {
              setFileDesc(e.target.value);
            }}
          />
          <WS1Header
            sm={sm}
            list={list}
            isLogin={isLogin}
            updateSm={updateSm}
            heading="My Workspace"
            userData={userData}
            policies={propertys}
            findFolder={findFolder}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            callApiHeader={callApiHeader}
            openFileUpload={handleOpenFileModal}
            openFolderModal={handleOpenFolderModal}
            loginUserPermission={loginUserPermission}
            openFolderUpload={handleClickOpenUploadFolder}
            innerDefaultPermission={innerDefaultPermission}
            workspacePermissionWs1={workspacePermissionWs1}
            openModal1={() => setFileModal({ ...fileModal, status: true })}
          />
          <Foldercreate
            id={id}
            type="form"
            input={input}
            title="Create Folder"
            open={openFolderModal}
            buttonSuccessTitle="Create"
            addNew={onFolderFormSubmit}
            editFolderId={editFolderId}
            handleChange={handleChangeFolder}
            folderNameInput={folderNameInput}
            handleClose={handleCloseFolderModal}
            inputList={[
              { type: "text", name: "name", placeholder: "Enter Folder Name" },
            ]}
          />
          <CommonTable
            rows={allfolderlist}
            callApi={callApi}
            isLogin={isLogin}
            propertys={propertys}
            headCells={tableHeader}
            searchTerm={searchTerm}
            disabledBtn={disabledBtn}
            setPropertys={setPropertys}
            workspace_type="my-workspace"
            allfolderlist={allfolderlist}
            onFileDownload={onFileDownload}
            handleClickMove={handleClickMove}
            onEditFileClick={onEditFileClick}
            onDownloadfolders={onDownloadfolders}
            handleOpenDeleteFile={handleClickOpen}
            openEditFolderModal={onEditFolderClick}
            loginUserPermission={loginUserPermission}
            handleClickLinkOpen={handleClickLinkOpen}
            handleClickShareOpen={handleClickShareOpen}
            handleOpenPermission={handleOpenPermission}
            innerDefaultPermission={innerDefaultPermission}
            workspacePermissionWs1={workspacePermissionWs1}
            handleClickVersionOpen={handleClickVersionOpen}
            handleClickOpenCommets={handleClickOpenCommets}
            onFileWatermarkDownload={onFileWatermarkDownload}
            handleClickOpenQRGenerate={handleClickOpenQRGenerate}
            handleClickOpenProperties={handleClickOpenProperties}
          />
        </Stack>
      </Content>
    </React.Fragment>
  );
};
export default WS1;

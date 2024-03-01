import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { LinearProgress, Stack } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import Ws1_Rights from "../../components/Forms/Ws1_Rights.jsx";
import CreateLinkModel from "../../components/CreateLinkModel";
import FileVersion from "../../components/FileVersion/index.jsx";
import FileFolderMove from "../../components/FileFolderMove/index.jsx";
import TeamSpaceTable from "../../components/AllTables/TeamSpaceTable.jsx";
import TeamSpaceHeader from "../../components/TeamSpace/TeamSpaceHeader.jsx";
import FileFolderComments from "../../components/FileFolderComments/index.jsx";
import FileFolderProperties from "../../components/FileFolderProperties/index.jsx";
import TeamSpaceFileUpload from "../../components/TeamSpace/TeamSpaceFileUpload.jsx";
import TeamSpaceFolderCreate from "../../components/TeamSpace/TeamSpaceFolderCreate.jsx";
const WS1 = () => {
  useEffect(() => {
    getAllfoldernames({
      workspace_id: retrievedWorkspaceId,
      workspace_name: workSpaceData.workspace_name,
    }),
      getdoclistuploadfile();
    getWorkspaces();
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
    getallversions,
    add_permission,
    addcreatefolder,
    add_updatefolder,
    getGroupsDropdown,
    getfoldernameslist,
    add_metaproperties,
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
  const PermissionPolicy = isLogin?.Permission;
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
  useEffect(() => {
    getWorkspaces();
  }, []);
  useEffect(() => {
    workspacePermission();
  }, [workspace?.length]);
  const workspacePermission = () => {
    workspace?.map((data) => {
      if (data.workspace_name == workSpaceData?.workspace_name) {
        setWorkspacePermissionWs1(data.workspacePermission);
      }
    });
  };

  // useEffect(() => {
  //   getfoldernameslist();
  // }, []);
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
    ?.filter((data) => data.workspace_name === workSpaceData?.workspace_name)
    .map((data) => data);

  // ------------------------------------------------getApis End
  // ------------------------------------------------Doc Type Start
  const [doctypeName, setDoctypeName] = useState("");
  const handleDoctypeAutocomplete = (doctype) => {
    if (doctype) {
      onSubmitProperties(doctype);
      setDoctypeName(doctype);
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
      (apiErr) => {}
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
      (apiErr) => {}
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
        (apiErr) => {}
      );
    } else {
      let data = {
        workspace_id: JSON.stringify(workSpaceData.workspace_id),
        workspace_name: workSpaceData.workspace_name,
        workspace_type: "TeamSpace",
        policies_id:
          isLogin?.user_type == "Admin" ? "" : PermissionPolicy[0]?.id,
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
        (apiErr) => {}
      );
    }
  };
  const onEditFolderClick = (id) => {
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
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editFileId, setEditFileId] = useState(0);
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
    setOpenFileModal(false);
    resetFileForm();
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
  const onEditFileClick = (id) => {
    allfolderlist.map((item) => {
      if (item?.id == id) {
        setFileNameInput((prevFormData) => ({
          ...prevFormData,
          name: item.file_name,
          file_description: item.file_description,
        }));
        setDoctypeName(item.doctype);
      }
    });
    setEditFileId(id);
    handleOpenFileModal();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editFileId) {
      const data = {
        file_id: editFileId,
        doctype: doctypeName,
        Feilds_Name: formValues,
        new_file_name: fileNameInput?.name,
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
        setLoading(true);
        const data = {
          workspace_id: workSpaceData.workspace_id,
          workspace_name: workSpaceData.workspace_name,
          folder_id: currentFolderData.id || null,
          policies_id:
            isLogin?.user_type == "Admin" ? "" : PermissionPolicy[0]?.id,
          doctype: doctypeName,
          fileDesc: fileNameInput?.file_description,
          file_Size: file.size,
          Feilds_Name: formValues,
          workspace_type: "TeamSpace",
        };
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify(data));
        const quary = [[file.size], [workSpaceData.workspace_name]];
        const file_type = file.name?.split(".")[1];
        const response = await axios.post(
          `${
            process.env.REACT_APP_API_URL_LOCAL
          }/uploadcreate?q=${quary}&fileExtension=${file_type}&workspace_type=${"TeamSpace"}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
          setLoading(false);
          handleCloseFileModal();
          let newData = {
            parent_id: currentFolderData?.id,
            levels: currentFolderData?.levels + 1,
            workspace_id: JSON.stringify(workSpaceData.workspace_id),
            workspace_name: workSpaceData?.workspace_name,
          };
          getAllfoldernames(newData);
        }
      } catch (error) {
        if (error?.response?.status == 400) {
          notification["warning"]({
            placement: "top",
            description: "",
            message: error.response.data.message,
            style: {
              height: 60,
            },
          });
        }
        setLoading(false);
      }
    }
  };
  const CancelFileUpload = () => {
    handleCloseFileModal();
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/cancelfileupload`;

    axios
      .post(apiUrl, {})
      .then((response) => {
        if (response.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: response.data.message,
            style: {
              height: 60,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const resetFileForm = () => {
    setFileNameInput({
      name: "",
      file_description: "",
    });
    setEditFileId(0);
    setFile("");
    setFormValues({});
    setDoctypeName("");
  };
  // ------------------------------------------------file upload
  // ------------------------------------------------file Download
  const onDownloadfolders = (filemongo_id, folder_name) => {
    const apiUrl = `${process.env.REACT_APP_API_URL_LOCAL}/downloadfolders`;
    const requestData = { folder_id: filemongo_id };
    axios
      .post(apiUrl, requestData, { responseType: "arraybuffer" })
      .then((response) => {
        notification["success"]({
          placement: "top",
          description: "",
          message: "Folder Download Successfully...",
          style: {
            height: 60,
          },
        });
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
        notification["success"]({
          placement: "top",
          description: "",
          message: "File Download Successfully...",
          style: {
            height: 60,
          },
        });
        const blob = new Blob([response.data]);
        const fileName = file_name;
        // Use the split() method to separate the name and extension
        const parts = fileName.split(".");
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
  });
  const handleClickLinkOpen = (id, file_type, name) => {
    setShareId({ id: id, file_type: file_type, name: name });
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
  const handleFileClose = () => {
    resetFileForm();
    setLoading(false);
  };
  const handleSubmitShareData = () => {
    onFetchlink();
  };
  const onFetchlink = () => {
    handleLinkClose();
    let data = {
      id: shareId.id,
      link_expiry: selectedDate,
      user_type: shareFormData.Type,
      email: shareFormData?.Email,
      file_type: shareId.file_type || "",
      workspace_name: shareFormData.workspace_name,
      name: shareId.name,
      message: shareFormData.Message,
      subject: shareFormData.Subject,
      password: shareFormData.Password,
      user_email: shareFormData?.userDropdowns?.email,
      view: checkboxValues.view,
      share: checkboxValues.share,
      rename: checkboxValues.rename,
      upload_folder: checkboxValues.upload_folder,
      create_folder: checkboxValues.create_folder,
      upload_file: checkboxValues.upload_file,
      delete_action: checkboxValues.delete,
      download: checkboxValues.download,
      move: checkboxValues.move,
      rights: checkboxValues.rights,
      comment: checkboxValues.comment,
      properties: checkboxValues.properties,
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
            height: 60,
          },
        });
      },
      (apiErr) => {
        // For example, you can show an error notification if needed
        notification["error"]({
          placement: "top",
          description: "An error occurred while sharing the link.",
          message: "Error",
          style: {
            height: 60,
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
    });
  };
  // ------------------------------------------------Reset Form End
  const [propertys, setPropertys] = useState([]);
  const [folderList, setFolderList] = useState([{ name: "test" }]);
  const tableHeader = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Folder / File Name ",
    },

    {
      id: "Update Date/Time",
      numeric: false,
      disablePadding: true,
      label: "Update D/T",
    },
    {
      id: "Shared By",
      numeric: false,
      disablePadding: true,
      label: "Shared By",
    },
    {
      id: "Shared With",
      numeric: false,
      disablePadding: true,
      label: "Shared With",
    },
    {
      id: "Size",
      numeric: false,
      disablePadding: true,
      label: "Size",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Actions",
      style: { marginLeft: "230px" },
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
    }
  };
  // ---------------------------------Properties
  const [propertiesModel, setPropertiesModel] = useState(false);
  const handleClickOpenProperties = (data) => {
    setPropertiesModel({ status: true, data: data });
  };
  const propertiesModelClose = () => {
    setPropertiesModel(false);
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
            placement: "topRight", // Adjust placement as needed
            duration: 3, // Set the duration (in seconds) the notification is displayed
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
        getNoteslist();
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
        policies_id:
          isLogin?.user_type == "Admin" ? "" : PermissionPolicy[0]?.id,
        file_id: openMove?.data?.id,
        folder_id: currentFolderData.id || null,
        workspace_name: workSpaceData.workspace_name,
        workspace_id: retrievedWorkspaceId,
      };
    } else {
      data = {
        workspace_name: workSpaceData.workspace_name,
        workspace_id: retrievedWorkspaceId,
        policies_id:
          isLogin?.user_type == "Admin" ? "" : PermissionPolicy[0]?.id,
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

  const checkboxData = [
    { label: "View", name: "view", style: { marginLeft: "-8.8px" } },
    { label: "Move", name: "move", style: { marginLeft: "11px" } },
    { label: "Share", name: "share", style: { marginLeft: "35px" } },
    { label: "Rights", name: "rights", style: { marginLeft: "29px" } },
    { label: "Rename", name: "rename" },
    { label: "Delete", name: "delete", style: { marginLeft: "-10px" } },
    {
      label: "Comments",
      name: "comment",
      style: { marginLeft: "30px" },
    },
    {
      label: "Download",
      name: "download",
      style: { marginLeft: "-6px" },
    },
    {
      label: "Properties",
      name: "properties",
    },
    {
      label: "Upload Folder",
      name: "upload_folder",
      style: { marginLeft: "-25px" },
    },
    {
      label: "Create Folder",
      name: "create_folder",
      style: { marginLeft: "-22px" },
    },

    {
      label: "Upload File",
      name: "upload_file",
      style: { marginLeft: "-22px" },
    },
  ];
  const [PermissionEditedId, setPermissionEditedId] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [permissionForm, setPermissionForm] = useState({
    selected_group: [],
    selected_users: [],
  });
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
  });

  const handleAutocompleteChange = (id, value) => {
    setPermissionForm((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleOpenPermission = (id, file_type, file_name, folder_name) => {
    setOpenDialog({
      status: true,
      data: { id, file_type, file_name, folder_name },
    });
  };
  const handleClosePermission = () => {
    setOpenDialog(false);
    resetWs1Permission();
  };
  const handleCheckboxWs1 = (event) => {
    const { name, checked } = event.target;
    setCheckboxWs1((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const onSubmitAddPermission = (id, file_type, file_name, folder_name) => {
    if (PermissionEditedId?.permissionId) {
      let data;
      if (PermissionEditedId.file_type) {
        data = {
          id: PermissionEditedId?.permissionId,
          file_id: PermissionEditedId?.id,
          file_name: PermissionEditedId.file_name,
          policy_type: "TeamSpace",
          view: checkboxWs1.view,
          share: checkboxWs1.share,
          rename: checkboxWs1.rename,
          selected_users: permissionForm?.selected_users,
          selected_group: permissionForm?.selected_group,
          upload_folder: checkboxWs1.upload_folder,
          create_folder: checkboxWs1.create_folder,
          upload_file: checkboxWs1.upload_file,
          delete_per: checkboxWs1.delete,
          download_per: checkboxWs1.download,
          move: checkboxWs1.move,
          rights: checkboxWs1.rights,
          comments: checkboxWs1.comment,
          properties: checkboxWs1.properties,
        };
      } else {
        data = {
          id: PermissionEditedId?.permissionId,
          folder_id: PermissionEditedId?.id,
          folder_name: PermissionEditedId.folder_name,
          policy_type: "TeamSpace",
          view: checkboxWs1.view,
          share: checkboxWs1.share,
          rename: checkboxWs1.rename,
          selected_users: permissionForm?.selected_users,
          selected_group: permissionForm?.selected_group,
          upload_folder: checkboxWs1.upload_folder,
          create_folder: checkboxWs1.create_folder,
          upload_file: checkboxWs1.upload_file,
          delete_per: checkboxWs1.delete,
          download_per: checkboxWs1.download,
          move: checkboxWs1.move,
          rights: checkboxWs1.rights,
          comments: checkboxWs1.comment,
          properties: checkboxWs1.properties,
        };
      }

      add_permission(
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
            handleClosePermission();
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
    } else {
      let data;
      if (file_type) {
        data = {
          file_id: id,
          policy_type: "TeamSpace",
          file_name: file_name,
          view: checkboxWs1.view,
          share: checkboxWs1.share,
          rename: checkboxWs1.rename,
          selected_users: permissionForm?.selected_users,
          selected_group: permissionForm?.selected_group,
          upload_folder: checkboxWs1.upload_folder,
          create_folder: checkboxWs1.create_folder,
          upload_file: checkboxWs1.upload_file,
          delete_per: checkboxWs1.delete,
          download_per: checkboxWs1.download,
          move: checkboxWs1.move,
          rights: checkboxWs1.rights,
          comments: checkboxWs1.comment,
          properties: checkboxWs1.properties,
        };
      } else {
        data = {
          folder_id: id,
          policy_type: "TeamSpace",
          view: checkboxWs1.view,
          share: checkboxWs1.share,
          folder_name: folder_name,
          rename: checkboxWs1.rename,
          selected_users: permissionForm?.selected_users,
          selected_group: permissionForm?.selected_group,
          upload_folder: checkboxWs1.upload_folder,
          create_folder: checkboxWs1.create_folder,
          upload_file: checkboxWs1.upload_file,
          delete_per: checkboxWs1.delete,
          download_per: checkboxWs1.download,
          move: checkboxWs1.move,
          rights: checkboxWs1.rights,
          comments: checkboxWs1.comment,
          properties: checkboxWs1.properties,
        };
      }

      add_permission(
        data,
        (apiRes) => {
          if (apiRes.status === 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiRes?.data?.message,
              style: {
                height: 60,
              },
            });
            handleClosePermission();
          }
          let newData = {
            parent_id: currentFolderData?.id,
            levels: currentFolderData?.levels + 1,
            workspace_name: workSpaceData?.workspace_name,
            workspace_id: JSON.stringify(workSpaceData.workspace_id),
          };
          getAllfoldernames(newData);
        },
        (apiErr) => {}
      );
    }
  };
  const onEditPermissionClick = (
    id,
    permissionId,
    file_name,
    folder_name,
    file_type
  ) => {
    setOpenDialog({ status: true });
    allfolderlist.map((item) => {
      const permissionData = item.permission;
      if (item?.permission?.id == permissionId) {
        setCheckboxWs1((prevFormData) => ({
          ...prevFormData,
          view: permissionData?.view,
          share: permissionData?.share,
          rename: permissionData?.rename,
          upload_folder: permissionData?.upload_folder,
          create_folder: permissionData?.create_folder,
          upload_file: permissionData?.upload_file,
          delete: permissionData?.delete_per,
          download: permissionData?.download_per,
          move: permissionData?.move,
          rights: permissionData?.rights,
          comment: permissionData?.comments,
          properties: permissionData?.properties,
        }));
      }
      setPermissionEditedId({
        id: id,
        file_name: file_name,
        folder_name: folder_name,
        file_type: file_type,
        permissionId: permissionId,
      });
    });
  };
  const permissionWs1 = {
    title: "Workspace Permission",
    permissionArray: [
      { label: "View", name: "view" },
      { label: "Move", name: "move" },
      { label: "Share", name: "share" },
      {
        label: "Rights",
        name: "rights",
      },
      { label: "Rename", name: "rename" },
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
    });
    setPermissionEditedId(0);
    setPermissionForm({
      selected_group: [],
      selected_users: [],
    });
  };

  // ---------------------------------Ws1 Rights
  return (
    <>
      <Head title="TeamSpace - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-58px" }}>
          {loading ? (
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
                top: 5,
                left: 0,
                backgroundColor: "lightgray",
              }}
            />
          ) : (
            ""
          )}
          <ModalPop
            open={openDelete.status}
            handleClose={handleCloseDelete}
            handleOkay={onDeleteClick}
            title={
              openDelete.data.file_type
                ? "File Deleted?  You Sure!"
                : "Folder Deleted?  You Sure!"
            }
            data={openDelete?.data?.id}
            file_type={openDelete.data.file_type}
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
            permissionForm={permissionForm}
            permission={permissionWs1}
            checkboxValues={checkboxWs1}
            userDropdowns={permissionUserList}
            openDialog={openDialog.status}
            groupsDropdown={groupsDropdown}
            workspacePermissionWs1={workspacePermissionWs1}
            handleClickPermission={onSubmitAddPermission}
            handleCheckboxChange={handleCheckboxWs1}
            handleClosePermission={handleClosePermission}
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
            moveData={moveData}
            openLink={openLink}
            workspace={workspace}
            teamSpace={teamSpace}
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
            accesscheckbox={checkboxData}
          />
          <TeamSpaceFileUpload
            open={openFileModal}
            editFileId={editFileId}
            loading={loading}
            fileNameInput={fileNameInput}
            handleChangeFile={handleChangeFile}
            matchedWorkspace={matchedWorkspace}
            selectedFile={file}
            handleDoctypeAutocomplete={handleDoctypeAutocomplete}
            fileName={fileName}
            close={CancelFileUpload}
            handleOkay={handleSubmit}
            Properties={addProperties}
            docListUpload={docListUpload}
            handleFileChange={handleFileChange}
            handleCloseFileModal={handleCloseFileModal}
            fileDesc={(e) => {
              setFileDesc(e.target.value);
            }}
            handleInputChange={handleInputChange}
            formValues={formValues}
          />
          <TeamSpaceHeader
            openFolderModal={handleOpenFolderModal}
            openModal1={() => setFileModal({ ...fileModal, status: true })}
            sm={sm}
            list={list}
            isLogin={isLogin}
            updateSm={updateSm}
            userData={userData}
            policies={propertys}
            findFolder={findFolder}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            callApiHeader={callApiHeader}
            openFileUpload={handleOpenFileModal}
            workspacePermissionWs1={workspacePermissionWs1}
          />
          <TeamSpaceFolderCreate
            open={openFolderModal}
            handleClose={handleCloseFolderModal}
            title="Create Folder"
            buttonSuccessTitle="Create"
            id={id}
            addNew={onFolderFormSubmit}
            editFolderId={editFolderId}
            input={input}
            type="form"
            inputList={[
              { type: "text", name: "name", placeholder: "Enter Folder Name" },
            ]}
            handleChange={handleChangeFolder}
            folderNameInput={folderNameInput}
          />

          <TeamSpaceTable
            rows={folderList}
            callApi={callApi}
            isLogin={isLogin}
            propertys={propertys}
            headCells={tableHeader}
            searchTerm={searchTerm}
            setPropertys={setPropertys}
            allfolderlist={allfolderlist}
            onFileDownload={onFileDownload}
            handleClickMove={handleClickMove}
            PermissionPolicy={PermissionPolicy}
            onDownloadfolders={onDownloadfolders}
            handleOpenDeleteFile={handleClickOpen}
            handleClickLinkOpen={handleClickLinkOpen}
            handleOpenPermission={handleOpenPermission}
            onEditPermissionClick={onEditPermissionClick}
            workspacePermissionWs1={workspacePermissionWs1}
            handleClickVersionOpen={handleClickVersionOpen}
            handleClickOpenCommets={handleClickOpenCommets}
            handleClickOpenProperties={handleClickOpenProperties}
            openEditFolderModal={onEditFolderClick}
            onEditFileClick={onEditFileClick}
          />
        </Stack>
      </Content>
    </>
  );
};
export default WS1;

import React, { useContext, useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import ModalPop from "../../components/Modal";
import { Stack } from "@mui/material";
import WS1Header from "../../components/WS1Header.jsx";
import CommonTable from "../../components/Table";
import FileUpload from "../../components/FileUploadModal";
import axios from "axios";
const WS1 = () => {
  useEffect(() => {
    getAllfoldernames({
      workspace_name: workSpaceData.workspace_name,
    }),
      getdoclistuploadfile();
  }, []);
  const {
    contextData,
    workSpaceData,
    getdoclist,
    getfoldernameslist,
    addcreatefolder,
    add_metaproperties,
    adduploadcreate,
  } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);
  const [userData, setUserData] = contextData;
  const [sm, updateSm] = useState(false);
  const [docListUpload, setDocListupload] = useState([]);
  const [fileDesc, setFileDesc] = useState("");
  const [formValues, setFormValues] = useState({});
  const [doctypeName, setDoctypeName] = useState("");
  const [addProperties, setAddProperties] = useState([]);
  const [folderNameInput, setFolderNameInput] = useState({
    name: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFolderNameInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [fileModal, setFileModal] = useState({
    status: false,
    data: "",
  });
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setUserData([...newData]);
  }, []);

  const resetForm = () => {
    setFolderNameInput({
      name: "",
    });
  };
  const resetFileForm = () => {
    setFileDesc("");
    setFormValues({});
    setDoctypeName("");
  };
  // ------------------------------------------------getApis Start
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
  const getAllfoldernames = (
    data = { workspace_name: workSpaceData?.workspace_name }
  ) => {
    getfoldernameslist(
      data,
      (apiRes) => {
        setAllfolderlist(apiRes?.data?.folders);
        setAllfile(apiRes?.data?.files);
      },
      (apiErr) => {
        console.log("====> api get folder name", apiErr);
      }
    );
  };
  // ------------------------------------------------getApis End

  // ------------------------------------------------postApis Start

  const onFormSubmit = () => {
    let data = {
      workspace_id: workSpaceData.workspace_id,
      workspace_name: workSpaceData.workspace_name,
      folder_name: folderNameInput.name,
      levels: currentFolderData.levels,
      parent_id: currentFolderData.parent_id,
      folder_id: currentFolderData.id,
    };

    addcreatefolder(
      data,
      async (apiRes) => {
        handleClose();
        resetForm();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
    let newData = {
      levels: currentFolderData.levels + 1,
      parent_id: currentFolderData.id,
      workspace_name: workSpaceData.workspace_name,
    };
    getAllfoldernames(newData);
  };
  const handleOnClick = (selectedOption) => {
    onSubmitProperties(selectedOption);
    setDoctypeName(selectedOption?.doctype_name);
  };
  const onSubmitProperties = (selectedOption) => {
    let data = {
      doctype: selectedOption.doctype_name,
    };
    add_metaproperties(
      data,
      (apiRes) => {
        setAddProperties(apiRes.data);
        getUsers();
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------------postApis End

  // ------------------------------------------file upload

  const [folderName, setFolderName] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    resetFileForm();
    let data = {
      folder_name: folderName?.folder_name,
      doctype: doctypeName,
      fileDesc: fileDesc,
      Feilds_Name: formValues,
    };
    setFileUpload(false);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(data));
    axios
      .post(`${process.env.REACT_APP_API_URL_LOCAL}/uploadcreate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {});
  };

  // ------------------------------------------file upload

  const [allfolderlist, setAllfolderlist] = useState([]);
  const [allfile, setAllfile] = useState([]);
  const [open, setOpen] = useState({
    status: false,
    data: "",
  });

  const handleClose = () => {
    setOpen({
      status: false,
      data: "",
    });
  };

  const [folderList, setFolderList] = useState([{ name: "test" }]);
  const [fileUpload, setFileUpload] = useState(false);
  const tableHeader = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Folder Name",
    },

    {
      id: "Update Date/Time",
      numeric: false,
      disablePadding: true,
      label: "Update Date/Time",
    },
    {
      id: "Update By",
      numeric: false,
      disablePadding: true,
      label: "Update By",
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
      style: { marginLeft: "190px" },
    },
  ];
  // -----------------------------folder
  useEffect(() => {
    let api = [];
    setState({ id: 0, data: api });
  }, []);
  const [list, setList] = useState([]);
  useEffect(() => {
    setList([{ id: "its_me", folder_name: workSpaceData?.workspace_name }]);
    getAllfoldernames({ workspace_name: workSpaceData?.workspace_name });
  }, [workSpaceData?.workspace_name]);
  const [state, setState] = useState({ id: 0, data: [] }); //
  const [newArr, setNewArr] = useState({ data: [] });
  const insertNode = function (tree = {}, commentId = 0, item) {
    if (tree.id === commentId) {
      let newData = {
        id: new Date().getTime(),
        folderName: item,
        data: [],
      };
      tree.data.push(newData);
      setNewArr(tree);
      return tree;
    }

    let latestNode = [];
    latestNode = tree.data.map((ob) => {
      return insertNode(ob, commentId, item);
    });
    return { ...tree, data: latestNode };
  };
  const addNew = () => {
    onFormSubmit();
  };
  const [input, setInput] = useState("");
  const [id, setId] = useState(0);
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

  const [currentFolderData, setCurrentFolderData] = useState({
    folder_name: "name",
    levels: 0,
    parent_id: 0,
    id: 0,
    workspace_name: workSpaceData.workspace_name,
  });
  const callApi = async (data) => {
    setList((prev) => {
      return [...prev, data];
    });
    setFolderName(data);
    // after api api here
    let apiData = {
      parent_id: data.id,
      levels: data.levels + 1,
      workspace_name: workSpaceData.workspace_name,
    };
    getAllfoldernames(apiData);
    setCurrentFolderData(data);
  };
  const callApiHeader = async (data) => {
    if (data.id === "its_me") {
      getAllfoldernames({
        workspace_name: workSpaceData.workspace_name,
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
        workspace_name: workSpaceData.workspace_name,
      };
      getAllfoldernames(apiData);
      setCurrentFolderData(data);
    }
  };
  // -----------------------------------------------showing file

  return (
    <>
      <Head title="My Workspace - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <FileUpload
            open={fileUpload}
            close={() => setFileUpload(false)}
            docListUpload={docListUpload}
            handleOnClick={handleOnClick}
            Properties={addProperties}
            handleFileChange={handleFileChange}
            selectedFile={file}
            handleOkay={handleSubmit}
            fileDesc={(e) => {
              setFileDesc(e.target.value);
            }}
            handleInputChange={handleInputChange}
            formValues={formValues}
          />
          <WS1Header
            openModal={() => setOpen({ ...open, status: true })}
            openModal1={() => setFileModal({ ...fileModal, status: true })}
            sm={sm}
            list={list}
            findFolder={findFolder}
            updateSm={updateSm}
            userData={userData}
            openFileUpload={() => setFileUpload(true)}
            callApiHeader={callApiHeader}
          />
          <ModalPop
            open={open.status}
            handleClose={handleClose}
            title="Create new Folder"
            buttonSuccessTitle="Create"
            id={id}
            addNew={addNew}
            input={input}
            type="form"
            inputList={[
              { type: "text", name: "name", placeholder: "Enter Folder Name" },
            ]}
            handleChange={handleChange}
            handleOkay={onFormSubmit}
            folderNameInput={folderNameInput}
          />
          <CommonTable
            rows={folderList}
            openFileUpload={() => setFileUpload(true)}
            headCells={tableHeader}
            allfolderlist={allfolderlist}
            callApi={callApi}
          />
        </Stack>
      </Content>
    </>
  );
};
export default WS1;

import React, { useState, useContext, useEffect } from "react";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import { Stack, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import FileFolderMove from "../../components/FileFolderMove";
import PermissionForm from "../../components/Forms/PermissionForm";
import PermissionTable from "../../components/AllTables/PermissionTable";

const Permissions = () => {
  const {
    isLogin,
    getsmtp,
    editsmtp,
    createsmtp,
    getWorkspace,
    workSpaceData,
    userDropdownU,
    cabinetDropdown,
    getGroupsDropdown,
    getfoldernameslist,
  } = useContext(UserContext);
  const [editId, setEditedId] = useState(0);
  const [getSmpt, setGetSmpt] = useState([]);
  const [smptdata, setSmptdata] = useState([]);
  const [Workspace, setWorkspace] = useState([]);
  const [cabinetList, setcabinetList] = useState([]);
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  // Permission Details Form------
  const [formData, setFormData] = useState({
    Groups: "",
    Users: "",
    Cabinet: "",
    WorkSpace: "",
    Permissions: "",
    Folder_File: "",
    WorkSpace_Type: "",
  });
  useEffect(() => {
    getsmptdata();
    getWorkspaces();
    getUserRselect();
    getRolesDropdown();
    getCabinetDropdown();
  }, []);

  const getsmptdata = () => {
    getsmtp(
      {},
      (apiRes) => {
        setGetSmpt(apiRes?.data?.data);
        const apiData = apiRes?.data?.data[0];
        setSmptdata(apiData);
      },
      (apiErr) => {
        console.log("====> api get", apiErr);
      }
    );
  };
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        const data = apiRes?.data;
        setUserDropdowns(data?.data?.map((gro) => gro?.email));
      },
      (apiErr) => {}
    );
  };
  const getWorkspaces = () => {
    getWorkspace(
      {},
      (apiRes) => {
        setWorkspace(apiRes?.data?.data);
      },
      (apiErr) => {}
    );
  };
  const getRolesDropdown = () => {
    getGroupsDropdown(
      {},
      (apiRes) => {
        const data = apiRes?.data;
        setGroupsDropdown(data?.groups?.map((gro) => gro?.group_name));
      },
      (apiErr) => {}
    );
  };
  const getCabinetDropdown = () => {
    cabinetDropdown(
      {},
      (apiRes) => {
        const data = apiRes?.data?.data;
        setcabinetList(data?.map((cab) => cab?.cabinet_name));
      },
      (apiErr) => {}
    );
  };
  const onEditClick = (id) => {
    getSmpt.map((item) => {
      if (item.id == id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          User_Name: item?.username,
          password: item?.password,
          Server_IP: item?.host_serverip,
          Server_Port: item?.port,
          From_Address: item?.from_address,
          From_Name: item?.from_name,
          Authentication: item?.authentication,
          Security: item?.security,
        }));
        setEditedId(id);
      }
    });
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleAutocompleteChange = (id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const onBlockClick = (id, smtp_status) => {
    let statusCheck = {
      id,
      smtp_status,
    };
    editsmtp(
      statusCheck,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes.data.message,
            style: {
              height: 60,
            },
          });
          getsmptdata();
        }
      },
      (apiErr) => {}
    );
  };
  const handleSubmit = () => {
    if (editId) {
      let data = {
        id: editId,
        username: formData?.User_Name,
        password: formData?.password,
        host_serverip: formData?.Server_IP,
        port: formData?.Server_Port,
        from_address: formData?.From_Address,
        from_name: formData?.From_Name,
        authentication: formData?.Authentication,
        security: formData?.Security,
      };
      editsmtp(
        data,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "SMTP Edited Successfully.",
              style: {
                height: 60,
              },
            });
            getsmptdata();
            resetFormSmtp();
          }
        },
        (apiErr) => {}
      );
    } else {
      let data = {
        username: formData?.User_Name,
        password: formData?.password,
        host_serverip: formData?.Server_IP,
        port: formData?.Server_Port,
        from_address: formData?.From_Address,
        from_name: formData?.From_Name,
        authentication: formData?.Authentication,
        security: formData?.Security,
      };
      createsmtp(
        data,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "SMTP Created Successfully.",
              style: {
                height: 60,
              },
            });
            getsmptdata();
            resetFormSmtp();
          }
        },
        (apiErr) => {}
      );
    }
  };
  const onEditSmtp = () => {
    let data = {
      id: smptdata.id,
      username: formData.User_Name,
      password: formData.password,
      host_serverip: formData.Server_IP,
      port: formData.Server_Port,
      from_address: formData.From_Address,
      from_name: formData.From_Name,
      authentication: formData.Authentication,
      security: formData.Security,
    };
    editsmtp(
      data,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "SMTP Updated Successfully.",
            style: {
              height: 60,
            },
          });
        }
      },
      (apiErr) => {}
    );
  };
  // ------------------------------------------------move
  const [newArr, setNewArr] = useState({ data: [] });
  const [state, setState] = useState({ id: 0, data: [] });
  const retrievedWorkspaceId = localStorage.getItem("workspace_id");
  const retrievedWorkspaceName = localStorage.getItem("workspace_name");
  const [currentFolderData, setCurrentFolderData] = useState({
    folder_name: "name",
    levels: 0,
    parent_id: 0,
    id: 0,
    workspace_name: workSpaceData.workspace_name,
  });
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
  const [allMoveFile, setAllMoveFile] = useState([]);
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
      },
      (apiErr) => {
        console.log("====> api get folder name", apiErr);
      }
    );
  };
  const moveData =
    Workspace?.filter((data) =>
      isLogin?.my_workspace?.includes(data.workspace_name)
    ).map(({ id: workspace_id, workspace_name }) => ({
      workspace_id,
      workspace_name,
    })) || [];
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
  // ------------------------------------------------move

  const resetFormPermission = () => {
    setFormData({
      Groups: "",
      Users: "",
      Cabinet: "",
      WorkSpace: "",
      Permissions: "",
      Folder_File: "",
      WorkSpace_Type: "",
    });
    setEditedId(0);
  };
  return (
    <React.Fragment>
      <Head title="SMTP - Regular"></Head>
      <Content>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mt: -3.4 }}
        >
          <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
            Permissions
          </Typography>
        </Stack>
        <FileFolderMove
          // list={list}
          callApi={callApi}
          moveData={moveData}
          openMove={openMove}
          hideMoveData={hideMoveData}
          // findFolder={findFolder}
          onClickWorksapce={onClickWorksapce}
          allMoveFile={allMoveFile}
          // callApiHeader={callApiHeader}
          moveFileFolder={moveFileFolder}
          handleCloseMove={handleCloseMove}
          onSubmitUpdatefolder={onSubmitUpdatefolder}
        />
        <PermissionForm
          editId={editId}
          smptdata={smptdata}
          formData={formData}
          Workspace={Workspace}
          cabinetList={cabinetList}
          userDropdowns={userDropdowns}
          groupsDropdown={groupsDropdown}
          onEditSmtp={onEditSmtp}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClickMove={handleClickMove}
          handleAutocompleteChange={handleAutocompleteChange}
        />
        <PermissionTable
          getSmpt={getSmpt}
          onEditClick={onEditClick}
          onBlockClick={onBlockClick}
        />
      </Content>
    </React.Fragment>
  );
};
export default Permissions;

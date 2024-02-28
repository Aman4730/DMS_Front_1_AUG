import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import { Stack, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import WorkspceForm from "../../components/Forms/WorkspceForm";
import WorkspaceTable from "../../components/Tables/WorkspaceTable";
import WorkspacePermission from "../../components/Forms/WorkspacePermission";
import {
  Icon,
  Block,
  Button,
  BlockDes,
  DataTable,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../../components/Component";
const Workspace = () => {
  const {
    isLogin,
    contextData,
    addWorkspace,
    getWorkspace,
    userDropdownU,
    add_permission,
    deleteworkspace,
    cabinetDropdown,
    getGroupsDropdown,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [userData, setUserData] = contextData;
  const [totalUsers, setTotalUsers] = useState(0);
  const [cabinetList, setcabinetList] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  const [formData, setFormData] = useState({
    workspace_name: "",
    enter_quota: "",
    selected_groups: [],
    selected_users: [],
    selected_cabinet: "",
    workspace_type: "",
  });
  const [checkboxValues, setCheckboxValues] = useState({
    view: null,
    enable: null,
    share: null,
    rename: null,
    upload_folder: null,
    create_folder: null,
    upload_file: null,
    delete: null,
    download: null,
    move: null,
    rights: null,
    comment: null,
    properties: null,
    version_enable: null,
  });
  const [open, setOpen] = useState({
    status: false,
    data: "",
  });
  const handleClickOpen = (id) => {
    setOpen({
      status: true,
      data: id,
    });
  };
  const handleClose = () => {
    setOpen({
      status: false,
      data: "",
    });
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
        setTotalUsers(apiRes?.data?.data?.length);
        setUserData(apiRes?.data?.data);
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getUserRselect();
    getRolesDropdown();
    getWorkspaces();
    getCabinetDropdown();
  }, []);

  // function to reset the form
  const resetFormWorkspace = () => {
    setFormData({
      workspace_name: "",
      enter_quota: "",
      selected_groups: [],
      selected_users: [],
      selected_cabinet: "",
      workspace_type: "",
    });
    setEditedId(0);
  };

  // function to close the form modal
  const onFormCancel = () => {
    resetFormWorkspace();
    setFormShow(false);
  };
  // submit function to add a new item
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        workspace_name: formData.workspace_name,
        enter_quota: formData.enter_quota,
        selected_groups: formData.selected_groups.label,
        selected_users: formData.selected_users,
        selected_cabinet: formData.selected_cabinet,
        workspace_type: formData.workspace_type,
      };
      addWorkspace(
        submittedData,
        (apiRes) => {
          if (apiRes?.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Workspace Updated, Please login again..",
              style: {
                height: 70,
              },
            });
            onFormCancel();
            getWorkspaces();
          }
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        workspace_name: formData.workspace_name,
        enter_quota: formData.enter_quota,
        selected_groups: formData.selected_groups,
        selected_users: formData.selected_users,
        selected_cabinet: formData.selected_cabinet,
        workspace_type: formData.workspace_type,
      };
      addWorkspace(
        submittedData,
        (apiRes) => {
          if (apiRes?.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Workspace Created, Please login again...",
              style: {
                height: 70,
              },
            });
            onFormCancel();
            getWorkspaces();
          }
        },
        (apiErr) => {
          if (apiErr?.response?.status == 400) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiErr?.response.data.message,
              style: {
                height: 60,
              },
            });
          }
        }
      );
    }
  };
  const onEditClick = (id) => {
    userData?.map((item) => {
      function formatFileSize(sizeInBytes) {
        if (sizeInBytes < 1024) {
          return sizeInBytes + " B";
        } else if (sizeInBytes < 1024 * 1024) {
          return (sizeInBytes / 1024).toFixed(2);
        } else if (sizeInBytes < 1024 * 1024) {
          return (sizeInBytes / (1024 * 1024)).toFixed(2);
        } else {
          return sizeInBytes / (1024 * 1024);
        }
      }
      const fileSizeInBytes = item.quota;
      const formattedSize = formatFileSize(fileSizeInBytes);
      if (item.id == id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          workspace_name: item.workspace_name,
          enter_quota: formattedSize,
          selected_groups: item.selected_groups,
          selected_users: item.selected_users,
          selected_cabinet: item.selected_cabinet,
          workspace_type: item.workspace_type,
        }));
        setEditedId(id);
        setFormShow(true);
      }
    });
  };

  const onDeleteClick = (id) => {
    let deleteId = { id: id };
    deleteworkspace(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Workspace Deleted Successfully.",
            style: {
              height: 60,
            },
          });
          getWorkspaces();
          handleClose();
        }
      },
      (apiErr) => {}
    );
  };
  const [PermissionEditedId, setPermissionEditedId] = useState(0);
  const onEditPermissionClick = (permissionData) => {
    const { workspace_name, id, policy_type, workspace_id } = permissionData;
    setOpenDialog(true);
    userData.map((item) => {
      const permissionData = item.workspacePermission;
      if (item?.workspacePermission?.id == id) {
        setCheckboxValues((prevFormData) => ({
          ...prevFormData,
          view: permissionData.view,
          share: permissionData.share,
          rename: permissionData.rename,
          upload_folder: permissionData.upload_folder,
          create_folder: permissionData.create_folder,
          upload_file: permissionData.upload_file,
          delete: permissionData.delete_per,
          download: permissionData.download_per,
          move: permissionData.move,
          rights: permissionData.rights,
          comment: permissionData.comments,
          properties: permissionData.properties,
        }));
      }
      setPermissionEditedId({
        id: id,
        policy_type: policy_type,
        workspace_id: workspace_id,
        workspace_name: workspace_name,
      });
    });
  };
  const tableHeader = [
    {
      id: "Workspace Name",
      numeric: false,
      disablePadding: true,
      label: "Workspace Name",
    },
    {
      id: "Cabinet",
      numeric: false,
      disablePadding: true,
      label: "Cabinet",
    },
    {
      id: "Groups",
      numeric: false,
      disablePadding: true,
      label: "Groups",
    },
    {
      id: "User",
      numeric: false,
      disablePadding: true,
      label: "User",
    },
    {
      id: "Workspace Type",
      numeric: false,
      disablePadding: true,
      label: "Workspace Type",
    },
    {
      id: "Quota(Gb)",
      numeric: false,
      disablePadding: true,
      label: "Quota(Gb)",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "20px" },
    },
  ];
  const [formShow, setFormShow] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenPermission = (id, file_type, workspace_name) => {
    setOpenDialog({
      status: true,
      data: { id, file_type, workspace_name },
    });
  };
  const handleClosePermission = () => {
    setOpenDialog(false);
    resetWs1Permission();
  };
  const handleCheckboxWs1 = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const onSubmitAddPermission = (id, file_type, workspace_name) => {
    if (PermissionEditedId.id) {
      let submittedData = {
        id: PermissionEditedId.id,
        view: checkboxValues.view,
        move: checkboxValues.move,
        share: checkboxValues.share,
        rename: checkboxValues.rename,
        rights: checkboxValues.rights,
        comments: checkboxValues.comment,
        delete_per: checkboxValues.delete,
        download_per: checkboxValues.download,
        properties: checkboxValues.properties,
        upload_file: checkboxValues.upload_file,
        upload_folder: checkboxValues.upload_folder,
        create_folder: checkboxValues.create_folder,
        policy_type: PermissionEditedId.policy_type,
        workspace_id: PermissionEditedId.workspace_id,
        workspace_name: PermissionEditedId.workspace_name,
      };
      add_permission(
        submittedData,
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
            getWorkspaces();
            handleClosePermission();
          }
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        workspace_id: id,
        policy_type: file_type,
        view: checkboxValues.view,
        move: checkboxValues.move,
        share: checkboxValues.share,
        rights: checkboxValues.rights,
        rename: checkboxValues.rename,
        workspace_name: workspace_name,
        comments: checkboxValues.comment,
        delete_per: checkboxValues.delete,
        download_per: checkboxValues.download,
        properties: checkboxValues.properties,
        upload_file: checkboxValues.upload_file,
        upload_folder: checkboxValues.upload_folder,
        create_folder: checkboxValues.create_folder,
      };
      add_permission(
        submittedData,
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
            getWorkspaces();
            handleClosePermission();
          }
        },
        (apiErr) => {}
      );
    }
  };
  const resetWs1Permission = () => {
    setCheckboxValues({
      view: null,
      share: null,
      rename: null,
      upload_folder: null,
      create_folder: null,
      upload_file: null,
      delete: null,
      download: null,
      move: null,
      rights: null,
      comment: null,
      properties: null,
    });
    setPermissionEditedId(0);
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

  const { errors, register, handleSubmit, watch, triggerValidation } =
    useForm();
  return (
    <React.Fragment>
      <ModalPop
        open={open.status}
        handleClose={handleClose}
        handleOkay={onDeleteClick}
        title={"Cabinet is being Deleted. Are You Sure !"}
        data={open.data}
      />
      <Head title="Workspace List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  Workspace
                </Typography>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} Workspace.</p>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <div className="toggle-wrap nk-block-tools-toggle">
                  <Button
                    className={`btn-icon btn-trigger toggle-expand mr-n1 ${
                      sm ? "active" : ""
                    }`}
                    onClick={() => updateSm(!sm)}
                  >
                    <Icon name="menu-alt-r"></Icon>
                  </Button>
                  <div
                    className="toggle-expand-content"
                    style={{ display: sm ? "block" : "none" }}
                  >
                    <ul className="nk-block-tools g-3">
                      <li className="nk-block-tools-opt">
                        <SearchBar
                          handleClick={() => setFormShow(true)}
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
        </Stack>
        <Block>
          <WorkspceForm
            formShow={formShow}
            formData={formData}
            cabinetList={cabinetList}
            onFormCancel={onFormCancel}
            handleChange={handleChange}
            onFormSubmit={onFormSubmit}
            userDropdowns={userDropdowns}
            groupsDropdown={groupsDropdown}
            handleAutocompleteChange={handleAutocompleteChange}
          />
          <WorkspacePermission
            title="Add Permission"
            isLogin={isLogin}
            data={openDialog.data}
            openDialog={openDialog}
            permission={permissionWs1}
            checkboxValues={checkboxValues}
            PermissionEditedId={PermissionEditedId}
            handleCheckboxChange={handleCheckboxWs1}
            handleClickPermission={onSubmitAddPermission}
            handleClosePermission={handleClosePermission}
          />
          <DataTable className="card-stretch">
            <WorkspaceTable
              searchTerm={searchTerm}
              headCells={tableHeader}
              allfolderlist={userData}
              onEditClick={onEditClick}
              handleClickOpen={handleClickOpen}
              onPermissionClick={handleOpenPermission}
              onEditPermissionClick={onEditPermissionClick}
            />
          </DataTable>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Workspace;

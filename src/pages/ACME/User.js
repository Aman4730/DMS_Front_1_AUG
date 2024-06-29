import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import { Stack, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import SearchBar from "../../components/SearchBar";
import "react-datepicker/dist/react-datepicker.css";
import UserForm from "../../components/Forms/UserForm";
import { UserContext } from "../../context/UserContext";
import UserTable from "../../components/AllTables/UserTable";
import {
  Icon,
  Button,
  BlockDes,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../../../src/components/Component";
import { addDays } from 'date-fns';
const UserListRegularPage = () => {
  // Destructure useContext variables
  const {
    addUser,
    getUser,
    blockUser,
    deleteUser,
    contextData,
    add_omegaAuth,
    getGroupsDropdown,
  } = useContext(UserContext);
  // Destructure the states
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState(0);
  const [userData, setUserData] = contextData;
  const [totalUsers, setTotalUsers] = useState(0);
  const [toggleData, setToggleData] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  const [open, setOpen] = React.useState({
    status: false,
    data: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    level_1: "",
    level_2: "",
    password: "",
    emp_code: "",
    add_group: "",
    user_role: "",
    max_quota: "",
    user_type: "",
    userValidity: null,
    display_name: "",
  });
  
  const [openSync, setOpenSync] = React.useState({
    status: false,
    data: {},
  });
  useEffect(() => {
    getUsers();
    getRolesDropdown();
  }, []);
  // Function to get roles dropdown
  const getRolesDropdown = () => {
    getGroupsDropdown(
      {},
      (apiRes) => {
        setGroupsDropdown(apiRes?.data?.groups?.map((gro) => gro?.group_name));
      },
      (apiErr) => {}
    );
  };
  const getUsers = () => {
    getUser(
      {},
      (apiRes) => {
        setTotalUsers(apiRes.data.count);
        if (apiRes.status === 200) {
          setUserData(apiRes.data.data);
          setToggleData(apiRes.data.data);
        }
      },
      (apiErr) => {}
    );
  };
  const handleClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    getUsers();
    resetForm();
    setOpenForm(false);
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
  const resetForm = () => {
    setFormData({
      userValidity: "",
      display_name: "",
      emp_code: "",
      email: "",
      add_group: "",
      user_role: "",
      max_quota: "",
      user_type: "",
      password: "",
      level_1: "",
      level_2: "",
    });
    setEditedId(0);
  };
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
  const onFormSubmit = () => {
    if (editId) {
      // Edit existing user
      let submittedData = {
        id: editId,
        level_1: formData.level_1,
        level_2: formData.level_2,
        userValidity: formData.userValidity,
        display_name: formData.display_name,
        emp_code: formData.emp_code,
        email: formData.email,
        add_group: formData.add_group,
        user_role: formData.user_role,
        max_quota: formData.max_quota,
        password: formData.password,
        user_type: formData.user_type,
      };
      addUser(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "User Updated Successfully.",
              style: {
                height: 60,
              },
            });
          }
          handleCloseForm();
        },
        (apiErr) => {}
      );
    } else {
      // Add new user
      let submittedData = {
        level_1: formData.level_1,
        level_2: formData.level_2,
        userValidity:  addDays(formData.userValidity, 90),
        display_name: formData.display_name,
        emp_code: formData.emp_code,
        email: formData.email,
        add_group: formData.add_group,
        user_role: formData.user_role,
        max_quota: formData.max_quota,
        password: formData.password,
        user_type: formData.user_type,
      };
      addUser(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "User Created Successfully.",
              style: {
                height: 60,
              },
            });
          }
          handleCloseForm();
        },
        (apiErr) => {
          if (apiErr) {
            notification["warning"]({
              placement: "top",
              description: "",
              message: apiErr?.response?.data.message,
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
    const selectedUser = userData.find((item) => item.id === id);
    function formatSizeInGB(sizeInBytes) {
      return sizeInBytes / (1024 * 1024);
    }
    const formattedSize = formatSizeInGB(selectedUser.max_quota);
    if (selectedUser) {
      const formattedDate = selectedUser.validity_date
        ? new Date(selectedUser.validity_date)
        : null;
      setFormData({
        id: id,
        userValidity: formattedDate, // Preserving the existing value, if any (This seems unnecessary)
        display_name: selectedUser.display_name,
        user_role: selectedUser.user_role,
        max_quota: formattedSize,
        add_group: selectedUser.add_group,
        emp_code: selectedUser.emp_code,
        email: selectedUser.email,
        password: selectedUser.emp_password,
        user_type: selectedUser.user_type,
        level_1: selectedUser.level_1,
        level_2: selectedUser.level_2,
      });
      handleClickOpenForm();
      setEditedId(id);
    }
  };
  const onDeleteClick = (id) => {
    let deleteId = { id: id };
    deleteUser(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "User Deleted Successfully.",
            style: {
              height: 60,
            },
          });
          getUsers();
          handleClose();
        }
      },
      (apiErr) => {}
    );
  };
  const onBlockClick = (id, user_status) => {
    let statusCheck = {
      id,
      user_status,
    };
    blockUser(
      statusCheck,
      (apiRes) => {
        if (apiRes?.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes.data.message,
            style: {
              height: 60,
            },
          });
          getUsers();
        }
      },
      (apiErr) => {}
    );
  };
  const tableHeader = [
    {
      id: "Display Name",
      numeric: false,
      disablePadding: true,
      label: "Display Name",
    },
    {
      id: "Email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "Expiry Date",
      numeric: false,
      disablePadding: true,
      label: "Expiry Date",
    },
    {
      id: "User Role",
      numeric: false,
      disablePadding: true,
      label: "User Role",
    },
    {
      id: "Employee Code",
      numeric: false,
      disablePadding: true,
      label: "Employee Code",
    },
    {
      id: "Max Quota(Gb)",
      numeric: false,
      disablePadding: true,
      label: "Max Quota(Gb)",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "35px" },
    },
  ];

  const handleClickSyncOpen = (emp_code) => {
    setOpenSync({
      status: true,
      data: { emp_code },
    });
  };
  const handleCloseSync = () => {
    setOpenSync({
      status: false,
      data: "",
    });
    getUsers();
  };
  const onSyncUser = (emp_code) => {
    let data = { emp_code: emp_code };
    add_omegaAuth(
      data,
      (apiRes) => {
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes.data.message,
            style: {
              height: 80,
            },
          });
        }
        handleCloseSync();
      },
      (apiErr) => {}
    );
  };
  return (
    <React.Fragment>
      {/* Modals */}
      <ModalPop
        open={open.status}
        handleClose={handleClose}
        handleOkay={onDeleteClick}
        title="User is being Deleted. Are You Sure !"
        data={open.data}
      />
      <ModalPop
        open={openSync.status}
        handleOkay={onSyncUser}
        data={openSync?.data?.emp_code}
        handleClose={handleCloseSync}
        title="Are you sure sync this user?"
      />
      {/* modal over */}
      <Head title="User List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  Users Lists
                </Typography>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} users.</p>
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
                          handleClick={handleClickOpenForm}
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
        <UserForm
          editId={editId}
          openForm={openForm}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          onFormSubmit={onFormSubmit}
          groupsDropdown={groupsDropdown}
          handleCloseForm={handleCloseForm}
          handleAutocompleteChange={handleAutocompleteChange}
        />
        <UserTable
          rows={toggleData}
          searchTerm={searchTerm}
          headCells={tableHeader}
          onEditClick={onEditClick}
          onBlockClick={onBlockClick}
          handleClickOpen={handleClickOpen}
          handleClickSyncOpen={handleClickSyncOpen}
        />
      </Content>
    </React.Fragment>
  );
};
export default UserListRegularPage;

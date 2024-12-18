import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import SearchBar from "../../components/SearchBar";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import GroupForm from "../../components/Forms/GroupForm";
import GroupsTable from "../../components/AllTables/GroupsTable";
import {
  Icon,
  Block,
  Button,
  BlockDes,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
} from "../../../src/components/Component";
const UserListRegularPage = () => {
  const { contextData, add_group, getGroups, userDropdownU, deletegroup } =
    useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [userData, setUserData] = contextData;
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [formData, setFormData] = useState({
    level_1: "",
    level_2: "",
    group_name: "",
    group_admin: "",
    selected_user: "",
  });
  const [open, setOpen] = React.useState({
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
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setUserData([...newData]);
  }, []);

  useEffect(() => {
    getTotalGroups();
    getUserRselect();
  }, []);
  
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        setUserDropdowns(apiRes?.data?.data?.map((user) => user?.email));
      },
      (apiErr) => {}
    );
  };
  const getTotalGroups = () => {
    getGroups(
      {},
      (apiRes) => {
        const data = apiRes?.data?.data;
        setTotalUsers(apiRes.data.count);
        if (apiRes.status === 200) {
          setUserData(data);
        }
      },
      (apiErr) => {}
    );
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      selected_user: "",
      group_name: "",
      group_admin: "",
    });
    setEditedId(0);
  };

  // submit function to add a new item
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        level_1: formData.level_1,
        level_2: formData.level_2,
        selected_user: formData.selected_user,
        group_name: formData.group_name,
        group_admin: formData.group_admin,
      };

      add_group(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Group Updated Successfully.",
              style: {
                height: 60,
              },
            });
            getTotalGroups();
            handleCloseForm();
          }
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        level_1: formData.level_1,
        level_2: formData.level_2,
        group_name: formData.group_name,
        group_admin: formData.group_admin,
        selected_user: formData.selected_user,
      };
      add_group(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Group Created Successfully.",
              style: {
                height: 60,
              },
            });
            resetForm();
            getTotalGroups();
            handleCloseForm();
          }
          const code = 200;
        },
        (apiErr) => {
          console.log(apiErr);
        }
      );
    }
    // }
  };
  // function that loads the want to editted userData
  const onEditClick = (id) => {
    userData.map((item) => {
      if (item.id == id) {
        setFormData({
          id: id,
          level_1: item.level_1,
          level_2: item.level_2,
          group_name: item.group_name,
          selected_user: item.selected_user,
          group_admin: item.group_admin,
        });

        setOpenForm(true);
        setEditedId(id);
      }
    });
  };
  const onDeleteClick = (id) => {
    let deleteId = { id: id };
    deletegroup(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Group Deleted Successfully.",
            style: {
              height: 60,
            },
          });
          handleClose();
          getTotalGroups();
        }
      },
      (apiErr) => {}
    );
  };

  const tableHeader = [
    {
      id: "group_name",
      numeric: false,
      disablePadding: true,
      label: "Group Name",
    },
    {
      id: "group_admin",
      numeric: false,
      disablePadding: true,
      label: "Group Admin",
    },
    {
      id: "selected_user",
      numeric: false,
      disablePadding: true,
      label: "Selected User",
    },
    {
      id: "Action",
      numeric: false,
      label: "Action",
      disablePadding: true,
      style: { marginLeft: "20px" },
    },
  ];
  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
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
  const { errors, register, handleSubmit, watch, triggerValidation } =
    useForm();

  return (
    <React.Fragment>
      {/* modal */}
      <ModalPop
        open={open.status}
        handleClose={handleClose}
        handleOkay={onDeleteClick}
        title="Group is being Deleted. Are You Sure !"
        data={open.data}
      />
      <Head title="Group List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Groups</BlockTitle>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} groups.</p>
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
        <Block>
          <GroupForm
            editId={editId}
            formData={formData}
            groupsDropdown={userDropdowns}
            handleAutocompleteChange={handleAutocompleteChange}
            handleChange={handleChange}
            handleCloseForm={handleCloseForm}
            onFormSubmit={onFormSubmit}
            openForm={openForm}
          />
          <GroupsTable
            headCells={tableHeader}
            rows={userData}
            onEditClick={onEditClick}
            handleClickOpen={handleClickOpen}
            searchTerm={searchTerm}
          />
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default UserListRegularPage;

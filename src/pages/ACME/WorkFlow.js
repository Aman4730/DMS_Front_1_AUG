import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import { Modal, ModalBody } from "reactstrap";
import ModalPop from "../../components/Modal";
import SearchBar from "../../components/SearchBar";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import WorkFlowForm from "../../components/Forms/WorkFlowForm";
import WorkFlowTable from "../../components/Tables/WorkFlowTable";
import {
  Block,
  Icon,
  Button,
  BlockDes,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
} from "../../../src/components/Component";
const WorkFlow = () => {
  const {
    contextData,
    getworkflow,
    getWorkspace,
    userDropdownU,
    deleteworkflow,
    add_createworkflow,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [openForm, setOpenForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [getWorkspaces, setGetWorkspaces] = useState([]);
  const [tableDropdown, setTableDropdown] = useState([]);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [open, setOpen] = React.useState({
    status: false,
    data: "",
  });
  const [deleteModal, setDeleteModal] = React.useState({
    status: false,
    data: "",
  });
  const [addPolicies, setAddPolicies] = useState({
    policy_name: "",
    group_admin: "",
    workspace_name: "",
    selected_user: [],
  });
  const [checkboxValues, setCheckboxValues] = useState({
    l1: false,
    l2: false,
  });
  const handleClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    resetForm();
    setOpenForm(false);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setAddPolicies((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleAutocompleteChange = (id, value) => {
    setAddPolicies((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const handleClickOpen = (id) => {
    setDeleteModal({
      status: true,
      data: id,
    });
  };
  const handleCloseDelete = () => {
    setDeleteModal({
      status: false,
      data: "",
    });
  };
  useEffect(() => {
    getTableData();
    getUserRselect();
    getRolesDropdown();
  }, []);

  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        const data = apiRes?.data;
        setUserDropdowns(data?.data?.map((user) => user?.email));
      },
      (apiErr) => {}
    );
  };
  const getRolesDropdown = () => {
    getWorkspace(
      {},
      (apiRes) => {
        const data = apiRes?.data.data;
        setGetWorkspaces(data?.map((workspace) => workspace?.workspace_name));
      },
      (apiErr) => {}
    );
  };
  const getTableData = () => {
    getworkflow(
      {},
      (apiRes) => {
        setTableDropdown(apiRes?.data?.allWorkFlow);
        setTotalUsers(apiRes?.data?.allWorkFlow?.length);
      },
      (apiErr) => {}
    );
  };
  // function to reset the form
  const resetForm = () => {
    setAddPolicies({
      policy_name: "",
      group_admin: "",
      selected_user: [],
      workspace_name: "",
    });
    setEditedId(0);
  };
  // submit function to add a new item
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        policy_name: addPolicies.policy_name,
        user_email: addPolicies.selected_user,
        group_admin: addPolicies.group_admin,
        workspace_name: addPolicies.workspace_name,
        l_1: checkboxValues.l1,
        l_2: checkboxValues.l2,
      };
      add_createworkflow(
        submittedData,
        (apiRes) => {
          if (apiRes.status === 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiRes.data.message,
              style: {
                height: 60,
              },
            });
            getTableData();
            handleCloseForm();
          } else if (apiRes.status === 400) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiRes.data.message,
              style: {
                height: 60,
              },
            });
          }
        },
        (apiErr) => {
          if (apiErr.response.status === 400) {
            notification["warning"]({
              placement: "top",
              description: "",
              message: apiErr.response.data.message,
              style: {
                height: 60,
              },
            });
            getTableData();
            handleCloseForm();
          }
        }
      );
    } else {
      let submittedData = {
        policy_name: addPolicies.policy_name,
        user_email: addPolicies.selected_user,
        group_admin: addPolicies.group_admin,
        workspace_name: addPolicies.workspace_name,
        l_1: checkboxValues.l1,
        l_2: checkboxValues.l2,
      };

      add_createworkflow(
        submittedData,
        (apiRes) => {
          if (apiRes.status === 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiRes.data.message,
              style: {
                height: 60,
              },
            });
            getTableData();
            handleCloseForm();
          }
        },
        (apiErr) => {
          if (apiErr.response.status === 400) {
            notification["warning"]({
              placement: "top",
              description: "",
              message: apiErr.response.data.message,
              style: {
                height: 60,
              },
            });
            getTableData();
            handleCloseForm();
          }
        }
      );
    }
  };
  const onEditClick = (id) => {
    setOpenForm(true);
    tableDropdown.map((item) => {
      if (item.id == id) {
        setAddPolicies({
          id: id,
          policy_name: item.policy_name,
          selected_user: item.user_email,
          group_admin: item.group_admin,
          workspace_name: item.workspace_name,
          l_1: item.l1,
          l_2: item.l2,
        });
        setEditedId(id);
      }
    });
  };
  const onDeleteClick = (id) => {
    let deleteId = { id: id };
    deleteworkflow(
      deleteId,
      (apiRes) => {
        if (apiRes.status === 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes.data.message,
            style: {
              height: 60,
            },
          });
          getTableData();
          handleCloseDelete();
        }
      },
      (apiErr) => {
        if (apiErr.response.status === 500) {
          notification["error"]({
            placement: "top",
            description: "",
            message: apiErr.response.data.message,
            style: {
              height: 60,
            },
          });
          handleCloseDelete();
        }
      }
    );
  };
  const tableHeader = [
    {
      id: "Policy Name",
      numeric: false,
      disablePadding: true,
      label: "Policy Name",
    },
    {
      id: "User Group",
      numeric: false,
      disablePadding: true,
      label: "User Group",
    },
    {
      id: "User",
      numeric: false,
      disablePadding: true,
      label: "User",
    },
    {
      id: "Updated By",
      numeric: false,
      disablePadding: true,
      label: "Updated By",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "18px" },
    },
  ];
  // todolist
  let [addProperty, setAddProperty] = useState("");
  let [todos, setTodos] = useState([]);
  const addTask = () => {
    setAddProperty("");
    setTodos([...todos, addProperty]);
  };
  const removeHandler = (id) => {
    let newTodos = todos.filter((ele, index) => index != id);
    setTodos(newTodos);
  };
  const editHandler = (id) => {
    setAddProperty(todos.filter((val, index) => index === id));
    removeHandler(id);
  };
  const access = [
    { label: "L1", name: "l1" },
    { label: "L2", name: "l2" },
  ];
  const { errors, register, handleSubmit, watch, triggerValidation } =
    useForm();

  return (
    <React.Fragment>
      {/* modal */}
      <ModalPop
        data={deleteModal.data}
        open={deleteModal.status}
        handleClose={handleCloseDelete}
        handleOkay={onDeleteClick}
        title="Policy is being Deleted. Are You Sure !"
      />
      <Head title="Work Flow List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-20px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Work Flow</BlockTitle>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} Work Flow.</p>
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
          <WorkFlowForm
            editId={editId}
            openForm={openForm}
            addPolicies={addPolicies}
            handleChange={handleChange}
            onFormSubmit={onFormSubmit}
            getWorkspaces={getWorkspaces}
            userDropdowns={userDropdowns}
            handleCloseForm={handleCloseForm}
            handleAutocompleteChange={handleAutocompleteChange}
          />
          <WorkFlowTable
            headCells={tableHeader}
            searchTerm={searchTerm}
            onEditClick={onEditClick}
            allfolderlist={tableDropdown}
            handleClickOpen={handleClickOpen}
          />
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default WorkFlow;

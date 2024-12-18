import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { Stack } from "@mui/material";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import SearchBar from "../../components/SearchBar";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import WorkFlowForm from "../../components/Forms/WorkFlowForm";
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
import WorkFlowTable from "../../components/AllTables/WorkFlowTable";
const WorkFlow = () => {
  const {
    getGroups,
    getworkflow,
    getWorkspace,
    userDropdownU,
    deleteworkflow,
    cabinetDropdown,
    add_createworkflow,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [cabinetList, setcabinetList] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [groupDropdowns, setGroupDropdowns] = useState([]);
  const [getWorkspaces, setGetWorkspaces] = useState([]);
  const [tableDropdown, setTableDropdown] = useState([]);

  const [addPolicies, setAddPolicies] = useState({
    policy_name: "",
    selected_group: null,
    workspace_name: null,
    selected_user: [],
    selected_cabinet: null,
    workspace_type: null,
  });
  const [deleteModal, setDeleteModal] = React.useState({
    status: false,
    data: "",
  });
  const [checkboxValues, setCheckboxValues] = useState({
    l1: false,
    l2: false,
  });
  useEffect(() => {
    getTableData();
    getUserRselect();
    getGroupsDropdown();
    getCabinetDropdown();
    getWorkSpaceDropdown();
  }, []);
  const handleClickOpenForm = () => {
    setOpenForm(true);
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
  // --------------------------------getApis
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
  const getWorkSpaceDropdown = () => {
    getWorkspace(
      {},
      (apiRes) => {
        const data = apiRes?.data.data;
        setGetWorkspaces(data);
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
  const getCabinetDropdown = () => {
    cabinetDropdown(
      {},
      (apiRes) => {
        const data = apiRes?.data.data;
        setcabinetList(data?.map((cabinet) => cabinet?.cabinet_name));
      },
      (apiErr) => {}
    );
  };
  const getGroupsDropdown = () => {
    getGroups(
      {},
      (apiRes) => {
        const data = apiRes?.data?.data;
        setGroupDropdowns(data);
      },
      (apiErr) => {}
    );
  };

  // --------------------------------getApis
  const matchedWorkspace = getWorkspaces?.filter(
    (data) => data.workspace_type === addPolicies?.workspace_type
  );
  // submit function to add a new item
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        policy_name: addPolicies.policy_name,
        user_email: addPolicies.selected_user,
        group_admin: addPolicies.selected_group,
        workspace_name: addPolicies.workspace_name?.name,
        cabinet_name: addPolicies.selected_cabinet,
        workspace_type: addPolicies.workspace_type,
        workspace_id: addPolicies?.workspace_name?.id,
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
        group_admin: addPolicies.selected_group,
        workspace_name: addPolicies.workspace_name?.name,
        cabinet_name: addPolicies.selected_cabinet,
        workspace_type: addPolicies.workspace_type,
        workspace_id: addPolicies?.workspace_name?.id,
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
          workspace_name:
            {
              id: item.workspace_id,
              name: item.workspace_name,
            } || "",
          selected_group: item.group_admin,
          selected_cabinet: item.cabinet_name,
          workspace_type: item.workspace_type,
        });
        setCheckboxValues({
          l1: JSON.parse(item.l_1),
          l2: JSON.parse(item.l_2),
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
  // function to reset the form
  const resetForm = () => {
    setAddPolicies({
      policy_name: "",
      group_admin: "",
      workspace_name: null,
      selected_user: [],
      selected_cabinet: null,
      workspace_type: null,
    });
    setCheckboxValues({
      l1: false,
      l2: false,
    });
    setEditedId(0);
  };
  //table header
  const tableHeader = [
    {
      id: "policy_name",
      numeric: false,
      disablePadding: true,
      label: "Policy Name",
    },
    {
      id: "group_admin",
      numeric: false,
      disablePadding: true,
      label: "User Group",
    },
    {
      id: "user_email",
      numeric: false,
      disablePadding: true,
      label: "User",
    },
    {
      id: "updatedAt",
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
  const access = [
    { label: "L1", name: "l1" },
    { label: "L2", name: "l2" },
  ];
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
            access={access}
            openForm={openForm}
            addPolicies={addPolicies}
            cabinetList={cabinetList}
            handleChange={handleChange}
            onFormSubmit={onFormSubmit}
            userDropdowns={userDropdowns}
            checkboxValues={checkboxValues}
            groupDropdowns={groupDropdowns}
            getWorkspaces={matchedWorkspace}
            handleCloseForm={handleCloseForm}
            handleCheckboxChange={handleCheckboxChange}
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

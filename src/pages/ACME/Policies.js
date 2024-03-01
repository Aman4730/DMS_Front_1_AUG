import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { Stack } from "@mui/material";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import SearchBar from "../../components/SearchBar";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import PolicyModal from "../../components/PolicyModal";
import { UserContext } from "../../context/UserContext";
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
import PolicyTable from "../../components/AllTables/PolicyTable";
const Policies = () => {
  const {
    getpolicy,
    contextData,
    add_Policies,
    deletepolicy,
    userDropdownU,
    getGroupsDropdown,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [userData, setUserData] = contextData;
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [tableDropdown, setTableDropdown] = useState([]);
  const [editExtension, setEditExtension] = useState([]);
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  //Todos
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [open, setOpen] = useState({
    status: false,
    data: "",
  });
  const [deleteModal, setDeleteModal] = useState({
    status: false,
    data: "",
  });
  const [addPolicies, setAddPolicies] = useState({
    policy_name: "",
    selected_user: [],
    selected_group: [],
    policy_type: "",
    minimum_characters: "",
    minimum_numeric: "",
    minimum_alphabet: "",
    minimum_special: "",
    incorrect_password: "",
    minimum_days: "",
    maximum_days: "",
    subject: "",
    message: "",
    minimum_upload: "",
    minimum_download: "",
    no_of_days: "",
    no_of_versions: "",
  });
  const [checkboxValues, setCheckboxValues] = useState({
    versions: false,
    recycle_bin: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };
  const handleShareData = (e) => {
    const { name, value } = e.target;
    setAddPolicies((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClose = () => {
    resetForm();
    setEditedId(0);
    setEditExtension([]);
    setOpen({ status: false });
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
  const handleAutocompleteChange = (id, value) => {
    setAddPolicies((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  // ==========================================================UseEffect
  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setUserData([...newData]);
  }, []);
  useEffect(() => {
    getUserRselect();
    getRolesDropdown();
    getTableDropdown();
  }, []);
  // ==========================================================getApis
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        const data = apiRes?.data?.data;
        setUserDropdowns(data?.map((user) => user?.email));
      },
      () => {}
    );
  };
  const getRolesDropdown = () => {
    getGroupsDropdown(
      {},
      (apiRes) => {
        const data = apiRes?.data?.groups;
        setGroupsDropdown(data?.map((gro) => gro?.group_name));
      },
      () => {}
    );
  };
  const getTableDropdown = () => {
    getpolicy(
      {},
      (apiRes) => {
        const data = apiRes.data.data2;
        setTableDropdown(data);
        setTotalUsers(data?.length);
      },
      () => {}
    );
  };
  // ==========================================================getApis
  const resetForm = () => {
    setAddPolicies({
      policy_name: "",
      selected_user: [],
      selected_group: [],
      policy_type: "",
      minimum_characters: "",
      minimum_numeric: "",
      minimum_alphabet: "",
      minimum_special: "",
      incorrect_password: "",
      minimum_days: "",
      maximum_days: "",
      subject: "",
      message: "",
      minimum_upload: "",
      minimum_download: "",
      recycle_bin: "",
      version: "",
    });
    setCheckboxValues({
      versions: false,
      recycle_bin: false,
    });
    setEditExtension([]);
    setEditedId(0);
  };
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        policy_name: addPolicies.policy_name,
        selected_user: addPolicies.selected_user,
        selected_group: addPolicies.selected_group,
        policy_type: addPolicies.policy_type,
        minimum_characters: addPolicies.minimum_characters,
        minimum_numeric: addPolicies.minimum_numeric,
        minimum_alphabet: addPolicies.minimum_alphabet,
        minimum_special: addPolicies.minimum_special,
        incorrect_password: addPolicies.incorrect_password,
        file_extension: editExtension,
        minimum_days: addPolicies.minimum_days,
        maximum_days: addPolicies.maximum_days,
        subject: addPolicies.subject,
        message: addPolicies.message,
        minimum_upload: addPolicies.minimum_upload,
        minimum_download: addPolicies.minimum_download,
        no_of_days: addPolicies.no_of_days,
        no_of_versions: addPolicies.no_of_versions,
        versions: checkboxValues.versions,
        recycle_bin: checkboxValues.recycle_bin,
      };
      add_Policies(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Policy Updated Successfully.",
              style: {
                height: 60,
              },
            });
            handleClose();
            getTableDropdown();
          }
        },
        () => {}
      );
    } else {
      let submittedData = {
        version: addPolicies.version,
        policy_type: addPolicies.policy_type,
        policy_name: addPolicies.policy_name,
        maximum_days: addPolicies.maximum_days,
        minimum_days: addPolicies.minimum_days,
        selected_user: addPolicies.selected_user,
        selected_group: addPolicies.selected_group,
        minimum_numeric: addPolicies.minimum_numeric,
        minimum_special: addPolicies.minimum_special,
        minimum_alphabet: addPolicies.minimum_alphabet,
        minimum_characters: addPolicies.minimum_characters,
        incorrect_password: addPolicies.incorrect_password,
        file_extension: editExtension,
        subject: addPolicies.subject,
        message: addPolicies.message,
        minimum_upload: addPolicies.minimum_upload,
        minimum_download: addPolicies.minimum_download,
        versions: checkboxValues.versions,
        recycle_bin: checkboxValues.recycle_bin,
        no_of_days: addPolicies.no_of_days,
        no_of_versions: addPolicies.no_of_versions,
      };
      add_Policies(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Policy Applied Successfully.",
              style: {
                height: 60,
              },
            });
            handleClose();
            getTableDropdown();
          }
        },
        () => {}
      );
    }
  };
  const onEditClick = (id) => {
    tableDropdown.map((item) => {
      if (item.id == id) {
        setAddPolicies({
          id: id,
          policy_name: item.policy_name,
          policy_type: item.policy_type,
          selected_user: item.selected_users,
          selected_group: item.selected_group,

          minimum_characters: item.minimum_character,
          minimum_numeric: item.minimum_numeric,
          minimum_alphabet: item.minimum_Alphabets,
          minimum_special: item.minimum_special_character,
          incorrect_password: item.inncorrect_password_attend,

          file_extension: item.properties_name,

          minimum_days: item.minimum_maximum_days[0],
          maximum_days: item.minimum_maximum_days[1],

          subject: item.subject,
          message: item.message,

          minimum_upload: item.Bandwidth_min_max[0],
          minimum_download: item.Bandwidth_min_max[1],

          no_of_days: item.no_of_days,
          no_of_versions: item.no_of_versions,
        });
        setCheckboxValues({
          versions: JSON.parse(item.versions),
          recycle_bin: JSON.parse(item.recycle_bin),
        });
        setOpen({ ...open, status: true });
        setEditedId(id);
        setEditExtension(item?.properties_name);
      }
    });
  };
  const onDeleteClick = (id) => {
    let deleteId = { id: id };
    deletepolicy(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Policy Deleted Successfully...",
            style: {
              height: 60,
            },
          });
          handleCloseDelete();
          getTableDropdown();
        }
      },
      () => {}
    );
  };
  // todolist
  let [addProperty, setAddProperty] = useState("");

  // ==========================================================Todos
  const handleInputChange = (event) => {
    setEditedTask(event.target.value);
  };
  const addTask = () => {
    if (editedTask.trim() !== "") {
      const updatedTasks = [editedTask, ...editExtension];
      setEditExtension(updatedTasks);
      setEditedTask("");
    }
  };
  const removeTask = (index) => {
    const updatedTasks = editExtension.filter((_, i) => i !== index);
    setEditExtension(updatedTasks);
  };
  const startEditing = (index, task) => {
    setEditingIndex(index);
    setEditedTask(task);
  };
  const saveEdit = (index) => {
    const updatedTasks = [...editExtension];
    updatedTasks[index] = editedTask;
    setEditExtension(updatedTasks);
    setEditingIndex(null);
    setEditedTask("");
  };
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedTask("");
  };
  // ==========================================================tableHeader
  const tableHeader = [
    {
      id: "Policy Name",
      numeric: false,
      disablePadding: true,
      label: "Policy Name",
    },
    {
      id: "Policy Type",
      numeric: false,
      disablePadding: true,
      label: "Policy Type",
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
      <PolicyModal
        type="form"
        todoList="true"
        addTask={addTask}
        open={open.status}
        tasks={tasks}
        handleInputChange={handleInputChange}
        editedTask={editedTask}
        editingIndex={editingIndex}
        saveEdit={saveEdit}
        removeTask={removeTask}
        startEditing={startEditing}
        cancelEdit={cancelEdit}
        buttonSuccessTitle={editId ? "Update Policy" : "Add Policy"}
        onClickaddTask={addTask}
        title={editId ? "Update Policy" : "Add Policy"}
        title1="Password Settings"
        title2="File Extension"
        title3="Link Expiry"
        title4="Email"
        title5="BandWidth"
        title6="Permission"
        title7="Recycle Bin"
        title8="Versions"
        editId={editId}
        groupsDropdown={groupsDropdown}
        userDropdowns={userDropdowns}
        addPolicies={addPolicies}
        setAddPolicies={setAddPolicies}
        checkboxValues={checkboxValues}
        onFormSubmit={onFormSubmit}
        handleShareData={handleShareData}
        handleCheckboxChange={handleCheckboxChange}
        handleAutocompleteChange={handleAutocompleteChange}
        handleClose={handleClose}
        PropertyName={(e) => setAddProperty(e.target.value)}
        editExtension={editExtension}
        Policies={[
          {
            type: "text",
            name: "policy_name",
            placeholder: "Name",
          },
        ]}
        inputList={[
          {
            type: "number",
            name: "minimum_characters",
            placeholder: "Min Char",
          },
          {
            type: "number",
            name: "minimum_numeric",
            placeholder: "Min Numeric Char",
          },
          {
            type: "number",
            name: "minimum_alphabet",
            placeholder: "Min Alphabets",
          },
          {
            type: "number",
            name: "minimum_special",
            placeholder: "Min Special Char",
          },
        ]}
        password={[
          {
            type: "number",
            name: "incorrect_password",
            placeholder: "Inncorrect Password Attempts",
          },
        ]}
        linkSharing={[
          {
            type: "number",
            name: "minimum_days",
            placeholder: "Min Days",
          },
          {
            type: "number",
            name: "maximum_days",
            placeholder: "Max Days",
          },
        ]}
        email={[
          {
            type: "text",
            name: "subject",
            placeholder: "Subject",
          },
          {
            type: "text",
            name: "message",
            placeholder: "Message",
          },
        ]}
        BandWidth={[
          {
            type: "number",
            name: "minimum_upload",
            placeholder: "Min Upload(Mbps)",
          },
          {
            type: "number",
            name: "minimum_download",
            placeholder: "Max Download(Mbps)",
          },
        ]}
        recyclebin={[{ label: "Enable", name: "recycle_bin" }]}
        recyclebinfield={[
          {
            type: "number",
            name: "no_of_days",
            placeholder: "No. Of Days",
          },
        ]}
        version={[{ label: "Enable", name: "versions" }]}
        versionfield={[
          {
            type: "number",
            name: "no_of_versions",
            placeholder: "No. Of versions",
          },
        ]}
      />
      <Head title="Policies List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "40px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Policies</BlockTitle>
                <BlockDes className="text-soft">
                  <p>You have total {totalUsers} Policies.</p>
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
                          handleClick={() => setOpen({ ...open, status: true })}
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
          <PolicyTable
            searchTerm={searchTerm}
            headCells={tableHeader}
            onEditClick={onEditClick}
            allfolderlist={tableDropdown}
            handleClickOpen={handleClickOpen}
          />
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Policies;

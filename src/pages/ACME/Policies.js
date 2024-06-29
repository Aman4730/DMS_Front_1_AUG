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
import PolicyTable from "../../components/AllTables/PolicyTable";
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
    startDate: null,
    endDate: null,
    watermark_text: "",
    watermark_fontSize: "",
  });
  //datepicker
  const handleDateChange = (date, dateType) => {
    setAddPolicies((prevState) => ({
      ...prevState,
      [dateType]: date,
    }));
  };
  const [checkboxValues, setCheckboxValues] = useState({
    versions: false,
    recycle_bin: false,
    watermarkCheckbox: false,
    watermarkPrintId_timestamp: false,
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
  // const handleAutocompleteChange = (id, value) => {
  //   setAddPolicies((prevFormData) => ({
  //     ...prevFormData,
  //     [id]: value,
  //   }));
  // };
  // const handlemultiSelectChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   handleAutocompleteChange("selected_user", typeof value === 'string' ? value.split(',') : value);
  // };
  const handleAutocompleteChange = (id, value) => {
    setAddPolicies((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handlemultiSelectChange = (id) => (event) => {
    const {
      target: { value },
    } = event;
    handleAutocompleteChange(
      id,
      typeof value === "string" ? value.split(",") : value
    );
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
  let allUserNamesArr = [];
  tableDropdown?.forEach((row) => {
    row?.selected_users.forEach((user) => {
      allUserNamesArr.push(user);
    });
  });
  const filterUserDropdown = userDropdowns.filter(
    (email) => !allUserNamesArr.includes(email)
  );
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
      startDate: null,
      endDate: null,
      watermark_text: "",
      watermark_fontSize: "",
    });
    setCheckboxValues({
      versions: false,
      recycle_bin: false,
      watermarkCheckbox: false,
      watermarkPrintId_timestamp: false,
    });
    setEditExtension([]);
    setEditedId(0);
  };
  const startTimestamp = addPolicies?.startDate;
  const endTimestamp = addPolicies.endDate;
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedStartDate = startDate
    .toLocaleString("en-US", options)
    .replace(/\//g, "-");
  const formattedEndDate = endDate
    .toLocaleString("en-US", options)
    .replace(/\//g, "-");

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
        watermark_text: addPolicies.watermark_text,
        watermark_font: addPolicies.watermark_fontSize,
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
        watermark: checkboxValues.watermarkCheckbox,
        print_userid_timestamp: checkboxValues.watermarkPrintId_timestamp,
        recycle_bin: checkboxValues.recycle_bin,
        start_date: addPolicies?.startDate === null ? null : formattedStartDate,
        end_date: addPolicies?.endDate === null ? null : formattedEndDate,
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
        watermark_text: addPolicies.watermark_text,
        watermark_font: addPolicies.watermark_fontSize,
        file_extension: editExtension,
        subject: addPolicies.subject,
        message: addPolicies.message,
        minimum_upload: addPolicies.minimum_upload,
        minimum_download: addPolicies.minimum_download,
        versions: checkboxValues.versions,
        recycle_bin: checkboxValues.recycle_bin,
        watermark: checkboxValues.watermarkCheckbox,
        print_userid_timestamp: checkboxValues.watermarkPrintId_timestamp,
        no_of_days: addPolicies.no_of_days,
        no_of_versions: addPolicies.no_of_versions,
        start_date: addPolicies?.startDate === null ? null : formattedStartDate,
        end_date: addPolicies?.endDate === null ? null : formattedEndDate,
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
        const startDate = new Date(item.start_date);
        const endDate = new Date(item.end_date);
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
          startDate: startDate,
          endDate: endDate,
          minimum_upload: item.Bandwidth_min_max[0],
          minimum_download: item.Bandwidth_min_max[1],
          no_of_days: item.no_of_days,
          no_of_versions: item.no_of_versions,
          watermark_text: item.watermark_text,
          watermark_fontSize: item.watermark_font,
        });
        setCheckboxValues({
          versions: JSON.parse(item.versions),
          recycle_bin: JSON.parse(item.recycle_bin),
          watermarkCheckbox: JSON.parse(item.watermark),
          watermarkPrintId_timestamp: JSON.parse(item.print_userid_timestamp),
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
        title4="Email"
        todoList="true"
        title8="Versions"
        title5="BandWidth"
        title7="Recycle Bin"
        title3="Link Expiry"
        title2="File Extension"
        title1="Password Settings"
        title={editId ? "Update Policy" : "Add Policy"}
        tasks={tasks}
        editId={editId}
        addTask={addTask}
        open={open.status}
        saveEdit={saveEdit}
        editedTask={editedTask}
        cancelEdit={cancelEdit}
        removeTask={removeTask}
        onClickaddTask={addTask}
        addPolicies={addPolicies}
        handleClose={handleClose}
        startEditing={startEditing}
        editingIndex={editingIndex}
        onFormSubmit={onFormSubmit}
        handleDateChange={handleDateChange}
        editExtension={editExtension}
        userDropdowns={userDropdowns}
        setAddPolicies={setAddPolicies}
        groupsDropdown={groupsDropdown}
        checkboxValues={checkboxValues}
        handleShareData={handleShareData}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handlemultiSelectChange={handlemultiSelectChange}
        version={[{ label: "Enable", name: "versions" }]}
        handleAutocompleteChange={handleAutocompleteChange}
        PropertyName={(e) => setAddProperty(e.target.value)}
        recyclebin={[{ label: "Enable", name: "recycle_bin" }]}
        watermarkPrintId_timestamp={[
          { label: "Enable", name: "watermarkPrintId_timestamp" },
        ]}
        watermarkCheckbox={[{ label: "Enable", name: "watermarkCheckbox" }]}
        buttonSuccessTitle={editId ? "Update" : "Submit"}
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
            placeholder: "Max Upload(Mbps)",
          },
          {
            type: "number",
            name: "minimum_download",
            placeholder: "Max Download(Mbps)",
          },
        ]}
        recyclebinfield={[
          {
            type: "number",
            name: "no_of_days",
            placeholder: "No. Of Days",
          },
        ]}
        watermarktext={[
          {
            type: "text",
            name: "watermark_text",
            placeholder: "Watermark Text",
          },
          {
            type: "number",
            name: "watermark_fontSize",
            placeholder: "Font Size",
          },
        ]}
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

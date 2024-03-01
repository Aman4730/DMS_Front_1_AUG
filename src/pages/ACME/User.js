import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import SearchBar from "../../components/SearchBar";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import {
  Col,
  Icon,
  Button,
  RSelect,
  BlockDes,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../../../src/components/Component";
import UserForm from "../../components/Forms/UserForm";
import UserTable from "../../components/AllTables/UserTable";
const UserListRegularPage = () => {
  // Destructure useContext variables
  const {
    addUser,
    getUser,
    blockUser,
    deleteUser,
    contextData,
    getGroupsDropdown,
  } = useContext(UserContext);
  // Destructure the states
  const { setAuthToken } = useContext(AuthContext);
  const [userData, setUserData] = contextData;
  const [editId, setEditedId] = useState();
  const [sm, updateSm] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [toggleData, setToggleData] = useState([]);
  const [groupsDropdown, setGroupsDropdown] = useState([]);
  const [formData, setFormData] = useState({
    level_1: "",
    level_2: "",
    userValidity: "",
    display_name: "",
    emp_code: "",
    email: "",
    add_group: "",
    user_role: "",
    max_quota: "",
    password: "",
    user_type: "",
  });
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [open, setOpen] = React.useState({
    status: false,
    data: "",
  });
  //search
  const [searchTerm, setSearchTerm] = React.useState("");
  useEffect(() => {
    getUsers();
    getRolesDropdown();
  }, []);
  // Function to get roles dropdown
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
  // Function to get users based on current page
  const getUsers = () => {
    getUser(
      { pageNumber: currentPage, pageSize: itemPerPage },
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
  // Function to reset form state
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
  // Function to handle click and open a dialog box
  const handleClickOpen = (id) => {
    setOpen({
      status: true,
      data: id,
    });
  };
  // Function to handle closing the dialog box
  const handleClose = () => {
    setOpen({
      status: false,
      data: "",
    });
  };
  // Function to handle canceling the form and closing the modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };
  // Function to handle form submission for adding or editing a user
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
      // Call the 'addUser' function with the 'submittedData' for editing the user
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
          getUsers(); // Refresh the user list (assuming this function fetches the user list)
        },
        (apiErr) => {}
      );
    } else {
      // Add new user
      let submittedData = {
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
      // Call the 'addUser' function with the 'submittedData' for adding the user
      addUser(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
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
          getUsers(); // Refresh the user list (assuming this function fetches the user list)
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
    // Find the user with the given 'id' in the 'userData' array
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
  // Function to handle the click event when the user clicks on the delete button/icon associated with a specific user
  const onDeleteClick = (id) => {
    handleClose();
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
        }
      },
      (apiErr) => {}
    );
  };
  // Function to handle the click event when the user clicks on the block/unblock button associated with a specific user
  const onBlockClick = (id, user_status) => {
    let statusCheck = {
      id,
      user_status,
    };
    // Display notifications based on the 'user_status'
    if (user_status === false) {
      notification["warning"]({
        placement: "top",
        description: "",
        message: "User Inactive",
        style: {
          height: 60,
        },
      });
    } else {
      notification["success"]({
        placement: "top",
        description: "",
        message: "User Active",
        style: {
          height: 60,
        },
      });
    }
    // Call the 'blockUser' function with the 'statusCheck' for blocking or unblocking the user
    blockUser(
      statusCheck,
      (apiRes) => {
        // On successful API response
        if (200 === 200) {
          // Reset the 'statusCheck' object and perform other actions like resetting the form, closing modals, and refreshing the user list
          statusCheck = {};
          resetForm();
          setModal({ edit: false }, { add: false }); // There's an error in this line, the correct way is to use a single object: setModal({ edit: false, add: false });
          getUsers(); // Refresh the user list (assuming this function fetches the user list)
        }
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  // Fetch users on initial render

  // An array of options used in a dropdown or select input
  const options = [
    {
      label: "Admin",
      value: 1,
    },
    {
      label: "User",
      value: 1,
    },
    {
      label: "Guest",
      value: 1,
    },
  ];
  // An array of table header configurations used for displaying table headers
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
      id: "User Role",
      numeric: false,
      disablePadding: true,
      label: "User Role",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "35px" },
    },
  ];

  const { errors, register, handleSubmit, watch, triggerValidation } =
    useForm();

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
          headCells={tableHeader}
          allfolderlist={toggleData}
          onEditClick={onEditClick}
          handleClickOpen={handleClickOpen}
          onBlockClick={onBlockClick}
          searchTerm={searchTerm}
        />
        <Modal
          isOpen={modal.add}
          toggle={() => setModal({ add: true })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div>
              <h5 className="title">{editId ? "Update User" : "Add User"}</h5>
              <div>
                <Form
                  className="row gy-1"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Display Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="display_name"
                        defaultValue={formData.display_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px" }}
                        placeholder="Enter display_name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.display_name && (
                        <span className="invalid">
                          {errors.display_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Max Quota (Gb)</label>
                      <input
                        className="form-control"
                        type="number"
                        name="max_quota"
                        defaultValue={formData.max_quota}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px" }}
                        placeholder="Enter Quota"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.max_quota && (
                        <span className="invalid">
                          {errors.max_quota.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">User Role</label>
                      <input
                        className="form-control"
                        type="text"
                        name="user_role"
                        defaultValue={formData.user_role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px" }}
                        placeholder="Enter User Role"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.user_role && (
                        <span className="invalid">
                          {errors.user_role.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Employee Code</label>
                      <input
                        className="form-control"
                        name="emp_code"
                        defaultValue={formData.emp_code}
                        ref={register({ required: "This field is required" })}
                        minLength={10}
                        maxLength={10}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px" }}
                        placeholder="Enter Employee Code"
                        required
                      />
                      {errors.emp_code && (
                        <span className="invalid">
                          {errors.emp_code.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Password</label>
                      <input
                        className="form-control"
                        type="text"
                        name="password"
                        defaultValue={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px" }}
                        placeholder="Enter Password"
                      />
                      {/* {errors.password && (
                        <span className="invalid">
                          {errors.password.message}
                        </span>
                      )} */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        defaultValue={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px" }}
                        placeholder="Confirm Password"
                        // ref={register({
                        //   required: "This field is required",
                        //   validate: (value) =>
                        //     value === watch("password") ||
                        //     "Passwords don't match",
                        // })}
                      />
                      {/* {errors.confirmPassword && (
                        <span className="invalid">
                          {errors.confirmPassword.message}
                        </span>
                      )} */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px" }}
                        placeholder="Enter Email"
                      />
                      {errors.email && (
                        <span className="invalid">{errors.email.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-label"
                        style={{ marginBottom: "-10px" }}
                      >
                        User Type
                      </label>
                      <RSelect
                        options={options}
                        name="user_type"
                        // defaultValue="User Type"
                        defaultValue={formData.user_type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            user_type: e.label,
                            [e.label]: e.value,
                          })
                        }
                      />
                      {errors.user_type && (
                        <span className="invalid">
                          {errors.user_type.message}
                        </span>
                      )}
                      {/* <Autocomplete
                        size="small"
                        options={options}
                        getOptionLabel={(option) => option.label}
                        value={
                          options.find(
                            (option) => option.label === formData.user_type
                          ) || null
                        }
                        onChange={(event, newValue) => {
                          setFormData({
                            ...formData,
                            user_type: newValue ? newValue.label : "",
                            [newValue ? newValue.label : ""]: newValue
                              ? newValue.value
                              : "",
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="User Type"
                            error={Boolean(errors.user_type)}
                            helperText={
                              errors.user_type && errors.user_type.message
                            }
                          />
                        )}
                      /> */}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label
                        className="form-label"
                        style={{ marginBottom: "-10px" }}
                      >
                        Add to Groups
                      </label>
                      <RSelect
                        options={groupsDropdown}
                        name="add_group"
                        defaultValue="Please Select Groups"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            add_group: e.label,
                            [e.label]: e.value,
                          })
                        }
                      />

                      {errors.add_group && (
                        <span className="invalid">
                          {errors.add_group.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="8">
                    <FormGroup label="Validity" className="form-label">
                      <label
                        className="form-label"
                        style={{ marginBottom: "-10px" }}
                      >
                        Validity
                      </label>

                      <DatePicker
                        name="userValidity"
                        selected={formData.userValidity}
                        onChange={(e) =>
                          setFormData({ ...formData, userValidity: e })
                        }
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Validity"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                      />

                      {/* {errors.confirmPassword && <span className="invalid">{errors.confirmPassword.message}</span>} */}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <label
                      className="form-label"
                      style={{ marginBottom: "-10px" }}
                    >
                      Workflow
                    </label>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <input
                        className="form-control"
                        type="text"
                        name="level_1"
                        defaultValue={formData.level_1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px", marginBottom: "10px" }}
                        placeholder="L1 Email Id"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <input
                        className="form-control"
                        type="text"
                        name="level_2"
                        defaultValue={formData.level_2}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px", marginBottom: "10px" }}
                        placeholder="L2 Email Id"
                      />
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {editId ? "Update User" : "Add User"}
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={modal.edit}
          toggle={() => setModal({ edit: false })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update User</h5>
              <div className="mt-4"></div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default UserListRegularPage;

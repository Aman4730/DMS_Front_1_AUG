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
import { AuthContext } from "../../context/AuthContext";
import GroupTables from "../../components/Tables/GroupsTable";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Button,
  RSelect,
} from "../../../src/components/Component";
const UserListRegularPage = () => {
  const { contextData, add_group, getGroups, userDropdownU, deletegroup } =
    useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [userData, setUserData] = contextData;
  const [deleteId, setDeleteId] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const { setAuthToken } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [onSearchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userDropdowns, setUserDropdowns] = useState([]);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
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
  }, [currentPage]);
  useEffect(() => {
    getTotalGroups();
  }, [formData]);
  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        // const { data: { data :{data}},status, token }  = apiRes;
        const data = apiRes.data;
        const code = apiRes.status;
        const message =
          apiRes.data.message[
            ({ value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" })
          ];
        setUserDropdowns(
          data.data.map((gro) => ({
            label: gro.email,
            value: gro.email,
          }))
        );

        // setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getUserRselect();
  }, []);
  const getTotalGroups = () => {
    getGroups(
      { pageNumber: currentPage, pageSize: itemPerPage, search: onSearchText },
      (apiRes) => {
        const data = apiRes.data.data;
        const code = apiRes.status;
        const message = apiRes.data.message;
        const count = apiRes.data.count;
        setTotalUsers(count);

        if (code == 200) {
          setUserData(data);
        }
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    getTotalGroups();
  }, [currentPage]);
  useEffect(() => {
    getTotalGroups();
  }, [deleteId]);
  // function to reset the form
  const resetForm = () => {
    setFormData({
      selected_user: "",
      group_name: "",
      group_admin: "",
    });
    setEditedId(0);
  };
  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
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
                marginTop: "43px",
                height: "60px",
              },
            });
          }
          const code = 200;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getTotalGroups();
          }
          setAuthToken(token);
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
                marginTop: "43px",
                height: "60px",
              },
            });
          }
          const code = 200;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getUsers();
          }

          setAuthToken(token);
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
          // role: item.user_role,
          // status: item.status
        });

        setModal({ edit: false, add: true });
        setEditedId(id);
      }
    });
  };
  const onDeleteClick = (id) => {
    handleClose();
    setDeleteId(true);
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
        }
        const code = 200;
        if (code == 200) {
          resetForm();
          setModal({ edit: false }, { add: false });
          getTotalGroups();
        }
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = userData.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setUserData([...filteredObject]);
    } else {
      setUserData([...userData]);
    }
  }, [onSearchText, setUserData]);
  const tableHeader = [
    {
      id: "Group Name",
      numeric: false,
      disablePadding: true,
      label: "Group Name",
    },
    {
      id: "Group Admin",
      numeric: false,
      disablePadding: true,
      label: "Group Admin",
    },
    {
      id: "Selected User",
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
                          handleClick={() => setModal({ add: true })}
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
          <GroupTables
            headCells={tableHeader}
            allfolderlist={userData}
            onEditClick={onEditClick}
            handleClickOpen={handleClickOpen}
            searchTerm={searchTerm}
          />
        </Block>
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
            <div className="p-1">
              <h5 className="title">{editId ? "Update Group" : "Add Group"}</h5>
              <div className="mt-3">
                <Form
                  className="row gy-1"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Group Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="group_name"
                        defaultValue={formData.group_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        style={{ marginTop: "-8px" }}
                        placeholder="Enter group_name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.group_name && (
                        <span className="invalid">
                          {errors.group_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-label"
                        style={{ marginBottom: "-10px" }}
                      >
                        Selected Users
                      </label>
                      <RSelect
                        options={userDropdowns}
                        name="add_group"
                        defaultValue="Please Select Groups"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selected_user: e.label,
                            [e.label]: e.value,
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_user && (
                        <span className="invalid">
                          {errors.selected_user.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Group Admin</label>
                      <input
                        className="form-control"
                        name="group_admin"
                        defaultValue={formData.group_admin}
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
                        placeholder="Enter Group Admin"
                        required
                      />
                      {errors.group_admin && (
                        <span className="invalid">
                          {errors.group_admin.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <label
                      className="form-label"
                      style={{ marginBottom: "-8px" }}
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
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.level_1 && (
                        <span className="invalid">
                          {errors.level_1.message}
                        </span>
                      )}
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
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.level_2 && (
                        <span className="invalid">
                          {errors.level_2.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {editId ? "Update Group" : "Add Group"}
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

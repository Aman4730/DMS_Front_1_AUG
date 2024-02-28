import React, { useContext, useEffect, useState } from "react";
// import Content from "../../../layout/content/Content";
import Content from "../../layout/content/Content";
// import Head from "../../../layout/head/Head";
import Head from "../../layout/head/Head";
import moment from "moment-timezone";
import Switch from "react-switch";

import {
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
} from "../../components/Component";
import {
  filterRole,
  filterStatus,
  userData,
} from "../pre-built/user-manage/UserData";
import { bulkActionOptions, findUpper } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Stack, Typography } from "@mui/material";
const Workspacedata = () => {
  const {
    contextData,
    addWorkspace,
    getCabinet,
    userDropdownU,
    cabinetDropdown,
    getGroupsDropdown,
    getWorkspace,
  } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);
  const [userData, setUserData] = contextData;

  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [groupsDropdown, setGroupsDropdown] = useState([]);

  const [cabinetDropdowns, setCabinetdropdowns] = useState([]);

  function handleStatusToggle(id, checked) {
    // Your logic to update the status based on the id and checked value
  }
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    workspace_name: "",
    path_name: "",
    selected_groups: "",
    selected_users: "",
    selected_cabinet: "",
  });

  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [sort, setSortState] = useState("");
  const [pathDropdown, setpathDropdown] = useState([
    { value: "/d", label: "/d" },
    { value: "/c", label: "/c" },
    { value: "/f", label: "/f" },
  ]);
  const [roleDropdown, setRolewDropDown] = useState([
    { value: "Agent", label: "Agent" },
    { value: "Admin", label: "Admin" },
  ]);

  const [userDropdowns, setUserDropdowns] = useState([]);

  const getRolesDropdown = () => {
    getGroupsDropdown(
      {},

      (apiRes) => {
        // const { data: { data :{data}},status, token }  = apiRes;
        const data = apiRes.data;
        const code = apiRes.status;
        const message = apiRes.data.message;

        setGroupsDropdown(
          data.groups.map((gro) => ({
            label: gro.group_name,
            value: gro.id,
          }))
        );

        // setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  const getCabinetDropdown = () => {
    cabinetDropdown(
      {},

      (apiRes) => {
        // const { data: { data :{data}},status, token }  = apiRes;
        const data = apiRes.data;
        const code = apiRes.status;
        const message = apiRes.data.message;
        data.data.foreach((get) => {});

        setCabinetdropdowns(
          data.data.map((gro) => ({
            label: gro.cabinet_name,
            value: gro.id,
          }))
        );

        // setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  useEffect(() => {
    getRolesDropdown();
    getCabinetDropdown();
  }, []);

  const timezones = moment.tz.names().map((zone) => ({
    value: zone,
    label: `(UTC${moment.tz(zone).format("Z")}) ${zone}`,
  }));

  const sortFunc = (params) => {
    let defaultData = userData;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
      setUserData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
      setUserData([...sortedData]);
    }
  };

  // unselects the userData on mount

  // useEffect(() => {
  //   getTotalWorkspace()
  // }, [formData])

  useEffect(() => {
    let newData;
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setUserData([...newData]);
  }, []);

  useEffect(() => {
    getTotalWorkspace();
  }, [currentPage]);

  useEffect(() => {
    getTotalWorkspace();
  }, [formData]);

  const getUserRselect = () => {
    userDropdownU(
      {},
      (apiRes) => {
        // const { data: { data :{data}},status, token }  = apiRes;
        const data = apiRes.data;
        const code = apiRes.status;
        const message = apiRes.data.message;
        [
          { value: "en", label: "English" },
          { value: "es", label: "Spanish" },
          { value: "fr", label: "French" },
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

  // useEffect(() => {
  //   getUserRselect()
  // })

  useEffect(() => {
    getUserRselect();
  }, []);

  const getTotalWorkspace = () => {
    getWorkspace(
      { pageNumber: currentPage, pageSize: itemPerPage, search: onSearchText },
      (apiRes) => {
        // const { data: { data :{data}},status, token }  = apiRes;
        const data = apiRes.data.data;
        const code = apiRes.status;
        const message = apiRes.data.message;
        const count = apiRes.data.count;
        setTotalUsers(count);

        if (code == 200) {
          setUserData(data);
        }
        // setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  useEffect(() => {
    getTotalWorkspace();
  }, [currentPage]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = userData;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setUserData([...newData]);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      selected_groups: "",
      workspace_name: "",
      path_name: "",
      selected_users: "",
      selected_cabinet: "",
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
    // const { name, email, phone } = submitData;
    if (editId) {
      let submittedData = {
        id: editId,
        selected_groups: formData.selected_groups,
        workspace_name: formData.workspace_name,
        path_name: formData.path_name,
        selected_users: formData.selected_users,
        selected_cabinet: formData.selected_cabinet,
      };
      // setUserData([submittedData, ...userData]);
      addWorkspace(
        submittedData,
        (apiRes) => {
          const code = 200;
          // const { data: { data: { data, total }, meta: { code, message }, token } } = apiRes;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getTotalWorkspace();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        workspace_name: formData.workspace_name,
        path_name: formData.path_name,
        selected_groups: formData.selected_groups,
        selected_users: formData.selected_users,
        selected_cabinet: formData.selected_cabinet,
      };
      addWorkspace(
        submittedData,
        (apiRes) => {
          const code = 200;
          // const { data: { data: { data, total }, meta: { code, message }, token } } = apiRes;
          if (code == 200) {
            resetForm();
            setModal({ edit: false }, { add: false });
            getUsers();
          }
          setAuthToken(token);
        },
        (apiErr) => {}
      );
      // setUserData([submittedData, ...userData]);
    }

    // }
  };

  // submit function to update a new item
  // const onEditSubmit = (submitData) => {
  //   debugger
  //   const { workspace_name, email, path_name, addWorkspace, user_role } = submitData;
  //   let submittedData;
  //   let newitems = userData;
  //   newitems.forEach((item) => {
  //     if (item.id === editId) {
  //       submittedData = {
  //         id: item.id,
  //         avatarBg: item.avatarBg,
  //         workspace_name: workspace_name,
  //         user_role: user_role,
  //         selected_groups: selected_groups,
  //         addWorkspace: addWorkspace,
  //         image: item.image,
  //         role: item.role,
  //         email: email,
  //         balance: formData.balance,
  //         path_name: path_name,
  //         emailStatus: item.emailStatus,
  //         kycStatus: item.kycStatus,
  //         lastLogin: item.lastLogin,
  //         status: formData.status,
  //         country: item.country,
  //       };
  //     }
  //   });
  //   let index = newitems.findIndex((item) => item.id === editId);

  //   newitems[index] = submittedData;
  //   setModal({ edit: false });
  //   resetForm();
  // };

  // function that loads the want to editted userData
  const onEditClick = (id) => {
    userData.map((item) => {
      if (item.id == id) {
        setFormData({
          id: id,
          workspace_name: item.workspace_name,
          selected_groups: item.selected_groups,
          path_name: item.path_name,
          selected_users: item.selected_users,
          selected_cabinet: selected_cabinet,
          // role: item.user_role,
          // status: item.status
        });

        setModal({ edit: false, add: true });
        setEditedId(id);
      }
    });
  };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    let newData = userData;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Suspend";
    setUserData([...newData]);
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
  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = userData.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setUserData([...newData]);
  };

  // function which fires on applying selected action
  const onActionClick = (e) => {
    if (actionText === "suspend") {
      let newData = userData.map((item) => {
        if (item.checked === true) item.status = "Suspend";
        return item;
      });
      setUserData([...newData]);
    } else if (actionText === "delete") {
      let newData;
      newData = userData.filter((item) => item.checked !== true);
      setUserData([...newData]);
    }
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => {
    debugger;
    setCurrentPage(pageNumber);
  };

  const { errors, register, handleSubmit, watch, triggerValidation } =
    useForm();

  // useEffect(() => {
  //   if (watch("password")) {
  //     triggerValidation("confirmPassword");
  //   }
  // }, [watch, triggerValidation]);

  return (
    <React.Fragment>
      <Head title="User List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-19px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  My Workspace
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
                      {/* <li>
                      <Button color="light" outline className="btn-white">
                        <Icon name="download-cloud"></Icon>
                        <span>Export</span>
                      </Button>
                    </li> */}
                      <li className="nk-block-tools-opt">
                        <Button
                          color="primary"
                          className="btn-icon"
                          onClick={() => setModal({ add: true })}
                        >
                          <Icon class="icon ni ni-folder-plus"></Icon>
                          <em></em>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
        </Stack>
        <Block>
          <DataTable className="card-stretch">
            <div
              className="card-inner position-relative card-tools-toggle"
              style={{ height: "2px" }}
            >
              <div className="card-title-group">
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon
                          name="search"
                          style={{ marginTop: "-25px" }}
                        ></Icon>
                      </a>
                    </li>
                    <li>
                      <div className="toggle-wrap">
                        <div
                          className={`toggle-content ${
                            tablesm ? "content-active" : ""
                          }`}
                        >
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button
                                className="btn-icon btn-trigger toggle"
                                onClick={() => updateTableSm(false)}
                              >
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className={`card-search search-wrap ${!onSearch && "active"}`}
              >
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Search by user or email"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="searchGroup Name-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DataTableBody>
              <DataTableHead>
                <DataTableRow>
                  <span className="sub-text" style={{ fontWeight: "bold" }}>
                    Workspace Name
                  </span>
                </DataTableRow>
                {/* <DataTableRow size="md">
                  <span className="sub-text">Path</span>
                </DataTableRow> */}
                <DataTableRow size="lg">
                  <span className="sub-text" style={{ fontWeight: "bold" }}>
                    Selected Groups
                  </span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text" style={{ fontWeight: "bold" }}>
                    Selected User
                  </span>
                </DataTableRow>

                <DataTableRow size="lg">
                  <span className="sub-text" style={{ fontWeight: "bold" }}>
                    Selected Cabinet
                  </span>
                </DataTableRow>

                <DataTableRow className="nk-tb-actions gx-1">
                  <span
                    className="sub-text"
                    style={{ marginRight: "27px", fontWeight: "bold" }}
                  >
                    Action
                  </span>
                </DataTableRow>
              </DataTableHead>
              {userData.length > 0
                ? userData.map((item) => {
                    return (
                      <DataTableItem key={item.user_id}>
                        <DataTableRow size="md" style={{ innerHeight: "10px" }}>
                          <span>{item.workspace_name}</span>
                        </DataTableRow>

                        <DataTableRow>
                          <span>
                            {item.selected_users
                              ? item.selected_users.join(", ")
                              : ""}
                          </span>
                        </DataTableRow>
                        <DataTableRow>
                          <span>
                            {item.selected_users
                              ? item.selected_users.join(", ")
                              : ""}
                          </span>
                        </DataTableRow>
                        <DataTableRow size="md" style={{ innerHeight: "10px" }}>
                          <span>{item.selected_cabinet}</span>
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-tools">
                          <ul className="nk-tb-actions gx-1">
                            <li
                              className=""
                              onClick={() => onEditClick(item.id)}
                            >
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"edit" + item.id}
                                icon="edit-alt-fill"
                                direction="top"
                                text="Edit"
                                style={{
                                  backgroundColor: "transparent",
                                  boxShadow: "none",
                                  color: "inherit",
                                }}
                              />
                              &nbsp;&nbsp;
                            </li>
                            <Switch
                              onChange={(checked) =>
                                handleStatusToggle(item.id, checked)
                              }
                              checked={item.user_status === "Active"}
                              checkedIcon={false}
                              uncheckedIcon={false}
                              onColor="#28a745"
                              offColor="#3B3B3B"
                              height={17}
                              width={30}
                              handleDiameter={14}
                            />
                          </ul>
                        </DataTableRow>
                      </DataTableItem>
                    );
                  })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {userData.length > 0 ? (
                <div className="chat-user-pagination">
                  <PaginationComponent
                    size="sm"
                    totalItems={totalUsers}
                    itemPerPage={itemPerPage}
                    paginate={paginate}
                    // maxPaginationNumbers={20}
                    currentPage={currentPage}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-silent">No userData found</span>
                </div>
              )}
            </div>
          </DataTable>
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
            <div className="p-2">
              <h5 className="title">
                {editId ? "Update Woekspace" : "Add Workspace"}
              </h5>
              <div className="mt-4">
                <Form
                  className="row gy-4"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Cabinet Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="workspace_name"
                        defaultValue={formData.workspace_name}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        placeholder="Enter workspace_name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.workspace_name && <span className="invalid">{errors.workspace_name.message}</span>}
                    </FormGroup>
                  </Col> */}

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Workspace Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Workspace Name"
                        defaultValue={formData.workspace_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workspace_name: e.target.value,
                          })
                        }
                        placeholder="Enter Quota"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.workspace_name && (
                        <span className="invalid">
                          {errors.workspace_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Groups</label>
                      <RSelect
                        isMulti
                        options={groupsDropdown}
                        name="addWorkspace"
                        defaultValue="Please Select Groups"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selected_groups: e.map((option) => option.label),
                            [name]: e.map((option) => option.value),
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_groups && (
                        <span className="invalid">
                          {errors.selected_groups.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Select Cabinet</label>
                      <RSelect
                        isMulti
                        options={cabinetDropdowns}
                        name="addWorkspace"
                        defaultValue="Please Select Groups"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selected_cabinet: e.map((option) => option.label),
                            [name]: e.map((option) => option.value),
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_cabinet && (
                        <span className="invalid">
                          {errors.selected_cabinet.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Selected User</label>
                      <RSelect
                        isMulti
                        options={userDropdowns}
                        name="addWorkspace"
                        defaultValue="Please Select Groups"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            selected_users: e.map((option) => option.label),
                            [name]: e.map((option) => option.value),
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_users && (
                        <span className="invalid">
                          {errors.selected_users.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  {/* <Col md="6">
                    <FormGroup>

                      <label className="form-label">Browse File</label>
                      <input type="file" name="file" onChange={handleFileChange} />
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Path</label>
                      <RSelect
                        options={userDropdowns}
                        name="addWorkspace"
                        defaultValue="Please Select Groups"
                        onChange={(e) => setFormData({ ...formData, path_name: e.label, [e.label]: e.value })}
                        ref={register({ required: "This field is required" })}

                      />
                      {errors.path_name && <span className="invalid">{errors.path_name.message}</span>}
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Selected User</label>
                      <input
                        className="form-control"
                        type="text"
                        name="selected_groups"
                        defaultValue={formData.selected_groups}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        placeholder="Enter Quota"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.selected_groups && <span className="invalid">{errors.selected_groups.message}</span>}
                    </FormGroup>
                  </Col> */}

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {editId ? "Update Workspace" : "Add workspace"}
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
export default Workspacedata;

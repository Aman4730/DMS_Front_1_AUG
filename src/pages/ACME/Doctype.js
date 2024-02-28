import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import Content from "../../layout/content/Content";
import SearchBar from "../../components/SearchBar";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { Stack, Typography } from "@mui/material";
import DoctypeTable from "../../components/Tables/DoctypeTable";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  Icon,
  Col,
  Button,
} from "../../components/Component";
const Workspace = () => {
  const {
    contextData,
    getWorkspace,
    add_doctype,
    getdoclist,
    doctypeblock,
    deletedoctype,
  } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);
  const [userData, setUserData] = contextData;
  const [sm, updateSm] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [editId, setEditedId] = useState();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    permission: false,
  });
  const [formData, setFormData] = useState({
    Doctype: "",
  });
  const [permisssionData, setPermissionData] = useState({
    permission_upload: "",
    permission_view: "",
    permission_createfolder: "",
    permission_delete: "",
    permission_download: "",
    permission_share: "",
    permission_rename: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDoctype, setTotalDoctype] = useState(0);
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
  const [deleteId, setDeleteId] = useState(false);
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
    getdoctypelist();
  }, [formData]);

  const getTotalWorkspace = () => {
    getWorkspace(
      { pageNumber: currentPage, pageSize: itemPerPage, search: onSearchText },
      (apiRes) => {
        setTotalUsers(apiRes.data.count);
        if (apiRes.status == 200) {
          setUserData(apiRes.data.data);
          setPermissionData({});
        }
      },
      (apiErr) => {}
    );
  };
  const [docList, setDocList] = useState([]);
  const getdoctypelist = () => {
    getdoclist(
      {},
      (apiRes) => {
        setDocList(apiRes.data);
        setTotalDoctype(apiRes.data.length);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const resetForm = () => {
    setFormData({
      Doctype: "",
    });
    setEditedId(0);
  };
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        doctype: formData.Doctype,
      };
      add_doctype(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "DocType Created Successfully.",
              style: {
                height: 60,
              },
            });
          }
          const code = 200;
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
        doctype: formData.Doctype,
      };
      add_doctype(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "DocType Created Successfully.",
              style: {
                height: 60,
              },
            });
          }
          resetForm();
          onFormCancel();
        },
        (apiErr) => {}
      );
    }
  };
  const onBlockClick = (id, user_status) => {
    let statusCheck = {
      id,
      user_status,
    };
    notification["success"]({
      placement: "topRight",
      description: "",
      style: {
        height: 60,
      },
      message: user_status ? "Doctye Active" : "Doctye Inactive",
    });

    doctypeblock(
      statusCheck,
      (apiRes) => {
        if (200 == 200) {
          statusCheck = {};
          resetForm();
          setModal({ edit: false }, { add: false });
          getUsers();
        }
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };
  const onDeleteClick = (id) => {
    handleClose();
    setDeleteId(true);
    let deleteId = { id: id };
    deletedoctype(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 204) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Doctype Deleted Successfully.",
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
  const tableHeader = [
    {
      id: "Doctype Name",
      numeric: false,
      disablePadding: true,
      label: "Doctype Name",
    },
    {
      id: "Doctype Name",
    },
    {
      id: "Doctype Name",
    },
    {
      id: "Doctype Name",
    },

    {},
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: { marginLeft: "10px" },
    },
  ];
  const { errors, register, handleSubmit } = useForm();
  return (
    <React.Fragment>
      <ModalPop
        open={open.status}
        handleClose={handleClose}
        handleOkay={onDeleteClick}
        title={"Doc Type is being Deleted. Are You Sure !"}
        data={open.data}
      />
      <Head title="Doctype List - Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  Doc Type
                </Typography>
                <BlockDes className="text-soft">
                  <p>You have total {totalDoctype} Doc Type.</p>
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
        <DoctypeTable
          headCells={tableHeader}
          allfolderlist={docList}
          handleClickOpen={handleClickOpen}
          onBlockClick={onBlockClick}
          searchTerm={searchTerm}
        />
        <Modal
          isOpen={modal.add}
          toggle={() => setModal({ add: true })}
          className="modal-dialog-centered"
          size="small"
          style={{ width: "30%" }}
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
                {editId ? "Update Doc Type" : "Add Doc Type"}
              </h5>
              <div className="mt-4">
                <Form
                  className="row gy-4"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="12">
                    <FormGroup>
                      <input
                        className="form-control"
                        type="text"
                        name="Doctype"
                        width="100%"
                        defaultValue={formData.Doctype}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Doctype: e.target.value,
                          })
                        }
                        placeholder="Enter doc Type"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.workspace_name && (
                        <span className="invalid">
                          {errors.workspace_name.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>

                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          {editId ? "Update Doc Type " : "Add Doc Type"}
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
      </Content>
    </React.Fragment>
  );
};
export default Workspace;

import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import { Stack, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import SearchBar from "../../components/SearchBar";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import { FormGroup, Modal, ModalBody, Form } from "reactstrap";
import DoctypeTable from "../../components/AllTables/DoctypeTable";
import {
  Col,
  Icon,
  Button,
  BlockDes,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../../components/Component";
const Workspace = () => {
  const {
    getdoclist,
    contextData,
    add_doctype,
    getWorkspace,
    doctypeblock,
    deletedoctype,
  } = useContext(UserContext);
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [docList, setDocList] = useState([]);
  const [userData, setUserData] = contextData;
  const [totalDoctype, setTotalDoctype] = useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [formData, setFormData] = useState({
    Doctype: "",
  });
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    permission: false,
  });
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
    getdoctypelist();
  }, [formData]);

  const getTotalWorkspace = () => {
    getWorkspace(
      {},
      (apiRes) => {
        if (apiRes.status == 200) {
          setUserData(apiRes.data.data);
        }
      },
      (apiErr) => {
        console.log(apiErr)
      }
    );
  };
  const getdoctypelist = () => {
    getdoclist(
      {},
      (apiRes) => {
        setDocList(apiRes?.data?.workspaceAuths);
        setTotalDoctype(apiRes?.data?.length);
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
            resetForm();
            onFormCancel();
          }
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
    doctypeblock(
      statusCheck,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes.data.message,
            style: {
              height: 60,
            },
          });
          getdoctypelist();
        }
      },
      (apiErr) => {}
    );
  };
  const onDeleteClick = (id) => {
    handleClose();
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
          getdoctypelist();
        }
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
          rows={docList}
          headCells={tableHeader}
          searchTerm={searchTerm}
          onBlockClick={onBlockClick}
          handleClickOpen={handleClickOpen}
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

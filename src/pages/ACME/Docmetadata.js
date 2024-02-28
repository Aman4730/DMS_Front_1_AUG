import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import { useForm } from "react-hook-form";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import Content from "../../layout/content/Content";
import SearchBar from "../../components/SearchBar";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import Meta_Properties from "../../components/Meta_properties";
import { Form, Modal, ModalBody, FormGroup } from "reactstrap";
import DocmetaTable from "../../components/Tables/DocmetaTable";
import { Stack, TextField, Typography, Autocomplete } from "@mui/material";
import {
  Col,
  Icon,
  Button,
  BlockDes,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
} from "../../components/Component";
import DocMetaData from "../../components/Forms/DocMetaData";

const Docmetadata = () => {
  const {
    contextData,
    add_docmetadata,
    getdoclist,
    getmetalist,
    getWorkspace,
    meta_property,
    cabinetDropdown,
    deletemetadata,
    getproperties,
    blockMetaStatus,
  } = useContext(UserContext);
  const { setAuthToken } = useContext(AuthContext);
  const [userData, setUserData] = contextData;
  const [sm, updateSm] = useState(false);
  const [editId, setEditedId] = useState();
  const [metadata, setMetadata] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalmeta, setTotalMeta] = useState(0);
  const [docList, setDocList] = useState([]);
  const [metaList, setMetaList] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [cabinetList, setcabinetList] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const [addDocMetaData, setAddDocMetaData] = useState({
    selected_cabinet: "",
    selected_workspace: "",
    selected_doctype: "",
    metadata_name: "",
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
    setAddDocMetaData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleAutocompleteChange = (id, value) => {
    setAddDocMetaData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    permission: false,
    metaedit: false,
    properties: false,
  });
  // ----------------DeleteModelStart
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
  // ----------------DeleteModelEnd
  const [propertyDropdown, setPropertyDropdown] = useState("");
  const [fieldNameInput, setFieldNameInput] = useState("");
  const [propertyName, setPropertyName] = useState("");
  // -----------------------------Autocomplete data store
  const [cabinet, setCabinet] = useState([]);
  const [workspace, setworkspace] = useState([]);
  const [doctype, setDoctype] = useState([]);

  // -----------------------------Autocomplete data store

  // ----------------list Dropdown
  useEffect(() => {
    getdoctypelist();
    getCabinetDropdown();
    getWorkspaceDropdown();
  }, []);
  const [getWorkspaces, setGetWorkspaces] = useState([]);
  const getWorkspaceDropdown = () => {
    getWorkspace(
      {},
      (apiRes) => {
        const data = apiRes?.data.data;
        setGetWorkspaces(data?.map((workspace) => workspace?.workspace_name));
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
  const getdoctypelist = () => {
    getdoclist(
      {},
      (apiRes) => {
        const data = apiRes?.data;
        setDocList(data?.map((doctype) => doctype?.doctype_name));
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const getmetatypelist = () => {
    getmetalist(
      {},
      (apiRes) => {
        setTotalMeta(apiRes.data.length);
        setMetaList(apiRes?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  // ----------------list Dropdown
  const [metaId, setMetaId] = useState({});
  const [getProperties, setGetProperties] = useState([]);
  const onProperties = (doctype, id) => {
    let data = {
      meta_id: id,
      doctype: doctype,
    };
    setMetaId(data);
    getproperties(
      data,
      (apiRes) => {
        setGetProperties(apiRes.data);
      },
      (apiErr) => {}
    );
  };

  useEffect(() => {
    getdoctypelist();
    getCabinetDropdown();
  }, []);
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
  }, []);
  useEffect(() => {
    getTotalWorkspace();
    getmetatypelist();
  }, [cabinet]);

  // ----------------
  const getTotalWorkspace = () => {
    getWorkspace(
      {},
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

  //block meta properties
  const onBlockClick = (id, checked) => {
    let statusCheck = {
      id: id,
      status: checked,
    };
    blockMetaStatus(
      statusCheck,
      (apiRes) => {},
      (apiErr) => {}
    );
  };
  const [switchValues, setSwitchValues] = useState({});
  const handleSwitchChange = (event, id) => {
    const checked = event.target.checked;
    setSwitchValues((prevValues) => ({
      ...prevValues,
      [id]: {
        id,
        metaStatus: checked,
      },
    }));
  };
  // function to reset the form
  const resetForm = () => {
    setAddDocMetaData({
      selected_cabinet: "",
      selected_workspace: "",
      selected_doctype: "",
      metadata_name: "",
    });
    setEditedId(0);
  };
  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };
  // submit function to add a new item onSubmitProperties
  const onSubmitProperties = () => {
    if (editId) {
      let submittedData = {
        meta_id: metaId?.meta_id,
        doctype: metaId?.doctype,
        fieldname: fieldNameInput,
        fieldtype: propertyDropdown,
        metaproperties: todos,
      };
      meta_property(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Doc Metadata Edited Successfully",
              style: {
                height: 60,
              },
            });
            resetForm();
            setModal({ edit: false }, { add: false });
            getTotalGroups();
          }
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        meta_id: metaId?.meta_id,
        doctype: metaId?.doctype,
        fieldname: fieldNameInput,
        fieldtype: propertyDropdown,
        metaproperties: todos,
      };
      meta_property(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Doc Metadata Added Successfully",
              style: {
                height: 60,
              },
            });
            resetForm();
            setModal({ edit: false }, { add: false });
            getUsers();
          }
        },
        (apiErr) => {}
      );
    }
  };

  //doc type properties on submit
  const onFormSubmit = () => {
    if (editId) {
      let submittedData = {
        id: editId,
        metadata_name: addDocMetaData.metadata_name,
        workspace_name: addDocMetaData.selected_workspace,
        doctype: addDocMetaData.selected_doctype,
        cabinet_name: addDocMetaData.selected_cabinet,
      };
      add_docmetadata(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "Doc Metadata Edited Successfully.",
              style: {
                height: 60,
              },
            });
            handleCloseForm();
          }
        },
        (apiErr) => {}
      );
    } else {
      let submittedData = {
        metadata_name: addDocMetaData.metadata_name,
        workspace_name: addDocMetaData.selected_workspace,
        doctype: addDocMetaData.selected_doctype,
        cabinet_name: addDocMetaData.selected_cabinet,
      };
      add_docmetadata(
        submittedData,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiRes.data.message,
              style: {
                height: 60,
              },
            });
            handleCloseForm();
          }
        },
        (apiErr) => {
          if (apiErr.response.status == 400) {
            notification["success"]({
              placement: "top",
              description: "",
              message: apiErr.response.data.message,
              style: {
                height: 70,
              },
            });
          }
        }
      );
    }
  };
  // handle Delete Function
  const onDeleteClick = (id) => {
    let deleteId = { id: id };
    deletemetadata(
      deleteId,
      (apiRes) => {
        if (apiRes?.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Doc Metadata Deleted Successfully.",
            style: {
              height: 60,
            },
          });
          handleClose();
          getmetatypelist();
        }
      },
      (apiErr) => {}
    );
  };

  let [addProperty, setAddProperty] = useState("");
  let [todos, setTodos] = useState([]);
  const addTask = () => {
    setTodos([...todos, addProperty]);
    setAddProperty("");
  };
  const removeHandler = (id) => {
    let newTodos = todos.filter((ele, index) => index != id);
    setTodos(newTodos);
  };
  const editHandler = (id) => {
    setAddProperty(todos.filter((val, index) => index === id));
    removeHandler(id);
  };
  const tableHeader = [
    {
      id: "Doc Metadata Name",
      numeric: false,
      disablePadding: true,
      label: "Doc Metadata Name",
    },
    {
      id: "Cabinet Name",
      numeric: false,
      disablePadding: true,
      label: "Cabinet Name",
    },
    {
      id: "Workspace Name",
      numeric: false,
      disablePadding: true,
      label: "Workspace Name",
    },
    {
      id: "Doctype Name",
      numeric: false,
      disablePadding: true,
      label: "Doctype Name",
    },
    {
      id: "Action",
      numeric: false,
      disablePadding: true,
      label: "Action",
    },
  ];
  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <ModalPop
        open={open.status}
        handleClose={handleClose}
        handleOkay={onDeleteClick}
        title={"Doc Metadata is being Deleted. Are You Sure !"}
        data={open.data}
      />
      <Meta_Properties
        modal={modal}
        editId={editId}
        title={metaId?.doctype}
        switchValues={switchValues}
        setSwitchValues={setSwitchValues}
        handleSwitchChange={handleSwitchChange}
        onBlockClick={onBlockClick}
        getProperties={getProperties}
        toggle={() => setModal({ metaedit: false })}
        onFormCancel={onFormCancel}
        addTask={todos}
        onClickaddTask={() => addTask()}
        PropertyName={(e) => setAddProperty(e.target.value)}
        editHandler={(id) => editHandler(id)}
        removeHandler={(id) => removeHandler(id)}
        handleSubmit={handleSubmit}
        onSubmitProperties={onSubmitProperties}
        propertyDropdown={propertyDropdown}
        autocomplete={(e, v) => setPropertyDropdown(v)}
        FieldNameInput={(e) => setFieldNameInput(e.target.value)}
      />

      <Head title="Docmetadata- Regular"></Head>
      <Content>
        <Stack style={{ marginTop: "-28px" }}>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
                  Doc Metadata
                </Typography>
                <BlockDes className="text-soft">
                  <p>You have total {totalmeta} Doc Metadata.</p>
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
                          // handleClick={() => setModal({ add: true })}
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
        <DocMetaData
          editId={editId}
          docList={docList}
          openForm={openForm}
          cabinetList={cabinetList}
          addDocMetaData={addDocMetaData}
          handleChange={handleChange}
          onFormSubmit={onFormSubmit}
          getWorkspaces={getWorkspaces}
          handleCloseForm={handleCloseForm}
          handleAutocompleteChange={handleAutocompleteChange}
        />
        <DocmetaTable
          searchTerm={searchTerm}
          headCells={tableHeader}
          allfolderlist={metaList}
          onBlockClick={onBlockClick}
          onProperties={onProperties}
          handleClickOpen={handleClickOpen}
          setModal={setModal}
          toggle={() => setModal({ metaedit: true })}
        />
      </Content>
    </React.Fragment>
  );
};
export default Docmetadata;

import React, { useState, useContext, useEffect } from "react";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import { Stack, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import UserPermissionForm from "../../components/Forms/UserPermissionForm";
import UserPermissiontable from "../../components/AllTables/UserPermissiontable";

const UserPermission = () => {
  const { cabinetDropdown, fetchpermissions, getWorkspace } =
    useContext(UserContext);
  const [userPermission, setUserPermission] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const [editId, setEditedId] = useState(0);
  const [cabinetList, setcabinetList] = useState([]);
  // SMTP Details Form------
  const [formData, setFormData] = useState({
    cabinet_name: "",
    workspace_type: "",
    workspace_id: "",
  });
  //workSpaceType dropdown
  const WorkspaceTypes = [
    ...new Set(
      workspace
        .filter((data) => data.selected_cabinet === formData?.cabinet_name)
        .map((data) => data.workspace_type)
    ),
  ];
  //workspace_name dropdown
  const matchedWorkspace = workspace?.filter(
    (data) =>
      data.workspace_type === formData?.workspace_type &&
      data.selected_cabinet === formData?.cabinet_name
  );

  const workspaceDetails = matchedWorkspace.map(({ id, workspace_name }) => ({
    id,
    workspace_name,
  }));
  useEffect(() => {
    getWorkspaces();
    getCabinetDropdown();
  }, []);

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
  const getWorkspaces = () => {
    getWorkspace(
      {},
      (apiRes) => {
        setWorkspace(apiRes?.data?.data);
      },
      (apiErr) => {
        console.log(apiErr);
      }
    );
  };
  const handleAutocompleteChange = (id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const resetForm = () => {
    setFormData({
      cabinet_name: "",
      workspace_name: "",
      workspace_type: "",
    });
  };
  const handleSubmit = () => {
    let data = {
      cabinate: formData?.cabinet_name,
      workspaceType: formData?.workspace_type,
      workSpaceId: formData?.workspace_id?.id,
    };
    fetchpermissions(
      data,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Data Fetch Successfully.",
            style: {
              height: 60,
            },
          });
          setUserPermission(apiRes.data.data);
          resetForm();
        }
      },
      (apiErr) => {}
    );
  };
  return (
    <React.Fragment>
      <Head title="SMTP - Regular"></Head>
      <Content>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mt: -3.4 }}
        >
          <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
            User Permissions
          </Typography>
        </Stack>
        <UserPermissionForm
          editId={editId}
          formData={formData}
          cabinetList={cabinetList}
          handleSubmit={handleSubmit}
          workspaceType={WorkspaceTypes}
          matchedWorkspace={workspaceDetails}
          handleAutocompleteChange={handleAutocompleteChange}
        />
        <UserPermissiontable userPermission={userPermission} />
      </Content>
    </React.Fragment>
  );
};
export default UserPermission;

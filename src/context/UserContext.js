import React, { useState, createContext, useEffect } from "react";
export const UserContext = createContext();
import { AxiosPost, AxiosGet } from "./Axios";

export const UserContextProvider = (props) => {
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const userData = JSON.parse(data);
      setIsLogin(userData);
    } else {
      localStorage.removeItem("user");
    }
  }, []);
  const [isLogin, setIsLogin] = useState({});
  const [userData, setUserData] = useState([]);
  const [isGuestLogin, setIsGuestLogin] = useState([]);
  const [workSpaceData, setWorkspaceData] = useState({});
  async function Login(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "login",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function guestlogin(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "guestlogin",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getGuestdata(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "guestdata",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function logout(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "logout",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function CommonNotes(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "savenotes",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addUser(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "addUser",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getSystemInfo(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "systemInfo",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function forgetpass(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "forgetpass",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function editsmtp(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "editsmtp",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addtestemail(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "testemail",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addPermission(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "wauth",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function add_group(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "add_group",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function createsmtp(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "createsmtp",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function get_togggle(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "userdropdown",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function adduploadcreate(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "uploadcreate",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addcreatefolder(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "createfolder",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addmetaproperties(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "metagetproperties",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getfetchlink(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "guestsignup",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getWorkspacePermission(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "get_workspace_permission",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addfolderlogs(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "folderlogs",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function add_permission(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "add_permission",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addNewcreatefolder(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "createfolders",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function updatefolders(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "updatefolders",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addCabinet(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "add_cabinet",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addWorkspace(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "addWorkspace",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function downloadfile(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "downloadfile",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function downloadfolders(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "downloadfolders",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function Cancelfileupload(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "cancelfileupload",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function add_doctype(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "createdoctype",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function add_metaproperties(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "getmetaproperties",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getproperties(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getproperties",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function meta_property(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "metaproperty",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function add_docmetadata(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "createmetadata",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function add_updatefolder(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "updatefolder",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function folders(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "folders",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addFolderWork(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "addFolder",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function addFileWork(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "filedata",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function add_Policies(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "addpolicies",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function add_createworkflow(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "createworkflow",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getworkflow(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost(
      "getworkflow",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deleteworkflow(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "deleteworkflow",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getquotadetails(
    userSubmittedData,
    handleApiRes,
    handleApiError
  ) {
    await AxiosPost(
      "quotadetails",
      userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getlatestfolderfiles(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "latestfolderfiles",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getpolicy(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getpolicy",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getcountextension(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "countextension",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getCountworkspace(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "countworkspace",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getUser(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getUsers",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getsmtp(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getsmtp",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getteamspace(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getteamspace",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getloggs(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getloggs",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getnotes(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getnotes",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getFolderData(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getdata",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getdoclist(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "doclist",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getmetalist(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "metalist",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getCabinet(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getCabinet",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getadminteamspace(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "adminteamspace",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getsharedfile(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "sharedfile",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getallversions(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getallversions",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getrecycle(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getrecycle",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function restoreFiles(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "restore",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deleterestore(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deleterestore",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getfoldernames(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getFolders",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getfoldernameslist(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getfoldernames",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function workspaceAuths(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "workspace_auths",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getWorkspace(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "getworkspace",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deleteUser(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deleteuser",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deletesmtp(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deletesmtp",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deletepolicy(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deletepolicy",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deletefile(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deletefile",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deletegroup(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deletegroup",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deletecabinet(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deletecabinet",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deleteworkspace(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deleteworkspace",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deletemetadata(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deletemetadata",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deletedoctype(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deletedoc",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function deleteNotes(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "deletenotes",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function blockUser(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "blockuser",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function doctypeblock(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "docstatus",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function blockMetaStatus(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "metastatus",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getGroupsDropdown(data, handleSuccess, handleApiError) {
    await AxiosPost(
      "dropdown_groups",
      data,
      (apiRes) => {
        handleSuccess(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function cabinetDropdown(data, handleSuccess, handleApiError) {
    await AxiosPost(
      "cabinetdropdown",
      data,
      (apiRes) => {
        handleSuccess(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function userDropdownU(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "userDropdownU",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function getGroups(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "get_groups",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function updateUser(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "verifyOTP",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  return (
    <UserContext.Provider
      value={{
        contextData: [userData, setUserData],
        Login: Login,
        logout: logout,
        forgetpass: forgetpass,
        CommonNotes: CommonNotes,
        addUser: addUser,
        createsmtp: createsmtp,
        add_group: add_group,
        addCabinet: addCabinet,
        add_doctype: add_doctype,
        addFileWork: addFileWork,
        add_Policies: add_Policies,
        addtestemail: addtestemail,
        addWorkspace: addWorkspace,
        meta_property: meta_property,
        addFolderWork: addFolderWork,
        addfolderlogs: addfolderlogs,
        addPermission: addPermission,
        add_permission: add_permission,
        addcreatefolder: addcreatefolder,
        add_docmetadata: add_docmetadata,
        adduploadcreate: adduploadcreate,
        add_updatefolder: add_updatefolder,
        addmetaproperties: addmetaproperties,
        addNewcreatefolder: addNewcreatefolder,
        add_createworkflow: add_createworkflow,
        add_metaproperties: add_metaproperties,
        getUser: getUser,
        getsmtp: getsmtp,
        getloggs: getloggs,
        getnotes: getnotes,
        getpolicy: getpolicy,
        getGroups: getGroups,
        guestlogin: guestlogin,
        getdoclist: getdoclist,
        getCabinet: getCabinet,
        getmetalist: getmetalist,
        getworkflow: getworkflow,
        getrecycle: getrecycle,
        get_togggle: get_togggle,
        getGuestdata: getGuestdata,
        getteamspace: getteamspace,
        getSystemInfo: getSystemInfo,
        getWorkspace: getWorkspace,
        getfetchlink: getfetchlink,
        getsharedfile: getsharedfile,
        getproperties: getproperties,
        getFolderData: getFolderData,
        getfoldernames: getfoldernames,
        getallversions: getallversions,
        getquotadetails: getquotadetails,
        getcountextension: getcountextension,
        getCountworkspace: getCountworkspace,
        getGroupsDropdown: getGroupsDropdown,
        getadminteamspace: getadminteamspace,
        getfoldernameslist: getfoldernameslist,
        getlatestfolderfiles: getlatestfolderfiles,
        getWorkspacePermission: getWorkspacePermission,
        editsmtp: editsmtp,
        updateUser: updateUser,
        userDropdownU: userDropdownU,
        deleteNotes: deleteNotes,
        deletesmtp: deletesmtp,
        deletepolicy: deletepolicy,
        deleteworkflow: deleteworkflow,
        downloadfile: downloadfile,
        downloadfolders: downloadfolders,
        deletefile: deletefile,
        deleteUser: deleteUser,
        deletegroup: deletegroup,
        deleterestore: deleterestore,
        deletedoctype: deletedoctype,
        deletecabinet: deletecabinet,
        deletemetadata: deletemetadata,
        deleteworkspace: deleteworkspace,
        blockUser: blockUser,
        doctypeblock: doctypeblock,
        blockMetaStatus: blockMetaStatus,
        cabinetDropdown: cabinetDropdown,
        updatefolders: updatefolders,
        workspaceAuths: workspaceAuths,
        Cancelfileupload: Cancelfileupload,
        folders: folders,
        restoreFiles: restoreFiles,
        isLogin,
        isGuestLogin,
        workSpaceData,
        setIsLogin,
        setWorkspaceData,
        setIsGuestLogin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

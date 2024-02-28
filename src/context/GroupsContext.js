import React, { useState, createContext, useEffect } from "react";
export const GroupsContext = createContext();
import { AxiosPost, AxiosGet } from './Axios'

export const GroupsContextProvider = (props) => {
    debugger
  const [userData, setUserData] = useState([]);

  async function addUser(userSubmittedData, handleApiRes, handleApiError) {
    await AxiosPost("addUser", userSubmittedData,
      (apiRes) => {
        handleApiRes(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  };
  async function getUser(data, handleApiRes, handleApiError) {
    await AxiosPost("getUsers", data,
      (apiRes) => {
        handleApiRes(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  };

  async function getGroupsDropdown(data, handleSuccess,handleApiError) {
    await AxiosGet("get_groups",
      (apiRes) => {
        handleSuccess(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  };

  async function updateUser(data, handleApiRes, handleApiError) {
    await AxiosPost("verifyOTP", data,
      (apiRes) => {
        handleApiRes(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  };

  return <GroupsContext.Provider value={{
    contextData: [userData, setUserData],
    addUser: addUser,
    getUser: getUser,
    updateUser: updateUser,
    getGroupsDropdown:getGroupsDropdown
  }}>{props.children}</GroupsContext.Provider>;
};

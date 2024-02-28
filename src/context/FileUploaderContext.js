// import React, { useState, createContext, useEffect } from "react";
// export const FileUploaderContext = createContext();
// import { AxiosPost } from './Axios'
// import axios from "axios";
// import ApiPaths from "./ApiPaths.json"; //json file containing ApiPaths data

// export const FileUploaderContextProvider = (props) => {
//   const [docData, setDocData] = useState({});
//   const url = "http://localhost:4001";
//   const axiosFileUploadInstance = axios.create({
//     baseURL: url
//   });
//   axiosFileUploadInstance.defaults.headers.common = {
//     Authorization: localStorage.getItem(
//       "token")
//   };
//   async function uploadDoc(file, handleApiRes, handleApiError) {

//     const formData = new FormData();
//     formData.append("uploaded_file", file); 
//     await axiosFileUploadInstance.post(ApiPaths.endPoints["uploadFile"], formData)
//     .then(res => {
//       if (handleApiRes) {
//         handleApiRes(res);
//       }
//     })
//     .catch(err => {
//       if (handleApiError) handleApiError(err);
//     });

//   };
//   return <FileUploaderContext.Provider value={{
//     // contextData: [docData, setDocData],
//     uploadDoc: uploadDoc
//   }}>{props.children}</FileUploaderContext.Provider>;
// };



import React, { useState, createContext, useEffect } from "react";
import { AxiosPost, AxiosPostForFileUpload, AxiosPostForFileUploadByCustomer } from './Axios'
export const FileUploaderContext = createContext();

export const FileUploaderContextProvider = (props) => {
  //! file upload
  async function uploadDoc(file, type, handleApiRes, handleApiError) {
    await AxiosPostForFileUpload(file, type,
      (apiRes) => {
        handleApiRes(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  }
  async function uploadByCustomer(file, type, handleApiRes, handleApiError) {
    await AxiosPostForFileUploadByCustomer(file, type,
      (apiRes) => {
        handleApiRes(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  }
  return <FileUploaderContext.Provider value={{
    uploadDoc: uploadDoc,
    uploadByCustomer: uploadByCustomer
  }}>{props.children}</FileUploaderContext.Provider>;
};

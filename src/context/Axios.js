import axios from "axios";
import ApiPaths from "./ApiPaths.json"; //json file containing ApiPaths data
import { Button, notification } from "antd";
import { useHistory } from "react-router-dom";

// const url = "http://localhost:4001/"; //! local
const url = `${process.env.REACT_APP_API_URL_LOCAL}/`; //! live


let token = localStorage.getItem("token") || "";
const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    Authorization: token,
  },
});

const setAuthToken = (token) => {
  axios.defaults.headers.common = {
    Authorization: localStorage.getItem("token"),
  };
  axiosInstance.defaults.headers.common = {
    Authorization: localStorage.getItem("token"),
  };
};
const setCustomerAuthToken = (token) => {
  axios.defaults.headers.common = {
    Authorization: localStorage.getItem("customerToken"),
  };
  axiosInstance.defaults.headers.common = {
    Authorization: localStorage.getItem("customerToken"),
  };
};

const navigateToLogin = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("guest");
  localStorage.removeItem("guestlogin");
  // Destroy existing notification
  notification.destroy("sessionExpired");
};
function AxiosPost(key, body, handleSuccess, handleError, config = {}) {
  // if (key != 'loginWIthOTP') {
  if (key == "updateCustomerBySelf") {
    setCustomerAuthToken();
  } else {
    setAuthToken();
  }
  // }
  let req = { ...body };
  let finalApiUrl = url + ApiPaths.endPoints[key];
  axios
    .post(finalApiUrl, req, config)
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
    })
    .catch((err) => {
      const errorMsg = err?.response?.data?.message;
      const status = err?.response?.status;
      console.log(err?.response?.data?.message, "===err");
      // JWT Token expiration handling
      if (errorMsg === "jwt expired" && status === 400) {
        notification.open({
          key: "sessionExpired",
          placement: "topRight",
          message: "Session Expired",
          description: "Your session has expired. Please log in again.",
          btn: (
            <Button
              type="primary"
              size="small"
              onClick={() => navigateToLogin()}
            >
              Go to Login
            </Button>
          ),
          duration: null,
        });
      } else {
        console.error("Error:", err);
      }

      if (handleError) handleError(err);
    });
}
function AxiosPostURL(url, body, handleSuccess, handleError) {
  let req = { ...body };

  axios
    .post(url, req)
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
    })
    .catch((err) => {
      if (handleError) handleError(err);
    });
}

function AxiosPostForFileUpload(file, type, handleSuccess, handleError) {
  if (type == "customer") {
    setCustomerAuthToken();
  } else {
    setAuthToken();
  }
  const formData = new FormData();
  formData.append("uploaded_file", file);
  let fileUploadApiURl = url + ApiPaths.endPoints["uploadFile"];
  axios
    .post(
      fileUploadApiURl,
      formData
      //   {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     // "Authorization": sessionStorage.getItem("token"),
      //   }
      // }
    )
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
    })
    .catch((err) => {
      if (handleError) handleError(err);
    });
}
function AxiosPostForFileUploadByCustomer(
  file,
  type,
  handleSuccess,
  handleError
) {
  setCustomerAuthToken();
  const formData = new FormData();
  formData.append("uploaded_file", file);
  let fileUploadApiURl = url + ApiPaths.endPoints["uploadByCustomer"];
  axios
    .post(
      fileUploadApiURl,
      formData
      //   {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     // "Authorization": sessionStorage.getItem("token"),
      //   }
      // }
    )
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
    })
    .catch((err) => {
      if (handleError) handleError(err);
    });
}

// function AxiosPatch(key, body, handleSuccess, handleError, config = {}) {
//   setAuthToken();
//   let fk_id_org = parseInt(sessionStorage.getItem("orgId"))
//   axios
//     .patch(url + ApiPaths.endPoints[key], { fk_id_org, ...body }, config)
//     .then(res => {
//       if (handleSuccess) handleSuccess(res);
//     })
//     .catch(err => {
//       if (handleError) handleError(err);
//     });
// }

// function AxiosPut(key, body, handleSuccess, handleError, config = {}) {
//   setAuthToken();
//   let fk_id_org = parseInt(sessionStorage.getItem("orgId"))
//   axios
//     .put(url + ApiPaths.endPoints[key], { fk_id_org, ...body }, config)
//     .then(res => {
//       if (handleSuccess) handleSuccess(res);
//     })
//     .catch(err => {
//       if (handleError) handleError(err);
//     });
// }

function AxiosGet(key, handleSuccess, handleError, config = {}) {
  setAuthToken();
  axios
    .get(url + ApiPaths.endPoints[key], config)
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
    })
    .catch((err) => {
      if (handleError) handleError(err);
    });
}

function AxiosGetWithParams(
  key,
  data,
  handleSuccess,
  handleError,
  config = {}
) {
  const { authToken } = data;
  axios.defaults.headers.common = {
    Authorization: authToken,
  };
  axios
    .get(url + ApiPaths.endPoints[key], {})
    .then((res) => {
      if (handleSuccess) handleSuccess(res);
    })
    .catch((err) => {
      if (handleError) handleError(err);
    });
}

export {
  url,
  axiosInstance,
  AxiosPost,
  AxiosGet,
  AxiosGetWithParams,
  AxiosPostForFileUpload,
  AxiosPostForFileUploadByCustomer,
  AxiosPostURL,
};

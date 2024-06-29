import React, { useState } from "react";
import { notification } from "antd";
import AuthFooter from "./AuthFooter";
import { Link } from "react-router-dom";
import Head from "../../layout/head/Head";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Alert } from "reactstrap";
import TextCaptcha from "../../components/TextCaptcha";
import PageContainer from "../../layout/page-container/PageContainer";
import {
  Icon,
  Block,
  Button,
  BlockDes,
  BlockHead,
  BlockTitle,
  PreviewCard,
  BlockContent,
} from "../../components/Component";

const Login = () => {
  const [errorVal, setError] = useState("");
  const [passState, setPassState] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const history = useHistory();
  const onFormSubmit = (formData) => {
    
    fetch(`${process.env.REACT_APP_API_URL_LOCAL}/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.status) {
          notification["success"]({
            placement: "top",
            message: "Login Successfully.",
            style: {
              height: 60,
            },
          });
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data));
          history.push("/");
        } else if (data.status == false) {
          notification["warning"]({
            placement: "top",
            message: data?.message,
            style: {
              height: 60,
            },
          });
        } else {
          notification["warning"]({
            placement: "top",
            message: data?.message,
            style: {
              height: 60,
            },
          });
        }
      })
      .catch((error) => {
        if (error.status == 500) {
          notification["error"]({
            placement: "top",
            description: "",
            message: "Server Error",
            style: {
              height: 60,
            },
          });
        }
      });
  };

  // Captcha
  const [captchaText, setCaptchaText] = useState(generateCaptchaText());
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  function generateCaptchaText() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return captcha;
  }

  function reloadCaptcha() {
    setCaptchaText(generateCaptchaText());
    setUserInput("");
    setIsCorrect(false);
  }

  function handleCaptchaInput(event) {
    setUserInput(event.target.value);
    setIsCorrect(false);
  }

  function handleSubmitCaptcha(event) {
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setIsCorrect(true);
      onFormSubmit(formData);
    } else {
      setIsCorrect(false);
      reloadCaptcha();
      notification["error"]({
        placement: "top",
        message: "Invalid Captcha",
        style: {
          height: 60,
        },
      });
    }
  }

  const { errors, register, handleSubmit } = useForm();
  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead style={{ border: "1px solid red" }}>
              <BlockContent>
                <div className="brand-logo text-center">
                  <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                    <img
                      // className="logo-dark w-35"
                      style={{width:"40%" ,marginBottom:"2px"}}
                      src="/Image/acmeLogo.jpeg"
                      alt="logo-dark"
                    ></img>
                  </Link>
                </div>
                <BlockTitle tag="h5" className="text-center">
                  Sign In - ACME DocHub
                </BlockTitle>
                <BlockDes></BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> {errorVal}
                </Alert>
              </div>
            )}
            <Form
              className="is-alter"
              onSubmit={handleSubmit(handleSubmitCaptcha)}
            >
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Login Id
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your registered email"
                    className="form-control-lg form-control"
                  />
                  {errors.email && (
                    <span className="invalid">{errors.email.message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${
                      passState ? "is-hidden" : "is-shown"
                    }`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon
                      name="eye-off"
                      className="passcode-icon icon-hide"
                    ></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your password"
                    className={`form-control-lg form-control ${
                      passState ? "is-hidden" : "is-shown"
                    }`}
                  />
                  {errors.password && (
                    <span className="invalid">{errors.password.message}</span>
                  )}
                </div>
              </FormGroup>
              <TextCaptcha
                userInput={userInput}
                isCorrect={isCorrect}
                captchaText={captchaText}
                reloadCaptcha={reloadCaptcha}
                handleInputChange={handleCaptchaInput}
                handleSubmit={handleSubmitCaptcha}
                generateCaptchaText={generateCaptchaText}
              />
              <FormGroup>
                <Button
                  size="lg"
                  className="btn-block"
                  type="submit"
                  color="primary"
                  style={{ marginTop: "5px" }}
                >
                  Login
                </Button>
              </FormGroup>
            </Form>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;





// import React from "react";
// import "./styles.css";
// import { Grid, TextField } from "@mui/material";

// const App = () => {
//   return (
//     <div>
//       <header className="header"></header>
//       <div className="content">
//         <Grid
//           container
//           spacing={2}
//           direction="row"
//           className="content"
//           justifyContent="space-around"
//         >
//           <Grid item xs={4}>
//             <img
//               className="responsive-img"
//               src="/Image/loginImage.jpg"
//               alt="Image"
//             />
//           </Grid>
//           <Grid item xs={5}>
//             <div className="login-container">
//               <h3>LOGO</h3>
//               <h6>Login to Your Account</h6>
//               <Grid container spacing={2}>
//                 <Grid item xs={7}>
//                   <label>Email</label>
//                   <TextField
//                     type="text"
//                     size="small"
//                     name="Email"
//                     label="Email"
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={7}>
//                   <label>Password</label>
//                   <TextField
//                     type="password" // Changed to password type
//                     size="small"
//                     name="Password"
//                     label="Password"
//                     fullWidth
//                   />
//                 </Grid>
//               </Grid>
//             </div>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default App;

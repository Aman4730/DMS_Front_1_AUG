import React, { useState, useContext } from "react";
import PageContainer from "../../layout/page-container/PageContainer";
import acmeLogo from "../../images/AcmeTrans.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { notification } from "antd";
import { useHistory } from "react-router-dom";
import { Stack } from "@mui/material";
import { UserContext } from "../../context/UserContext";

const ForgotPassword = () => {
  // Destructure useContext variables
  // const { forgetpass } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [loginData, setLoginData] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    emp_code: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const history = useHistory();
  const onFormSubmit = (formData) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL_LOCAL}/forgetpasslink`, {
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
        notification["success"]({
          placement: "'top",
          description: "",
          message: data.message,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const onFormSubmit = () => {
  //   let data = {
  //     emp_code: formData?.email,
  //     email: formData?.emp_code,
  //   };
  //   forgetpass(
  //     data,
  //     (apiRes) => {
  //       setAddProperties(apiRes.data);
  //       getUsers();
  //       setAuthToken(token);
  //     },
  //     (apiErr) => {}
  //   );
  // };
  const { errors, register, handleSubmit } = useForm();
  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <div className="brand-logo text-center">
                  <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                    <img
                      className="logo-dark w-50"
                      src="/Image/acmeLogo.jpeg"
                      alt="logo-dark"
                    ></img>
                  </Link>
                </div>
                <BlockTitle tag="h5" className="text-center">
                  Reset Password - Acme DocHub
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
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Login Id
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    name="emp_code"
                    value={formData.emp_code}
                    onChange={handleInputChange}
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your registered emp_code"
                    className="form-control-lg form-control"
                  />
                  {errors.email && (
                    <span className="invalid">{errors.emp_code.message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email Id
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="email"
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
                <Button
                  size="lg"
                  className="btn-block"
                  type="submit"
                  color="primary"
                >
                  Send Reset Link
                </Button>
              </FormGroup>
              <div
                className="form-note-s2"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                  <strong>Return to login</strong>
                </Link>
              </div>
            </Form>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default ForgotPassword;

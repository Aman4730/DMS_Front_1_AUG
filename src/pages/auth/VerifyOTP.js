import React, { useState, useContext } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
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

const Login = () => {
  const { setAuthToken, userAuthContextData, verifyOTP } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [userData] = userAuthContextData;
  const onFormSubmit = (formData) => {
    setLoading(true);
    if (formData.otp) {
      verifyOTP({ otp: formData.otp },
        apiSuccessRes => {
          const { data: { token, meta: { code, message } } } = apiSuccessRes;
          if(code==200){
            setAuthToken(token)
            setTimeout(() => {
              window.history.pushState(
                `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
                "auth-login",
                `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
              );
              window.location.reload();
            }, 2000);
          }
          else{
            setTimeout(() => {
              setError(message);
              setLoading(false);
            }, 2000);
          }
        
        },
        apiErrorRes => {
          setTimeout(() => {
            setError("OTP verification failed!");
            setLoading(false);
          }, 2000);
        })

    } else {
      setTimeout(() => {
        setError("OTP verification failed!");
        setLoading(false);
      }, 2000);
    }
  };

  const { errors, register, handleSubmit } = useForm();
  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={process.env.REACT_APP_LOGO_LIGHT} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={process.env.REACT_APP_LOGO_DARK} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Verify OTP</BlockTitle>
                <BlockDes>
                  <p>We have sent a OTP on your registered mobile number <strong>{userData.userNumber}</strong> please check your <Icon name="whatsapp"></Icon> Whats app</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {errorVal}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    OTP
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="otp"
                    ref={register({ required: "This field is required" })}
                    defaultValue={""}
                    placeholder="Enter your 4 digit OTP"
                    className="form-control-lg form-control"
                    max={4}
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              {/* <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    defaultValue="123456"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup> */}
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Verify OTP"}
                </Button>
              </FormGroup>
            </Form>
            {/* <div className="form-note-s2 text-center pt-4">
              {" "}
              New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>
            </div> */}
            {/* <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div> */}
            {/* <ul className="nav justify-center gx-4">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul> */}
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;

import React, { useState } from "react";
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
import { Form, FormGroup, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { useHistory } from "react-router-dom";
import TextCaptcha from "../../components/TextCaptcha";

const GuestLogin = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
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
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL_LOCAL}/guestlogin`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          notification["success"]({
            placement: "top",
            message: "Login Successfully.",
            style: {
              height: 60,
            },
          });
          localStorage.setItem("guestlogin", JSON.stringify(data));
          localStorage.setItem("token", data.token);
          history.push("/guestTeamSpace");
        } else if (data.success === "false") {
          notification.error({
            placement: "bottomRight",
            description: "",
            message: "Your account has been disabled",
          });
          notification["warning"]({
            placement: "top",
            message: "Your account has been disabled",
            style: {
              height: 60,
            },
          });
        } else {
          notification.error({
            placement: "bottomRight",
            description: "",
            message: "Invalid Credential",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //captcha
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
                      style={{ width: "40%", marginBottom: "2px" }}
                      src="/Image/acmeLogo.jpeg"
                      alt="logo-dark"
                    ></img>
                  </Link>
                </div>
                <BlockTitle tag="h5" className="text-center">
                  Guest Sign In - ACME DocHub
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
export default GuestLogin;

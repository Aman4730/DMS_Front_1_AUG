import React, { useState, useContext } from "react";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
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

const Logout = () => {
  const [errorVal, setError] = useState("");

  const { errors, register, handleSubmit } = useForm();
  return (
    <React.Fragment>
      <Head title="Logout" />
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
                  ACME DocHub
                </BlockTitle>
                <BlockDes></BlockDes>
              </BlockContent>
              <BlockContent>
                <BlockTitle tag="h5" className="text-center">
                  Successfully Logged Out
                  <br />
                  You can now close the browser.
                </BlockTitle>
              </BlockContent>
            </BlockHead>
            <FormGroup>
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <Button
                  size="lg"
                  className="btn-block"
                  type="submit"
                  color="primary"
                >
                  Login
                </Button>
              </Link>
            </FormGroup>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  <Icon name="alert-circle" /> {errorVal}
                </Alert>
              </div>
            )}
          </PreviewCard>
        </Block>
      </PageContainer>
    </React.Fragment>
  );
};
export default Logout;

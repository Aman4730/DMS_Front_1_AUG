import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";

import Layout from "./layout/Index";

import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";

import Faq from "./pages/others/Faq";
import Terms from "./pages/others/Terms";

import Login from "./pages/auth/Login";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Success from "./pages/auth/Success";
import InvoicePrint from "./pages/pre-built/invoice/InvoicePrint";
import { AuthContextProvider } from "../src/context/AuthContext";
import { UserContextProvider } from "../src/context/UserContext";
import { CustomerContextProvider } from "../src/context/CustomerContext";
import { FileUploaderContextProvider } from "../src/context/FileUploaderContext";
// import { CustomerEkycContextProvider } from "../src/context/CustomerEkycContext";
import Customer from "./pages/ACME/CustomerEkycUpdate";
import ThankyouPage from "./pages/ACME/ThankyouPage";
import GuestLogin from "./pages/auth/GuestLogin";
import { createTheme } from "@mui/material/styles";
import { decryptData, encryptData } from "./components/hash/Hash";
import Logout from "./pages/ACME/Logout";
import "./style.css";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    // <ThemeProvider theme={darkTheme}>
    <Switch>
      {/* Auth Pages */}
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/auth-success`}
        component={Success}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/auth-reset`}
        component={ForgotPassword}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/auth-register`}
        component={Register}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/ekyc-update-success`}
        component={ThankyouPage}
      ></Route>

      <Route
        exact
        path={`${process.env.PUBLIC_URL}/auth-login`}
        render={(props) => (
          <AuthContextProvider>
            <Login />
          </AuthContextProvider>
        )}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/logout`}
        render={(props) => (
          <AuthContextProvider>
            <Logout />
          </AuthContextProvider>
        )}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/guestlogin`}
        render={(props) => (
          <AuthContextProvider>
            <GuestLogin />
          </AuthContextProvider>
        )}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/auth-verify-otp`}
        render={(props) => (
          <AuthContextProvider>
            <VerifyOTP />
          </AuthContextProvider>
        )}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/auth-verify-otp`}
        render={(props) => (
          <AuthContextProvider>
            <VerifyOTP />
          </AuthContextProvider>
        )}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/update-customer-ekyc/:token`}
        render={(props) => (
          <CustomerContextProvider>
            {/* <CustomerEkycContextProvider> */}
            <FileUploaderContextProvider>
              <Customer {...props} />
            </FileUploaderContextProvider>
            {/* </CustomerEkycContextProvider> */}
          </CustomerContextProvider>
        )}
      ></Route>

      {/* Print Pages */}
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/invoice-print/:id`}
        component={InvoicePrint}
      ></Route>

      {/* Helper pages */}
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/auths/terms`}
        component={Terms}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/auths/faq`}
        component={Faq}
      ></Route>

      <Route
        exact
        path={`${process.env.PUBLIC_URL}/invoice-print`}
        component={InvoicePrint}
      ></Route>

      {/*Error Pages*/}
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/errors/404-classic`}
        component={Error404Classic}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/errors/504-modern`}
        component={Error504Modern}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/errors/404-modern`}
        component={Error404Modern}
      ></Route>
      <Route
        exact
        path={`${process.env.PUBLIC_URL}/errors/504-classic`}
        component={Error504Classic}
      ></Route>

      {/*Main Routes*/}
      <AuthContextProvider>
        <UserContextProvider>
          <CustomerContextProvider>
            {/* <CustomerEkycContextProvider> */}
            <FileUploaderContextProvider>
              <PrivateRoute exact path="" component={Layout}></PrivateRoute>
            </FileUploaderContextProvider>
            {/* </CustomerEkycContextProvider> */}
          </CustomerContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
      <Route component={RedirectAs404}></Route>
    </Switch>
    // </ThemeProvider>
  );
};
export default withRouter(App);

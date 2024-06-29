import React, { useContext } from "react";
import Logo from "../logo/Logo";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import { Stack } from "@mui/material";
import User from "./dropdown/user/User";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Notification from "./dropdown/Notification/Notification";
import { BlockHeadContent, BlockTitle } from "../../components/Component";

const Header = ({ fixed, theme, className, setVisibility, ...props }) => {
  const { userAuthContextData } = useContext(AuthContext);
  const [userData] = userAuthContextData;
  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });
  return (
    <div className={headerClass} style={{ right: "-20px", marginTop: "-4px" }}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ml-n1"
              icon="menu"
              click={props.sidebarToggle}
            />
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <Stack
                style={{
                  fontSize: "24.5px",
                  marginLeft: "170px",
                }}
              >
                <BlockHeadContent>
                  <BlockTitle>DocHub</BlockTitle>
                </BlockHeadContent>
              </Stack>
            </ul>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li
                className="notification-dropdown mr-n1"
                onClick={() => setVisibility(false)}
              >
                {userData.type === "guest" ? "" : <Notification />}
              </li>
              <li
                className="user-dropdown"
                onClick={() => setVisibility(false)}
              >
                <User />
              </li>
            </ul>
          </div>
          <div>
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img
                style={{
                  width: "100px",
                  height: "60px",
                }}
                src="/Image/acmeLogo.jpeg"
                alt="logo-dark"
              ></img>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;

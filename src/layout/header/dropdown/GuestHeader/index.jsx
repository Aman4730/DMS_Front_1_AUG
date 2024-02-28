import React, { useState, useContext } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { AuthContext } from "../../../../context/AuthContext";
import { findUpper } from "../../../../utils/Utils";
import { UserContext } from "../../../../context/UserContext";

const GuestHeader = () => {
  const { isLogin, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const { userAuthContextData, logOut } = useContext(AuthContext);
  const [userData] = userAuthContextData;
  const { userOTPVerified, userEmail, userName, userMobileNumber, userRole } =
    userData;

  const handleSignout = () => {
    logOut();
  };
  const OnLogOut = () => {
    handleSignout();
    let data = {
      email: isLogin?.email,
    };
    logout(
      data,
      (apiRes) => {},
      (apiErr) => {}
    );
  };
  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">{isLogin.user_type || "Guest"}</div>
            <div className="user-name dropdown-indicator">
              {isLogin.name || "Guest"}
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>{userName ? findUpper(userName) : ""}</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{isLogin.name || "Guest"}</span>
              <span className="sub-text">{isLogin.user_type || "_____"} !</span>
              {/* <span className="sub-text">9101234567</span> */}
            </div>
          </div>
        </div>
        {/* <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem>
          </LinkList>
        </div> */}
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={OnLogOut}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default GuestHeader;

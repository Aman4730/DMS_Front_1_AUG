import React, { useState, useContext } from "react";
import { Icon } from "../../../../components/Component";
import { AuthContext } from "../../../../context/AuthContext";
import { UserContext } from "../../../../context/UserContext";
import { LinkList } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";

const User = () => {
  const { isLogin, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const { userAuthContextData, logOut, GuestLogOUt } = useContext(AuthContext);
  const [userData] = userAuthContextData;

  const OnLogOut = () => {
    if (userData.type == "guest") {
      GuestLogOUt();
    } else {
      logOut();
    }
    let data = {
      email: isLogin?.email,
    };
    logout(
      data,
      (apiRes) => {},
      (apiErr) => {}
    );
    window.location = "/";
  };
  const name = isLogin?.name;
  const frameName = name?.substring(0, 2)?.toUpperCase();
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
              {isLogin.name || userData.email}
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>{frameName || ""}</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{isLogin.name || "Guest"}</span>
              <span className="sub-text">
                {isLogin.user_type || userData.email} !
              </span>
            </div>
          </div>
        </div>
        {userData.type == "guest" ? (
          <div className="dropdown-inner">
            <LinkList>
              <a
                href={`${process.env.PUBLIC_URL}/guestlogin`}
                onClick={OnLogOut}
              >
                <Icon name="signout"></Icon>
                <span>Sign Out</span>
              </a>
            </LinkList>
          </div>
        ) : (
          <div className="dropdown-inner">
            <LinkList>
              <a href={`${process.env.PUBLIC_URL}/logout`} onClick={OnLogOut}>
                <Icon name="signout"></Icon>
                <span>Sign Out</span>
              </a>
            </LinkList>
          </div>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;

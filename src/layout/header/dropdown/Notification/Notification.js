import React, { useContext, useEffect, useState } from "react";
import data from "./NotificationData";
import Icon from "../../../../components/icon/Icon";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import { AuthContext } from "../../../../context/AuthContext";
import "./notification.css";
import Loading from "../../../../components/Loading";
const NotificationItem = (props) => {
  const { icon, iconStyle, text, time, id, index } = props;
  return (
    <div className="nk-notification-item" key={id} id={id}>
      <div className="nk-notification-icon">
        <span className="notification-number">{index + 1}</span>
        <Icon
          name={icon}
          className={[`icon-circle ${iconStyle ? " " + iconStyle : ""}`]}
        />
      </div>
      <div className="nk-notification-content">
        <div
          className="nk-notification-text"
          style={{
            fontSize: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "220px",
          }}
        >
          <abbr
            title={text}
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            {text}
          </abbr>
        </div>
        <div className="nk-notification-time">{time}</div>
      </div>
    </div>
  );
};

const Notification = () => {
  const { userAuthContextData } = useContext(AuthContext);
  const [userData] = userAuthContextData;
  //Notification
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(false);
  let token = localStorage.getItem("token") || "";

  useEffect(() => {
    setLoader(true);
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL_LOCAL}/getnotification?email=${userData.email}`
    );

    eventSource.onmessage = function (event) {
      const eventData = JSON.parse(event.data);
      setEvents((prevEvents) => [...prevEvents, eventData]);
      setLoader(false);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <UncontrolledDropdown className="user-dropdown">
      <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
        <div
          className="icon-status icon-status-info"
          style={{
            borderRadius: "2rem",
            background: "#798BFF",
            color: "white",
            padding: "8px",
          }}
        >
          <Icon name="bell" style={{ fontSize: "17px" }} />
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl dropdown-menu-s1">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">{data.title}</span>
          <a href="#markasread" onClick={(ev) => ev.preventDefault()}>
            Mark All as Read
          </a>
        </div>
        <div className="dropdown-body">
          {events?.length > 0 > 0 && !loader ? (
            <div className="nk-notification">
              {events
                .slice()
                .reverse()
                .map((item, index) => {
                  return (
                    <NotificationItem
                      key={index}
                      id={item.id}
                      icon={item.icon}
                      iconStyle={item.iconStyle}
                      text={item.message}
                      time={item.time}
                      index={index}
                      isError={item.isError}
                    />
                  );
                })}
            </div>
          ) : loader ? (
            <Loading />
          ) : (
            <div className="text-center no-data h-100 mb-0 serachBar">
              <div className="loading-wave serachBar">
                <p
                  className="text-center serachBar"
                  style={{ textAlign: "center" }}
                >
                  No data Available
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="dropdown-foot center">
          <a
            href="#viewall"
            onClick={(ev) => ev.preventDefault()}
            tabIndex="-1"
          >
            View All
          </a>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;

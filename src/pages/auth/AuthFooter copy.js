import React from "react";
import EnglishFlag from "../../images/flags/english.png";
import SpanishFlag from "../../images/flags/spanish.png";
import FrenchFlag from "../../images/flags/french.png";
import TurkeyFlag from "../../images/flags/turkey.png";
import { Row, Col } from "../../components/Component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";

const AuthFooter = () => {
  return (
    <div
      className="footer"
      style={{
        padding: "2px 5px 15px 5px",
        marginTop:"45px",
      }}
    >
      <div className="container wide-lg">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color:"white",
            fontSize:"12px"
          }}
        >
            <p >&copy; 2024 ACME. All Rights Reserved.</p>
        </div>
        <Row className="g-3">
          {/* <Col lg={6} className="order-lg-last">
            <ul className="nav nav-sm justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to={`${process.env.PUBLIC_URL}/auths/terms`}
                >
                  Terms &amp; Condition
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to={`${process.env.PUBLIC_URL}/auths/terms`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to={`${process.env.PUBLIC_URL}/auths/faq`}
                >
                  Help
                </Link>
              </li>
              <li className="nav-item ">
                <UncontrolledDropdown direction="up">
                  <DropdownToggle
                    color="transparent"
                    className="dropdown-toggle dropdown-indicator has-indicator nav-link"
                  >
                    <span>English</span>
                  </DropdownToggle>
                  <DropdownMenu right className="dropdown-menu-sm">
                    <ul className="language-list">
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="language-item"
                        >
                          <img
                            src={EnglishFlag}
                            alt=""
                            className="language-flag"
                          />
                          <span className="language-name">English</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="language-item"
                        >
                          <img
                            src={SpanishFlag}
                            alt=""
                            className="language-flag"
                          />
                          <span className="language-name">Español</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="language-item"
                        >
                          <img
                            src={FrenchFlag}
                            alt=""
                            className="language-flag"
                          />
                          <span className="language-name">Français</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="language-item"
                        >
                          <img
                            src={TurkeyFlag}
                            alt=""
                            className="language-flag"
                          />
                          <span className="language-name">Türkçe</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </Col> */}
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
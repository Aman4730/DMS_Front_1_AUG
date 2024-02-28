import React from "react";
import LogoLight2x from "../../assets/images/logo_light.png";
import LogoDark2x from "../../assets/images/logo_dark.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
      {/* <img className="logo-light logo-img" src={LogoLight2x} alt="logo" />
      <img className="logo-dark logo-img" src={LogoLight2x} alt="logo" /> */}
    </Link>
  );
};

export default Logo;

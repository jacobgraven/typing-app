import React from "react";
import "./Header.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <div className="header-component">
      <img src={logo} alt="Kittkey Logo" />
    </div>
  );
};

export default Header;

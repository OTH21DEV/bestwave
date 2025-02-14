import React from "react";
import logo from "../../assets/logo/logo_small.png";
import "./logo.css";

const Logo: React.FC = () => {
  return (
    <div className="home__logo">
      <img className="home__logo-img" src={logo} alt="" />
    </div>
  );
};

export default Logo;

import React from "react";
import logo from "../../assets/logo/logo_small.png";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <img src={logo} alt="" className="footer__img" />
      <p className="footer__content">BEST WAVE 2025. ALL RIGHTS RESERVED</p>
    </div>
  );
};

export default Footer;

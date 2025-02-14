import React from "react";
import "./arow.css";
import arrow from "../../assets/arrow.png";

const Arrow: React.FC = () => {
  return (
    <div className="home__arrow-down">
      <img src={arrow} alt="" />
    </div>
  );
};

export default Arrow;

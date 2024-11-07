import React from "react";
import "./nav.css";
import wave from "../../assets/wave.png";
// import van from "../../assets/van.png";
// import sleep from "../../assets/sleep.png";
// import surf from "../../assets/surf.png";
import logo from "../../assets/logo.png";
import news from"../../assets/news.png"
import DateNow from "../Date/Date";

const Nav = () => {





  return (
    <aside className="home__sidebar">
      {/* <h2 className="home__sidebar-title">
        best <span>wave</span>
      </h2> */}
      <div>
        <img src={logo} alt="" />
      </div>
      <ul className="home__sidebar-list">
        <li className="home__sidebar-item home__sidebar-item--forecast">
          <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
          Forecast
        </li>
        <li className="home__sidebar-item home__sidebar-item--news">
          <img src={news} alt="News Icon" className="home__sidebar-icon" />
          News
        </li>
        <DateNow/>
        {/* <li className="home__sidebar-item">
          <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
          Surf
        </li>
        <li className="home__sidebar-item">
          <img src={van} alt="Surf Icon" className="home__sidebar-icon" />
          Travel
        </li>
        <li className="home__sidebar-item">
          {" "}
          <img src={sleep} alt="Surf Icon" className="home__sidebar-icon" />
          Sleep
        </li>
        <li className="home__sidebar-item">
          {" "}
          <img src={surf} alt="Surf Icon" className="home__sidebar-icon" />
          Shop
        </li> */}
      </ul>
    </aside>
  );
};

export default Nav;

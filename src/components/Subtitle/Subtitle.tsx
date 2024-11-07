import React from "react";
import "./subtitle.css";
import Spots from "../Spots/Spots";

const Subtitle = () => {
  return (
  <>
    <section className="home__subtitle">
    <div className="home__subtitle-item">
      <p className="home__subtitle-title home__subtitle-title--surf">Surfing in Portugal</p>
      <span className="home__subtitle-location">SILVER COAST</span>
    </div>
    <div className="home__subtitle-item">
      <p className="home__subtitle-title home__subtitle-title--condition">Find best place</p>
      <span className="home__subtitle-status">SURF SPOTS</span>
    </div>
  </section>
    {/* <Spots/> */}
  </>
  );
};

export default Subtitle;

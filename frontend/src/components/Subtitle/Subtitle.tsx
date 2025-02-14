import React from "react";
import "./subtitle.css";
import { Matches } from "../../types";

type SubtitleProps = {
  matches: Matches;
};

const Subtitle: React.FC<SubtitleProps> = ({ matches }) => {
  function renderSubtitleLocation(): JSX.Element {
    return matches ? (
      <span className="home__subtitle-location">
        <span>SILVER</span>
        <span>COAST</span>
      </span>
    ) : (
      <span className="home__subtitle-location">SILVER COAST</span>
    );
  }
  function renderSubtitleStatus(): JSX.Element {
    return matches ? (
      <span className="home__subtitle-status">
        <span>SURF</span>
        <span>SPOTS</span>
      </span>
    ) : (
      <span className="home__subtitle-status">SURF SPOTS</span>
    );
  }
  return (
    <>
      <section className="home__subtitle">
        <div className="home__subtitle-item">
          <p className="home__subtitle-title home__subtitle-title--surf">Surfing in </p>

          {renderSubtitleLocation()}
        </div>
        <div className="home__subtitle-item">
          <p className="home__subtitle-title home__subtitle-title--condition">Find best </p>

          {renderSubtitleStatus()}
        </div>
      </section>
    </>
  );
};

export default Subtitle;

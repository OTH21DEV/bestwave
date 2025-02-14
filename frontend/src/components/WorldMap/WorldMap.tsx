import React, { useImperativeHandle, useRef, ForwardedRef } from "react";
import "./worldMap.css";
import map from "../../assets/map.png";
import wave_height from "../../assets/wave_height.png";
import wind from "../../assets/wind.png";
import water_temp from "../../assets/water_temp.svg";
import swell from "../../assets/swell.png";
import placeholder from "../../assets/placeholder.png";
import { ActiveSpotIndex, Titles, Matches } from "../../types";

type WorldMapProp = {
  isDotVisible: boolean;
  isSpotDetailsVisible: boolean;
  activeSpotIndex: ActiveSpotIndex;
  titles: Titles;
  matches: Matches;
};

const WorldMap = React.forwardRef<unknown, WorldMapProp>(({ isDotVisible, isSpotDetailsVisible, activeSpotIndex, titles, matches }, ref: ForwardedRef<unknown>) => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const spotDetailsRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    dotRef: dotRef.current,
    spotDetailsRef: spotDetailsRef.current,
  }));
  return (
    // World map with forecast key details

    <div className="forecast__map-container">
      <div className="test">
    
        {!matches && <img className="forecast__map-image" src={map} alt="" />}

        <div className={`forecast__location-dot ${isDotVisible ? "visible" : ""}`} ref={dotRef}></div>

        {/* Spot description */}
        <div className={`forecast__spot-description ${isSpotDetailsVisible ? "visible" : ""}`} ref={spotDetailsRef}>
          <p className="forecast__spot-description__title">{titles[activeSpotIndex]}</p>
          <p className="forecast__spot-description__subtitle">Portugal</p>

          {/* Spot details */}
          <div className="forecast__spot-details">
            {/* Wave details */}
            <div className="forecast__spot-details__wave-info">
              <img className="forecast__spot-details__icon-wave" src={wave_height} alt="Wave height icon" />
              <span className="forecast__spot-details__wave-value">0.88</span>
              <span className="forecast__spot-details__wave-label">wave height</span>
            </div>
            {/* Wind details */}
            <div className="forecast__spot-details__wind-info">
              <img className="forecast__spot-details__icon-wind" src={wind} alt="Wind speed icon" />
              <span className="forecast__spot-details__wind-value">6.05</span>
              <span className="forecast__spot-details__wind-label">wind speed</span>
            </div>
            {/* Swell details */}
            <div className="forecast__spot-details__swell-info">
              <img className="forecast__spot-details__icon-swell" src={swell} alt="Wind speed icon" />
              <span className="forecast__spot-details__swell-value">12.92</span>
              <span className="forecast__spot-details__swell-label">Swell period</span>
            </div>
            {/* Water details */}
            <div className="forecast__spot-details__water-info">
              <img className="forecast__spot-details__icon-water" src={water_temp} alt="Wind speed icon" />
              <span className="forecast__spot-details__water-value">17.74</span>
              <span className="forecast__spot-details__water-label">water temperature</span>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder icon  */}
      <div className="forecast__image-container">
        <img className="forecast__image" src={placeholder} alt="" />
      </div>
    </div>
  );
});

export default WorldMap;

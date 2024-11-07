import React, { useState, useEffect, useRef } from "react";
import "./forecast.css";
import placeholder from "../../assets/placeholder.png";
import map from "../../assets/map.png";
import baleal_sul from "../../assets/baleal_sul_2.jpg";
import Spots from "../../components/Spots/Spots";
import wave_height from "../../assets/wave_height.png";
import wind from "../../assets/wind.png";
import water_temp from "../../assets/water_temp.svg";
import swell from "../../assets/swell.png";
import arrow from "../../assets/nav_arrow.png";
import DataTable from "../../components/DataTable/DataTable";
const Forecast = () => {
  //states for visibility animation
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isSpotVisible, setIsSpotVisible] = useState(false);
  const [isDotVisible, setIsDotVisible] = useState(false);
  const [isCurrentLocationVisible, setIsCurrentLocationVisible] = useState(false);
  const [isSpotsVisible, setIsSpotsVisible] = useState(false);
  const [isSpotDetailsVisible, setIsSpotDetailsVisible] = useState(false);
  //state to track active spot from gallery
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);

  const [activeSection, setActiveSection] = useState(null);

  const forecastTitleRef = useRef(null);
  const forecastSpotRef = useRef(null);
  const currentLocationTitleRef = useRef(null);
  const dotRef = useRef(null);
  const spotsRef = useRef(null);
  const spotDetailsRef = useRef(null);

  const iframeRef = useRef(null);

  const handleScroll = () => {
    // if (forecastTitleRef.current && forecastSpotRef.current) {
    //   const scrollY = window.scrollY + window.innerHeight / 1.5;
    //   const titleRect = forecastTitleRef.current.getBoundingClientRect();
    //   if (scrollY >= titleRect.top + window.scrollY) {
    //     console.log('true')
    //     setIsTitleVisible(true);
    //     setIsSpotVisible(true);
    //     setIsCurrentLocationVisible(true);

    //     // setIsDotVisible(true)
    //   }
    // }

    if (forecastTitleRef.current) {
      const scrollY = window.scrollY + window.innerHeight / 1.5;
      const titleRect = forecastTitleRef.current.getBoundingClientRect();
      if (scrollY >= titleRect.top + window.scrollY) {
        setIsTitleVisible(true);
        // setIsSpotVisible(true);
        setIsCurrentLocationVisible(true);

        // setIsDotVisible(true)
      }
    }
    //sets the spots gallery nav
    if (forecastSpotRef.current) {
      const scrollY = window.scrollY + window.innerHeight;
      const forecastSpotRect = forecastSpotRef.current.getBoundingClientRect();
      if (scrollY >= forecastSpotRect.top + window.scrollY) {
        console.log("true");
        // setIsTitleVisible(true);

        setIsSpotVisible(true);
        // setIsCurrentLocationVisible(true);

        // setIsDotVisible(true)
      }
    }
    if (dotRef.current) {
      const dotRect = dotRef.current.getBoundingClientRect();
      const scrollY = window.scrollY + window.innerHeight;
      if (scrollY >= dotRect.top + window.scrollY) {
        setIsDotVisible(true);
      }
    }

    if (spotsRef.current) {
      const spotsRect = spotsRef.current.getBoundingClientRect();
      const scrollY = window.scrollY + window.innerHeight;
      if (scrollY >= spotsRect.top + window.scrollY) {
        setIsSpotsVisible(true);
      }
    }
    if (spotDetailsRef.current) {
      const spotDetailsRect = spotDetailsRef.current.getBoundingClientRect();
      const scrollY = window.scrollY + window.innerHeight/1.5;
      if (scrollY >= spotDetailsRect.top + window.scrollY) {
        setIsSpotDetailsVisible(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Toggle dropdown fo rspot details -tips/forecast

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <section className="forecast">
      {/* Spots gallery nav */}
      {/* <Spots className={isSpotsVisible ? "visible" : ""} ref={spotsRef} setActiveSpotIndex={setActiveSpotIndex} /> */}

      {/* MAin title - forecast */}
      <div className="forecast__container">
        <h1 className={`forecast__title ${isTitleVisible ? "visible" : ""}`} ref={forecastTitleRef}>
          Forecast
        </h1>
        <h2 className="forecast__subtitle">Surf</h2>
      </div>

      {/* Title - spot current location  */}

      <div className={`forecast__current-location ${isCurrentLocationVisible ? "visible" : ""}`} ref={currentLocationTitleRef}>
        <p className="forecast__current-location__title">current location</p>
        <div className="forecast__current-location__details">
          <p className="forecast__current-location__city">Peniche</p>
          <span className="forecast__current-location__separator">|</span>
          <p className="forecast__current-location__country">Portugal</p>
        </div>
      </div>

      {/* World map with forecast key details*/}

      <div className="forecast__map-container">
        <div className="test">
          <img className="forecast__map-image" src={map} alt="" />

          <div className={`forecast__location-dot ${isDotVisible ? "visible" : ""}`} ref={dotRef}></div>

          {/* Spot description */}
          <div className={`forecast__spot-description ${isSpotDetailsVisible ? "visible" : ""}`} ref={spotDetailsRef}>
            <p className="forecast__spot-description__title">Baleal Sul</p>
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

            {/* Spot details end*/}
          </div>
        </div>

        {/* Placeholder icon  */}
        <div className="forecast__image-container">
          <img className="forecast__image" src={placeholder} alt="" />
        </div>
      </div>

      {/*Spot image with content */}
      <div className={`forecast__spot-container ${isSpotVisible ? "visible" : ""}`} ref={forecastSpotRef}>
        <h3>
          Baleal <br />
          sul
        </h3>
        <div className="forecast__spot-location">
          <p className="forecast__spot-city">Peniche</p>
          <span className="forecast__spot-separator">|</span>
          <p className="forecast__spot-country">Portugal</p>
        </div>
        <img className="forecast__spot-image" src={baleal_sul} alt="" />

        {/*Spot tips content */}
        <div className="forecast__spot-tips">
          <div className="forecast__spot-tips__header" onClick={() => toggleSection("tips")}>
            <h4 className="forecast__spot-tips__title">Tips</h4>

            <img src={arrow} alt="" className="forecast__spot-tips__icon" />
          </div>

          {activeSection === "tips" && (
            <p className="forecast__spot-tips__content">
              The best time of year for surfing Baleal Sul with consistent clean waves (rideable swell with light / offshore winds) is during Winter and most often the month of December. <br />
              Clean surfable waves are typically found 41% of the time in December while 47% of the time it tends to be blown out. For the remaining 12% of the time it is considered too small by most
              surfers but may still be OK for beginners and groms at times.
            </p>
          )}
        </div>

        {/*Spot detailed forecast */}
        <div className="forecast__spot-forecast">
          <div className="forecast__spot-forecast__header" onClick={() => toggleSection("forecast")}>
            <h4 className="forecast__spot-forecast__title">Detailed forecast</h4>
            <img src={arrow} alt="" className="forecast__spot-forecast__icon" />
          </div>

          {activeSection === "forecast" && <DataTable />}
        </div>
      </div>

      <Spots className={isSpotsVisible ? "visible" : ""} ref={spotsRef} setActiveSpotIndex={setActiveSpotIndex} />
    </section>
  );
};

export default Forecast;

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./forecast.css";

import Spots from "../../components/Spots/Spots";

import Spot from "../../components/Spot/spot";
import WorldMap from "../../components/WorldMap/WorldMap";
import ForecastTitle from "../../components/ForecastTitle/ForecastTitle";
import CurrentLocationTitle from "../../components/CurrentLocationTitle/CurrentLocationTitle";
import { getLocationForecast } from "../../services/forecast-services.js";
import { Matches, ToggleSectionFunction } from "../../types/index.js";

type ForecastProps = {
  matches: Matches;
};
const Forecast: React.FC<ForecastProps> = ({ matches }) => {
  //states for visibility animation
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isSpotVisible, setIsSpotVisible] = useState(false);
  const [isDotVisible, setIsDotVisible] = useState(false);
  const [isCurrentLocationVisible, setIsCurrentLocationVisible] = useState(false);
  const [isSpotsVisible, setIsSpotsVisible] = useState(false);
  const [isSpotDetailsVisible, setIsSpotDetailsVisible] = useState(false);
  //state to track active spot from gallery
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const forecastTitleRef = useRef<HTMLDivElement | null>(null);
  const forecastSpotRef = useRef<HTMLDivElement | null>(null);
  const currentLocationTitleRef = useRef<HTMLDivElement | null>(null);
  const mapRefs = useRef<{ dotRef?: HTMLDivElement; spotDetailsRef?: HTMLDivElement }>({});
  const spotsRef = useRef<HTMLDivElement | null>(null);

  const titles = ["Praia do Baleal", "Baleal Sul", "Almagreira", "Baleal Reef", "Belgas", "Ferrel", "Foz do Arelho", "Praia Azul", "Supertubos", "Santa Cruz"];

  const [locationForecast, setLocationForecast] = useState([]);

  const [showPopupIndex, setShowPopupIndex] = useState<number | null>(null);
  const [isForecastBtnClicked, setIsForecastBtnClicked] = useState(false);

  //Set the right id (in database the ids start from 1)

  const locationId = String(activeSpotIndex + 1);



  const getLocationData = useCallback(async () => {
    if (activeSpotIndex !== null) {
      // const locationId = String(activeSpotIndex + 1);
      console.log(locationId);
      try {
        updateUrlWithId(locationId); // Update URL
        const result = await getLocationForecast(locationId);

        setLocationForecast(result.data);
      } catch (error) {
        console.error("Error fetching location data:", error.message);
      }
    }
  }, [activeSpotIndex, locationId]);

  // Trigger data fetch every time `activeSpotIndex` changes
  useEffect(() => {
    console.log(`Running effect for activeSpotIndex: ${activeSpotIndex}`);
    getLocationData();
  }, [getLocationData, activeSpotIndex]);

  // Function to update the URL with the location ID

  const updateUrlWithId = (id: string): void => {
    try {
      const url = new URL(window.location.href);

      // Reset the pathname
      url.pathname = "/";
      url.searchParams.set("id", id);

      //  replaceState to avoid adding a new entry in the browser's history stack
      window.history.replaceState({ path: url.toString() }, "", url.toString());
    } catch (error) {
      console.error("Failed to update URL:", error);
    }
  };

  const handleScroll = () => {
    if (forecastTitleRef.current) {
      const scrollY = window.scrollY + window.innerHeight / 1.5;
      const titleRect = forecastTitleRef.current.getBoundingClientRect();
      if (scrollY >= titleRect.top + window.scrollY) {
        setIsTitleVisible(true);

        setIsCurrentLocationVisible(true);
      }
    }
    //sets the spots gallery nav
    if (forecastSpotRef.current) {
      const scrollY = window.scrollY + window.innerHeight;
      const forecastSpotRect = forecastSpotRef.current.getBoundingClientRect();
      if (scrollY >= forecastSpotRect.top + window.scrollY) {
        setIsSpotVisible(true);
      }
    }

    if (mapRefs.current.dotRef) {
      const dotRect = mapRefs.current.dotRef.getBoundingClientRect();

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

    if (mapRefs.current.spotDetailsRef) {
      const spotDetailsRect = mapRefs.current.spotDetailsRef.getBoundingClientRect();
      const scrollY = window.scrollY + window.innerHeight / 1.5;
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

  // const toggleSection = (section) => {
  //   setActiveSection(activeSection === section ? null : section);
  // };
  const toggleSection: ToggleSectionFunction = (section, index, event) => {
    event.preventDefault();
   
    if (section === "tips") {
      setShowPopupIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the popup visibility
      setActiveSection("tips");
    } else {
      setActiveSection((prevSection) => (prevSection === section ? null : section));
      setShowPopupIndex(null); // Close tips popup when switching sections
    }
  };

  return (
    <section className="forecast">
      {/* MAin title - forecast */}
      <ForecastTitle isTitleVisible={isTitleVisible} ref={forecastTitleRef} />

      {/* Title - spot current location  */}
      <CurrentLocationTitle isCurrentLocationVisible={isCurrentLocationVisible} ref={currentLocationTitleRef} />

      {/* World map with forecast key details*/}

      <WorldMap ref={mapRefs} isDotVisible={isDotVisible} isSpotDetailsVisible={isSpotDetailsVisible} activeSpotIndex={activeSpotIndex} titles={titles} matches={matches} />

      {/*Spot image with content */}
      <Spot
        activeSpotIndex={activeSpotIndex}
        isSpotVisible={isSpotVisible}
        ref={forecastSpotRef}
        toggleSection={toggleSection}
        activeSection={activeSection}
        titles={titles}
        locationForecast={locationForecast}
        // matches={matches}
        showPopupIndex={showPopupIndex}
        setShowPopupIndex={setShowPopupIndex}
        setIsForecastBtnClicked={setIsForecastBtnClicked}
      ></Spot>

      {/* <WorldMap ref={mapRefs} isDotVisible={isDotVisible} isSpotDetailsVisible={isSpotDetailsVisible} activeSpotIndex={activeSpotIndex} titles={titles} /> */}
      {/*Spots navigation */}
      <Spots className={isSpotsVisible ? "visible" : ""} ref={spotsRef} setActiveSpotIndex={setActiveSpotIndex} activeSection={activeSection} isForecastBtnClicked={isForecastBtnClicked} />
    </section>
  );
};

export default React.memo(Forecast);

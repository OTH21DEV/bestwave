import React, { ForwardedRef } from "react";
import "./spot.css";
import DataTable from "../DataTable/DataTable";
import baleal from "../../assets/spots/baleal.jpg";
import balealsul from "../../assets/spots/balealsul.webp";
import almagreira from "../../assets/spots/almagreira.jpg";
import balealreef from "../../assets/spots/balealreef_lagide.webp";
import belgas from "../../assets/spots/belgas.jpg";
import ferrel from "../../assets/spots/ferreljpg.jpg";
import foz from "../../assets/spots/foz.avif";
import azul from "../../assets/spots/azul_2.jpg";
import supertubos from "../../assets/spots/supertubos.webp";
import santacruz from "../../assets/spots/santacruz.jpg";
import arrow from "../../assets/nav_arrow.png";
// import arrow from "../../assets/arrows-right.svg";
import { ToggleSectionFunction, ActiveSection, ActiveSpotIndex, Titles, LocationForecast, SetIsForecastBtnClicked } from "../../types";

type SpotProps = {
  isSpotVisible: boolean;
  toggleSection: ToggleSectionFunction;
  activeSection: ActiveSection;
  activeSpotIndex: ActiveSpotIndex;
  titles: Titles;
  locationForecast: LocationForecast;
  showPopupIndex: number | null;
  setShowPopupIndex: React.Dispatch<React.SetStateAction<number|null>>;
  setIsForecastBtnClicked: SetIsForecastBtnClicked;
};

const Spot = React.forwardRef<HTMLDivElement, SpotProps>(
  ({ isSpotVisible, toggleSection, activeSection, activeSpotIndex, titles, locationForecast, showPopupIndex, setShowPopupIndex, setIsForecastBtnClicked }, ref: ForwardedRef<HTMLDivElement>) => {
    const images = [baleal, balealsul, almagreira, balealreef, belgas, ferrel, foz, azul, supertubos, santacruz];

    const tips = [
      "Praia do Baleal offers reliable surf year-round, excelling with southeast offshore winds and receiving mixed groundswells and windswells. It features both left and right-hand waves and is seldom crowded. The best surfing conditions with clean, rideable waves occur in winter, particularly in December. During this month, 21% of the time sees clean surf, while 44% of the time it's blown out. The remaining 35% might be too small for experienced surfers but can be suitable for beginners. Watch out for potential hazards.",
      "Baleal Sul is a sheltered beach break featuring unreliable waves with no fixed seasonal pattern. South-southeast winds are ideal, and the best swell comes from the west. It offers both left and right-hand waves, unaffected by tides, but can get crowded. Watch for dangerous rips. The best surf conditions occur in winter, especially December, with clean waves 41% of the time and blown out 47% of the time. Though too small for most surfers 12% of the time, beginners might still find it suitable.",
      "Almagreira is an exposed beach break with consistent surf all year round. The best winds come from the south, and both local and distant swells can create ideal conditions from the south swell angle. It can get crowded when the surf is good. Winter, particularly December, offers the best clean waves, available 3% of the time. While 97% of December sees small waves, these may still suit beginners.",
      "Baleal Reef is an exposed beach break with consistent surf year-round. It works best with south-southwest offshore winds and a north-northwest swell angle, offering a left-hand reef break. Popular and sometimes crowded, watch out for locals and pollution. The prime surfing season is Winter, especially January, with clean waves 34% of the time. While 54% of January sees blown-out conditions, and the remaining 12% is small but can be suitable for beginners.",
      "Belgas is an exposed beach break with year-round activity, best with southeast winds and a north swell. It's rarely crowded. The ideal surfing period is Autumn, especially October, when clean waves occur 18% of the time. In October, conditions are blown out 43% of the time, while 39% are small but suitable for beginners.",
      "Ferrel offers an exposed beach break with inconsistent surf and no specific seasonal pattern. It's best in southeast offshore winds and north-northwest swells. The beach provides lefts and rights and is surfable at all tides. Rarely crowded, its prime surfing season is Winter, particularly December, when clean waves occur 35% of the time. In December, conditions are blown out 52% of the time, while 13% are small but suitable for beginners.",
      "Foz do Arelho features an exposed beach break that works best with ideal conditions, lacking a specific seasonal pattern. It benefits from southeast offshore winds and west swells, performing optimally around mid-tide. The surf can get crowded when it's good. Winter, especially December, is the best time for consistent clean waves, found 40% of the time. In December, 47% of days are blown out, while 13% offer small waves suitable for beginners.",
      "Praia Azul offers consistent surf year-round, thriving with east offshore winds and west groundswells. It features left and right beach breaks and rarely gets crowded. Winter, particularly December, is optimal for clean waves, available 41% of the time. In December, 54% of the waves are blown out, with 5% being small but suitable for beginners.",
      "Supertubos is a reliable beach and reef break, often crowded and sometimes dangerous. Best with northeast offshore winds, it receives both local windswells and distant groundswells from the southwest. Winter, especially February, is ideal for clean waves, occurring 4% of the time, while 8% are blown out. The remaining 88% is too small for most but may suit beginners.",
      "Santa Cruz is an exposed beach break with consistent surf year-round, favoring east offshore winds. It receives both groundswells and windswells, with the best angle from the west. The beach offers lefts and rights, unaffected by tides, and can get crowded. Winter, particularly December, is best for clean waves, seen 41% of the time, while 54% are blown out. The remaining 5% is too small for most but may suit beginners.",
    ];

    const prevIndex = (activeSpotIndex - 1 + images.length) % images.length;
    //  const nextIndex = (activeSpotIndex + 1)

    const nextIndex = (activeSpotIndex + 1) % images.length;
    //
    const indices = [
      { index: prevIndex, className: "forecast__spot-image--prev" },
      { index: activeSpotIndex, className: "forecast__spot-image--current" },
      { index: nextIndex, className: "forecast__spot-image--next" },
    ];

    return (
      //   Spot image with content

      <div className={`forecast__spot-container`} ref={ref}>
        <div className={`forecast__spot-image-container ${isSpotVisible ? "visible" : ""}`}>
          {indices.map(({ index, className }, i) => (
            <div key={i} className={`forecast__spot-image-wrapper ${className} ${isSpotVisible ? "visible" : ""}`} ref={ref} style={{ transitionDelay: `${i * 0.3}s` }}>
              {images[index] && titles[index] ? (
                <>
                  <img className={`forecast__spot-image`} src={images[index]} alt="" />
                  <h3 className="forecast__spot-title">{titles[index]}</h3>

                  {/*Dont display the vertical title when tips popup open*/}

                  {showPopupIndex !== index && (
                    <div className="forecast__spot-location">
                      <p className="forecast__spot-city">Peniche</p>
                      <span className="forecast__spot-separator">|</span>
                      <p className="forecast__spot-country">Portugal</p>
                    </div>
                  )}

                  {/* Spot tips content  */}
                  <div className="forecast__spot-details">
                    <div className="forecast__spot-tips">
                      <div className="forecast__spot-tips__header" onClick={activeSpotIndex === index ? (e) => toggleSection("tips", index, e) : undefined}>
                        <h4 className="forecast__spot-tips__title">Tips</h4>
                      </div>

                      {showPopupIndex === index && (
                        <div
                          className={`popup ${showPopupIndex === index ? "show" : ""}`}
                          style={{
                            transitionDelay: "0.3s",
                            transform: "translate(-50%, -50%) scale(1)",
                            opacity: showPopupIndex === index ? 1 : 0,
                            visibility: showPopupIndex === index ? "visible" : "hidden",
                            backgroundColor: "#171918",
                          }}
                        >
                          <p className="forecast__spot-tips__content">{tips[index]}</p>
                          <button onClick={() => setShowPopupIndex(null)}>Close</button>
                        </div>
                      )}
                    </div>
                    {/*Spot detailed forecast */}

                    <div className="forecast__spot-forecast">
                      <div
                        className="forecast__spot-forecast__header"
                        onClick={
                          activeSpotIndex === index
                            ? (e) => {
                                toggleSection("forecast", index, e);
                                setIsForecastBtnClicked((prevState) => !prevState);
                              }
                            : undefined
                        }
                      >
                        <h4 className="forecast__spot-forecast__title">Forecast</h4>
                        <img src={arrow} alt="" className="forecast__spot-forecast__icon" />
                      </div>

                      {activeSection === "forecast" && activeSpotIndex === index && (
                        <DataTable locationForecast={locationForecast} toggleSection={toggleSection} index={index} setIsForecastBtnClicked={setIsForecastBtnClicked} />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default Spot;

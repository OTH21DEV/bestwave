import React, { useState, forwardRef, useEffect } from "react";
import "./spots.css";
import arrow_left from "../../assets/nav_arrow.png";

const Spots = forwardRef(({ className, setActiveSpotIndex }, ref) => {
  const listRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollList = (direction) => {
    if (listRef.current) {
      // width of the first li element
      const itemWidth = listRef.current.firstChild.clientWidth;

      const newIndex = direction + activeIndex;

      // Ensure index is within bounds
      if (newIndex >= 0 && newIndex < listRef.current.children.length) {
        setActiveIndex(newIndex);
        listRef.current.scrollTo({ left: newIndex * itemWidth, behavior: "smooth" });
        //notify the parent element about chosen spot from gallery
        setActiveSpotIndex(newIndex);
      }
    }
  };

  return (
    <nav ref={ref} className={`home__gallery-nav ${className} `}>
      <ul className="home__spot-list" ref={listRef}>
        {["Praia do Baleal", "Baleal Sul", "Almagreira", "Baleal Reef", "Belgas", "Ferrel", "Foz do Arelho", "Praia Azul", "Praia do Cerro", "Supertubos", "Santa Cruz", "Almagreira"].map(
          (spot, index) => {
            return (
              <li key={index} className={`home__spot-item ${index === activeIndex ? "active" : ""}`} data-id={index}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {spot}
              </li>
            );
          }
        )}
      </ul>
      <div className="home__button-container">
        <img
          src={arrow_left}
          alt="Previous items"
          className="home__button home__button--prev"
          onClick={() => {
            scrollList(-1);
          }}
          style={{ cursor: "pointer" }}
        />
        <img
          src={arrow_left}
          alt="Next items"
          className="home__button home__button--next"
          onClick={() => {
            scrollList(1);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </nav>
  );
});

export default Spots;

import React, { useState, forwardRef, useEffect, ForwardedRef } from "react";
import "./spots.css";
import arrow_left from "../../assets/nav_arrow.png";
import { ActiveSection } from "../../types";

type SpotsProps = {
  className: string;
  setActiveSpotIndex: React.Dispatch<React.SetStateAction<number>>;
  activeSection: ActiveSection;
  isForecastBtnClicked: boolean;
};

const Spots = forwardRef<HTMLElement, SpotsProps>(({ className, setActiveSpotIndex, activeSection, isForecastBtnClicked }, ref: ForwardedRef<HTMLElement>) => {
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollList = (direction: number) => {
    if (listRef.current) {
      // width of the first li element
      const itemWidth = (listRef.current.firstChild as HTMLElement).clientWidth;
      // const itemWidth = listRef.current.firstChild.clientWidth;
      const newIndex = direction + activeIndex;

      // Ensure index is within bounds
      if (newIndex >= 0 && newIndex < listRef.current.children.length) {
    
        listRef.current.scrollTo({ left: newIndex * itemWidth, behavior: "smooth" });

        updateActiveIndex(newIndex);
      }
    }
  };

  const updateActiveIndex = (index: number) => {
    setActiveIndex(index);
    //notify the parent element about chosen spot from gallery
    setActiveSpotIndex(index);
  };

  const handleClick = (index: number) => {
    // updateActiveIndex(index === activeIndex ? null : index);
    updateActiveIndex(index);
  };

  /**
   * Handle the swipe on mobile view
   * Update the spot index
   */
  const images = ["baleal", "balealsul", "almagreira", "balealreef", "belgas", "ferrel", "foz", "azul", "supertubos", "santacruz"];
  const prevIndex = (activeIndex - 1 + images.length) % images.length;

  const nextIndex = (activeIndex + 1) % images.length;

  useEffect(() => {
    let startX: number;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      //swipeleft
      if (startX - endX > 5) {
        console.log("left");
        setActiveSpotIndex(nextIndex);
        setActiveIndex(nextIndex);
      }
      //swipeRight
      else if (endX - startX > 5) {
        console.log("right");
        setActiveSpotIndex(prevIndex);
        setActiveIndex(prevIndex);
      }
    };
    // const image = document.querySelector(".forecast__spot-image-wrapper.forecast__spot-image--current");
    const image = document.querySelector(".forecast__spot-image--current") as HTMLElement;
    if (image && !isForecastBtnClicked) {
      image.addEventListener("touchstart", handleTouchStart);
      image.addEventListener("touchend", handleTouchEnd);
      return () => {
        image.removeEventListener("touchstart", handleTouchStart);
        image.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [nextIndex, prevIndex, setActiveSpotIndex, activeSection, isForecastBtnClicked]);

  return (
    <>
      {!isForecastBtnClicked && (
        <nav ref={ref} className={`home__gallery-nav ${className} `}>
          <ul className="home__spot-list" ref={listRef}>
            {["Praia do Baleal", "Baleal Sul", "Almagreira", "Baleal Reef", "Belgas", "Ferrel", "Foz do Arelho", "Praia Azul", "Supertubos", "Santa Cruz"].map((spot, index) => {
              return (
                <li key={index} className={`home__spot-item ${index === activeIndex ? "active" : ""}`} data-id={index + 1} onClick={() => handleClick(index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {spot}
                </li>
              );
            })}
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
      )}
    </>
  );
});

export default Spots;

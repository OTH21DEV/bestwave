import React, { useEffect } from "react";
import "./nav.css";
import wave from "../../assets/wave.png";
// import van from "../../assets/van.png";
import sleep from "../../assets/sleep.png";
import surf from "../../assets/surf.png";
import news from "../../assets/news.png";
import DateNow from "../Date/Date";
import Logo from "../Logo/Logo";
import { SetIsMenuBtnClicked,Matches } from "../../types";

type NavProps = {
  isMenuBtnClicked: boolean;
  setIsMenuBtnClicked:  SetIsMenuBtnClicked
  matches: Matches;
};

const Nav: React.FC<NavProps> = ({ isMenuBtnClicked, setIsMenuBtnClicked, matches }) => {
  useEffect(() => {
    let startX: number;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 5) {
        // Swipe left - Close the menu
        setIsMenuBtnClicked(false);
      }
      // Swipe right - Open the menu
      else if (endX - startX > 5) {
        setIsMenuBtnClicked(true);
      }
    };

    const sideBarContainer = document.querySelector(".home__sidebar") as HTMLElement;

    if (sideBarContainer) {
      sideBarContainer.addEventListener("touchstart", handleTouchStart);
      sideBarContainer.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (sideBarContainer) {
        sideBarContainer.removeEventListener("touchstart", handleTouchStart);
        sideBarContainer.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [setIsMenuBtnClicked]);

  return (
    <aside className="home__sidebar">
      {/* Logo and DateNow always visible */}
      <div className="home__sidebar-header">
        <Logo />
        <DateNow />
      </div>

      {/* Sliding sidebar with menu items */}
      <div className={`home__sidebar-list ${isMenuBtnClicked && matches ? "home__sidebar-list-active" : ""}`}>
        <ul>
          <li className="home__sidebar-item home__sidebar-item--forecast">
            <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
            Forecast
          </li>
          <li className="home__sidebar-item home__sidebar-item--news">
            <img src={news} alt="News Icon" className="home__sidebar-icon" />
            News
          </li>

          {/* <li className="home__sidebar-item">
                 <img src={van} alt="Surf Icon" className="home__sidebar-icon" />
                 Travel
               </li> */}
          <li className="home__sidebar-item">
            <img src={sleep} alt="Surf Icon" className="home__sidebar-icon" />
            Sleep
          </li>
          <li className="home__sidebar-item">
            <img src={surf} alt="Surf Icon" className="home__sidebar-icon" />
            Shop
          </li>
        </ul>
      </div>
    </aside>
  );
};

// const Nav = ({ isMenuBtnClicked }) => {
//   return (
//     <>
//       <aside className="home__sidebar">
//         <div className={`home__sidebar-list ${isMenuBtnClicked ? "home__sidebar-list-active" : ""}`}>
//           {isMenuBtnClicked ? (
//             <ul>
//               <li className="home__sidebar-item home__sidebar-item--forecast">
//                 <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
//                 Forecast
//               </li>
//               <li className="home__sidebar-item home__sidebar-item--news">
//                 <img src={news} alt="News Icon" className="home__sidebar-icon" />
//                 News
//               </li>
//               <li className="home__sidebar-item">
//                 <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
//                 Surf
//               </li>
//               <li className="home__sidebar-item">
//                 <img src={van} alt="Surf Icon" className="home__sidebar-icon" />
//                 Travel
//               </li>
//               <li className="home__sidebar-item">
//                 <img src={sleep} alt="Surf Icon" className="home__sidebar-icon" />
//                 Sleep
//               </li>Oeiras e São Julião da Barra
//               <li className="home__sidebar-item">
//                 <img src={surf} alt="Surf Icon" className="home__sidebar-icon" />
//                 Shop
//               </li>
//             </ul>
//           ) : (
//             <>
//             <aside className="home__sidebar">
//               <Logo />
//               <DateNow />
//               </aside>
//             </>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// <>
//   {isMenuBtnClicked ? (
//     <aside className="home__sidebar">
//       <div className={`home__sidebar-list ${isMenuBtnClicked ? "home__sidebar-list-active" : ""}`}>
//         <ul>
//           <li className="home__sidebar-item home__sidebar-item--forecast">
//             <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
//             Forecast
//           </li>
//           <li className="home__sidebar-item home__sidebar-item--news">
//             <img src={news} alt="News Icon" className="home__sidebar-icon" />
//             News
//           </li>
//           <li className="home__sidebar-item">
//             <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
//             Surf
//           </li>
//           <li className="home__sidebar-item">
//             <img src={van} alt="Surf Icon" className="home__sidebar-icon" />
//             Travel
//           </li>
//           <li className="home__sidebar-item">
//             <img src={sleep} alt="Surf Icon" className="home__sidebar-icon" />
//             Sleep
//           </li>
//           <li className="home__sidebar-item">
//             <img src={surf} alt="Surf Icon" className="home__sidebar-icon" />
//             Shop
//           </li>
//         </ul>
//       </div>
//     </aside>
//   ) : (
//     <aside className="home__sidebar">
//       <Logo />
//       <DateNow />
//     </aside>
//   )}
// </>

/* <aside className="home__sidebar">
  <div className={`home__sidebar-list ${isMenuBtnClicked ? 'home__sidebar-list-active' : ''}`}>
    {isMenuBtnClicked ? (
      <>
        <ul>
          <li className="home__sidebar-item home__sidebar-item--forecast">
            <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
            Forecast
          </li>
          <li className="home__sidebar-item home__sidebar-item--news">
            <img src={news} alt="News Icon" className="home__sidebar-icon" />
            News
          </li>
          <li className="home__sidebar-item">
            <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
            Surf
          </li>
          <li className="home__sidebar-item">
            <img src={van} alt="Surf Icon" className="home__sidebar-icon" />
            Travel
          </li>
          <li className="home__sidebar-item">
            <img src={sleep} alt="Surf Icon" className="home__sidebar-icon" />
            Sleep
          </li>
          <li className="home__sidebar-item">
            <img src={surf} alt="Surf Icon" className="home__sidebar-icon" />
            Shop
          </li>
        </ul>
      </>
    ) : (
      <>
      <Logo />
      <DateNow />
      </>
    )}
  </div>
 
</aside>)} */

/* <aside className="home__sidebar">
  <div className={`home__sidebar-list ${isMenuBtnClicked ? 'home__sidebar-list-active' : ''}`}>
    {isMenuBtnClicked ? (
      <>
        <ul>
          <li className="home__sidebar-item home__sidebar-item--forecast">
            <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
            Forecast
          </li>
          <li className="home__sidebar-item home__sidebar-item--news">
            <img src={news} alt="News Icon" className="home__sidebar-icon" />
            News
          </li>
          <li className="home__sidebar-item">
            <img src={wave} alt="Surf Icon" className="home__sidebar-icon" />
            Surf
          </li>
          <li className="home__sidebar-item">
            <img src={van} alt="Surf Icon" className="home__sidebar-icon" />
            Travel
          </li>
          <li className="home__sidebar-item">
            <img src={sleep} alt="Surf Icon" className="home__sidebar-icon" />
            Sleep
          </li>
          <li className="home__sidebar-item">
            <img src={surf} alt="Surf Icon" className="home__sidebar-icon" />
            Shop
          </li>
        </ul>
      </>
    ) : (
      <Logo />
    )}
  </div>
  <DateNow />
</aside> */

export default Nav;

import React, { useEffect, useState } from "react";
import "./home.css";
import Map from "../../components/Map/Map";
import Title from "../../components/Title/Title";
import Nav from "../../components/Nav/Nav";
import Subtitle from "../../components/Subtitle/Subtitle";
import Arrow from "../../components/Arrow/Arrow";
import MenuButton from "../../components/MenuButton/MenuButton";
import { Matches } from "../../types";

type HomeProps = {
  matches: Matches;
  setMatches: React.Dispatch<React.SetStateAction<boolean>>;
};
const Home: React.FC<HomeProps> = ({ matches, setMatches }) => {
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width:750px)");

    const handleResize = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQueryList.addEventListener("change", handleResize);
    return () => mediaQueryList.removeEventListener("change", handleResize);
  }, [setMatches]);

  return (
    <section className="home">
      <MenuButton setIsMenuBtnClicked={setIsMenuBtnClicked} matches={matches} />
      <Nav isMenuBtnClicked={isMenuBtnClicked} setIsMenuBtnClicked={setIsMenuBtnClicked} matches={matches} />
      {/* <Title /> */}
      <div className="map-section">
        {!matches && <Title />}
        <Map />
        <Subtitle matches={matches} />
      </div>

      {!matches && <Arrow />}
    </section>
  );
};

export default Home;

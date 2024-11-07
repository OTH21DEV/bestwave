import React from "react";
import "./home.css";
import Map from "../../components/Map/Map";
import Title from "../../components/Title/Title";
import Nav from "../../components/Nav/Nav";
import Subtitle from "../../components/Subtitle/Subtitle";
import Arrow from "../../components/Arrow/Arrow";
// import Spots from '../../components/Spots/Spots';
// import Zigzag from "../../components/Zigzag/Zigzag";

const Home = () => {
  return (
    <section className="home">
      <Map />
   
      <Title />
      <Nav />
      {/* <DateNow/> */}
      <Subtitle />
      <Arrow />
      {/* <Spots/> */}
    </section>
  );
};

export default Home;

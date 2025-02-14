import Home from "./pages/Home/Home.tsx";
import Forecast from "./pages/Forecast/Forecast.tsx";
import React, { useState } from "react";
import Footer from "./components/Footer/Footer.tsx";

const App: React.FC = () => {
  const [matches, setMatches] = useState(window.matchMedia("(max-width:768px)").matches);

  return (
    <>
      <Home matches={matches} setMatches={setMatches} />
      <Forecast matches={matches} />
      <Footer />
    </>
  );
};

export default App;

import map from "../../assets/portugal-map.png";
import "./map.css";
import Zigzag from "../Zigzag/Zigzag";

const Map: React.FC = () => {
  // Fixed initial calculation based on full image size
  const dotPosition: { x: number; y: number } = { x: 46.5, y: 250 };

  const dotStyle: React.CSSProperties = {
    position: "absolute",
    top: `${dotPosition.y}px`,
    left: `${dotPosition.x}px`,
    width: "15px",
    height: "15px",
    backgroundColor: "#4af6ce",
    borderRadius: "50%",
    zIndex: "3",
  };

  return (
    <div className="home__image-map-container" style={{ position: "relative", width: "330px", height: "500px" }}>
      <img src={map} alt="Map" className="home__image-map" style={{ width: "330px", height: "500px" }} />
      <span style={dotStyle}></span>
      <Zigzag startX={15} startY={60} segmentWidths={[70, 50, 20, 80, 30, 40, 30]} segmentHeights={[55, 25, 10, 120, 60, 120, 70]} />
      {/* <Zigzag startX={15} startY={60} segmentWidths={[70, 50, 20, 80, 30, 40, 30]} segmentHeights={[55, 25, 10, 120, 60, 120, 70]} dotPosition={{ x: 20.5, y: 250 }} /> */}
    </div>
  );
};

export default Map;

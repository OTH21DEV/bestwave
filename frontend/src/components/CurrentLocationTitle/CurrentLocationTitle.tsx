import React, { ForwardedRef } from "react";
import "./currentLocationTitle.css";

type CurrentLocationTitleProps = {
  isCurrentLocationVisible: boolean;
};

const CurrentLocationTitle = React.forwardRef<HTMLDivElement, CurrentLocationTitleProps>(({ isCurrentLocationVisible }, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className={`forecast__current-location ${isCurrentLocationVisible ? "visible" : ""}`} ref={ref}>
      <p className="forecast__current-location__title">current location</p>
      <div className="forecast__current-location__details">
        <p className="forecast__current-location__city">Peniche</p>
        <span className="forecast__current-location__separator">|</span>
        <p className="forecast__current-location__country">Portugal</p>
      </div>
    </div>
  );
});

export default CurrentLocationTitle;

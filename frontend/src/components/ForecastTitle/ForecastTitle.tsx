import React, { ForwardedRef } from "react";
import "./foreecastTitle.css";

type ForecastTitleProps = {
  isTitleVisible: boolean;
};

const ForecastTitle = React.forwardRef<HTMLHeadingElement, ForecastTitleProps>(({ isTitleVisible }, ref: ForwardedRef<HTMLHeadingElement>) => {
  return (
    <div className="forecast__container">
      <h1 className={`forecast__title ${isTitleVisible ? "visible" : ""}`} ref={ref}>
        Forecast
      </h1>
      <h2 className="forecast__subtitle">Surf</h2>
    </div>
  );
});

export default ForecastTitle;

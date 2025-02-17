import "./dataTable.css";
import React  from "react";
import arrow from "../../assets/nav_arrow.png";
import { LocationForecast, ToggleSectionFunction, SetIsForecastBtnClicked } from "../../types";

type DataTableProps = {
  locationForecast: LocationForecast;
  toggleSection: ToggleSectionFunction;
  index: number;
  setIsForecastBtnClicked: SetIsForecastBtnClicked;
};

const DataTable: React.FC<DataTableProps> = ({ locationForecast, toggleSection, index, setIsForecastBtnClicked }) => {
  const getDates = (): string[] => {
    const dates = locationForecast
      .filter((_, index) => index % 8 === 0)
      .slice(0, 3)
      .map((forecast) => {
        const date = new Date(forecast.forecastDate);
        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "long",
          year: "numeric",
        };
        return date.toLocaleDateString("en-GB", options);
      });
    return dates;
  };

  const dates = getDates();
  const timeSlots: number[] = Array.from({ length: 8 }, (_, i) => i * 3);

  // useEffect(() => {
  //   if (locationForecast) {
  //     console.log("Updated locationForecast:", locationForecast);
  //   }
  // }, [locationForecast]);
console.log(locationForecast)
  return (
    <>
      {locationForecast && (
        <>
          <div className="overlay">
            <div className="table-wrapper">
              <div onClick={(e) => (toggleSection("", index, e), setIsForecastBtnClicked((prevState) => !prevState))}>
                <img src={arrow}></img>
              </div>

              <table className="table">
                <thead className="table__head">
                  <tr className="table__row table__row--header">
                    <th className="table__cell table__cell--header" rowSpan={2}></th>
                    {dates.map((date) => (
                      <th key={date} className="table__cell table__cell--header" colSpan={8}>
                        {date}
                      </th>
                    ))}
                  </tr>
                  <tr className="table__row table__row--subheader">
                    {dates.map((date) =>
                      timeSlots.map((time) => (
                        <th key={`${date}-${time}`} className="table__cell table__cell--subheader">
                          {time}:00
                        </th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody className="table__body">
                  {/* Wave height row*/}
                  <tr className="table__row">
                    <td className="table__cell table__cell--parameter">Wave Height</td>

                    {locationForecast.map((forecastTimeSlot, index) => (
                      <td key={`wind-height-${index}`} className="table__cell">
                        {forecastTimeSlot.waveHeight}
                      </td>
                    ))}
                  </tr>
                  {/* Wave direction row*/}
                  <tr className="table__row">
                    <td className="table__cell table__cell--parameter">Wave Direction</td>

                    {locationForecast.map((forecastTimeSlot, index) => (
                      <td key={`wind-direction-${index}`} className="table__cell">
                        {forecastTimeSlot.waveDirection}
                      </td>
                    ))}
                  </tr>
                  {/* Wave period row*/}
                  <tr className="table__row">
                    <td className="table__cell table__cell--parameter">Wave Period</td>

                    {locationForecast.map((forecastTimeSlot, index) => (
                      <td key={`wave-period-${index}`} className="table__cell">
                        {forecastTimeSlot.wavePeriod}
                      </td>
                    ))}
                  </tr>
                  {/* Swell height row */}
                  <tr className="table__row">
                    <td className="table__cell table__cell--parameter">Swell Height</td>

                    {locationForecast.map((forecastTimeSlot, index) => (
                      <td key={`swell-height-${index}`} className="table__cell">
                        {forecastTimeSlot.swellHeight}
                      </td>
                    ))}
                  </tr>
                  {/* Swell direction row */}
                  <tr className="table__row">
                    <td className="table__cell table__cell--parameter">Swell Direction</td>

                    {locationForecast.map((forecastTimeSlot, index) => (
                      <td key={`swell-direction-${index}`} className="table__cell">
                        {forecastTimeSlot.swellDirection}
                      </td>
                    ))}
                  </tr>
                  {/* Air temperature row */}
                  <tr className="table__row">
                    <td className="table__cell table__cell--parameter">Air Temp</td>

                    {locationForecast.map((forecastTimeSlot, index) => (
                      <td key={`air-temp-${index}`} className="table__cell">
                        {forecastTimeSlot.airTemperature}
                      </td>
                    ))}
                  </tr>
                  {/* Water temperature row */}
                  <tr className="table__row">
                    <td className="table__cell table__cell--parameter">Water Temp</td>

                    {locationForecast.map((forecastTimeSlot, index) => (
                      <td key={`water-temp-${index}`} className="table__cell">
                        {forecastTimeSlot.waterTemperature}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DataTable;

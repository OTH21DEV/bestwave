import"./dataTable.css"

const DataTable = ({ data }) => {
    const dates = ["Date1", "Date2", "Date3"]; 
    const timeSlots = Array.from({ length: 8 }, (_, i) => i * 3); 
  
    return (
        <div class="table-wrapper">
      <table className="table">
        <thead className="table__head">
          <tr className="table__row table__row--header">
            <th className="table__cell table__cell--header" rowSpan="2"></th>
            {dates.map(date => (
              <th key={date} className="table__cell table__cell--header" colSpan="8">{date}</th>
            ))}
          </tr>
          <tr className="table__row table__row--subheader">
            {dates.map(date =>
              timeSlots.map(time => (
                <th key={`${date}-${time}`} className="table__cell table__cell--subheader">{time}:00</th>
              ))
            )}
          </tr>
        </thead>
        <tbody className="table__body">
          {/* Wind Rows */}
          <tr className="table__row">
            <td className="table__cell table__cell--parameter">Wave Height</td>
            {Array(dates.length * timeSlots.length).fill().map((_, i) => (
              <td key={`wind-height-${i}`} className="table__cell">1.52</td>
            ))}
          </tr>
          <tr className="table__row">
            <td className="table__cell table__cell--parameter">Wave Direction</td>
            {Array(dates.length * timeSlots.length).fill().map((_, i) => (
              <td key={`wind-direction-${i}`} className="table__cell">261.02</td>
            ))}
          </tr>
          <tr className="table__row">
            <td className="table__cell table__cell--parameter">Wave Period</td>
            {Array(dates.length * timeSlots.length).fill().map((_, i) => (
              <td key={`wind-period-${i}`} className="table__cell">8.96</td>
            ))}
          </tr>
          {/* Swell Rows */}
          <tr className="table__row">
            <td className="table__cell table__cell--parameter">Swell Height</td>
            {Array(dates.length * timeSlots.length).fill().map((_, i) => (
              <td key={`swell-height-${i}`} className="table__cell">0.06</td>
            ))}
          </tr>
          <tr className="table__row">
            <td className="table__cell table__cell--parameter">Swell Direction</td>
            {Array(dates.length * timeSlots.length).fill().map((_, i) => (
              <td key={`swell-direction-${i}`} className="table__cell">330.59</td>
            ))}
          </tr>
          {/* Weather Rows */}
          <tr className="table__row">
            <td className="table__cell table__cell--parameter">Air Temp</td>
            {Array(dates.length * timeSlots.length).fill().map((_, i) => (
              <td key={`air-temp-${i}`} className="table__cell">18</td>
            ))}
          </tr>
          <tr className="table__row">
            <td className="table__cell table__cell--parameter">Water Temp</td>
            {Array(dates.length * timeSlots.length).fill().map((_, i) => (
              <td key={`water-temp-${i}`} className="table__cell">16.3</td>
            ))}
          </tr>
        </tbody>
      </table>
      </div>
    );
  };
  
  export default DataTable;
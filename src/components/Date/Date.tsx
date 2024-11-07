import React from "react";
import "./date.css"

const DateNow = () => {
  const today = new Date();
  const monthNumber = today.getMonth() + 1;
  const date = today.getDate();
  const year = today.getFullYear();
  let month = "";
  let months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  for (let key of Object.keys(months)) {
    if ((key = monthNumber)) {
      month = months[key];
    }
  }

  return (
    <div className="home__date">
      <span className="home__date-text">{date}</span>
      <div className="home__details">
        <span className="home__month">{month}</span>
        <span className="home__year">{year}</span>
      </div>
    </div>
  );
};

export default DateNow;

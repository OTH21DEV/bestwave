import React from "react";

export async function getLocationForecast(locationId) {
  const url = `http://localhost:13306/api/?id=${locationId}`;
  
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw new Error("An error occurred while making the API call." + error.message);
  }
}

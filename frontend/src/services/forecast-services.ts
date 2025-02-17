
import { Forecast } from "../../../shared/types";
type ForecastResponse = {
  error: boolean;
  data: Forecast[];
};
export async function getLocationForecast(locationId:string):Promise<ForecastResponse > {
  const url = `http://localhost:13306/api/?id=${locationId}`;
  
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json()
    return {
      error:false,
      data:result.data as Forecast[]
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("An error occurred while making the API call. " + error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

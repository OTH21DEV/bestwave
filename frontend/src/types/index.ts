// type Forecast = {
//   airTemperature: string;
//   forecastDate: string;
//   forecastID: number;
//   latitude: number;
//   locationID: number;
//   longitude: number;
//   name: string;
//   swellDirection: string;
//   swellPeriod: string;
//   timeSlot: string;
//   waterTemperature: string;
//   waveDirection: string;
//   waveHeight: string;
//   wavePeriod: string;
// };
import{Forecast } from"../../../shared/types"
/**
 * Spot forecast for 3 days with 8 slots/day
 */
export type LocationForecast = Forecast[];
/**
 * Func invoked when click "Tips" or "Forecast" btn (Spot and DataTable comp)
 */
export type ToggleSectionFunction = (section: string, index: number, event: React.MouseEvent<HTMLDivElement>) => void;
/**
 * Func invoked when "Forecast" btn is clicked (Spot and DataTable comp)
 */
export type SetIsForecastBtnClicked = React.Dispatch<React.SetStateAction<boolean>>;
/**
 * Func invoked when menu hamburger btn is clicked (MenuButton and Nav comp)
 */
export type SetIsMenuBtnClicked = React.Dispatch<React.SetStateAction<boolean>>;

/**
 * Should match breakpoint of max-width 768px (Home page => childs comp);
 */
export type Matches = boolean;
/**
 * Defines the section spot or forecast (spot and spots comp)
 */
export type ActiveSection = string | null;
/**
 * Defines the current index of chosen spot(worldMap and spot comp)
 */
export type ActiveSpotIndex = number;
/**
 * Handle the spot's names/titles (spot and worldMap comp)
 */
export type Titles = string[];

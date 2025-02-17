// import connection from "./../mysql.ts";
import pool from "./../mysql";
export const getForecast = async (req, res) => {
    try {
        // const location = await sqlFindForecast(req.params.id);
        const location = await sqlFindForecast(req.query.id);
        if (!location) {
            res.json({
                error: true,
                message: "Location not found",
            });
        }
        else {
            res.json({
                error: false,
                data: location,
            });
        }
    }
    catch (error) {
        const err = error;
        res.json({
            err: true,
            message: err.message,
        });
    }
};
// function sqlFindForecast(locationId: string | number): Promise<Forecast[]> {
//   return new Promise((resolve, reject) => {
//     const sql = `
//             SELECT 
//                 l.locationID, l.name, l.latitude, l.longitude,
//                 f.forecastID, f.forecastDate, f.timeSlot,
//                 wd.height as waveHeight, wd.period as wavePeriod,wd.direction as waveDirection,
//                 sd.direction as swellDirection, sd.height as swellHeight, sd.period as swellPeriod,
//                 ad.temperature as airTemperature,
//                 waterD.temperature as waterTemperature
//             FROM locations l
//             JOIN forecasts f ON l.locationID = f.locationID
//             LEFT JOIN waveData wd ON f.forecastID = wd.forecastID
//             LEFT JOIN swellData sd ON f.forecastID = sd.forecastID
//             LEFT JOIN airData ad ON f.forecastID = ad.forecastID
//               LEFT JOIN waterData waterD ON f.forecastID = waterD.forecastID
//             WHERE l.LocationID = ?`;
//     pool.query(sql, [locationId], (error: QueryError| null, results: any) => {
//       if (error) {
//         return reject(error);
//       }
//       resolve(results.length > 0 ? results : []);
//     });
//   });
// }
async function sqlFindForecast(locationId) {
    const sql = `
    SELECT 
      l.locationID, l.name, l.latitude, l.longitude,
      f.forecastID, f.forecastDate, f.timeSlot,
      wd.height as waveHeight, wd.period as wavePeriod, wd.direction as waveDirection,
      sd.direction as swellDirection, sd.height as swellHeight, sd.period as swellPeriod,
      ad.temperature as airTemperature,
      waterD.temperature as waterTemperature

    FROM locations l
    JOIN forecasts f ON l.locationID = f.locationID
    LEFT JOIN waveData wd ON f.forecastID = wd.forecastID
    LEFT JOIN swellData sd ON f.forecastID = sd.forecastID
    LEFT JOIN airData ad ON f.forecastID = ad.forecastID
    LEFT JOIN waterData waterD ON f.forecastID = waterD.forecastID

    WHERE l.LocationID = ?`;
    try {
        const [results] = await pool.execute(sql, [locationId]);
        return Array.isArray(results) ? results : [];
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Query failed: ${error.message}`);
        }
        throw new Error('Query failed with an unknown error.');
    }
}

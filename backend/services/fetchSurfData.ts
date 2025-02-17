import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import cron from "node-cron";
import { Pool, MysqlError, Connection } from "mysql";
import mysql from "mysql2";
import pool from "./../mysql.ts";
dotenv.config();
// const connection = require("./../mysql.js");
// const connection = mysql.createConnection({
//   host: "deathweb.xyz",
//   database: "bestwave",
//   user: "oxanasql",
//   password: "StrOng5PasswOrDOx!",
//   port: "13306",
//   multipleStatements: true,
//   // ssl: true,
//   // host: process.env.MYSQL_HOST ,
//   // database: process.env.MYSQL_DATABASE,
//   // user: process.env.MYSQL_USER,
//   // password: process.env.MYSQL_PASSWORD,
//   // port: process.env.PORT,
// });
// const pool = mysql.createPool({
//   host: "deathweb.xyz",
//   database: "bestwave",
//   user: "oxanasql",
//   password: "StrOng5PasswOrDOx!",
//   port: 13306,
//   waitForConnections: true,
//   connectionLimit: 10, // Max number of connections
//   queueLimit: 0,
//   connectTimeout: 10000,
// });
// const pool = mysql.createPool({
//   host: "deathweb.xyz",
//   database: "bestwave",
//   user: "oxanasql",
//   password: "StrOng5PasswOrDOx!",
//   port: 13306,
//   waitForConnections: true,
//   connectionLimit: 10, // Max number of connections
//   queueLimit: 0,
//   connectTimeout: 10000,
// }).promise();

type Location = {
  locationID: string;
  name: string;
  latitude: number;
  longitude: number;
};

type HourData = {
  time: string;
  waveHeight: { noaa: number };
  wavePeriod: { noaa: number };
  waveDirection: { noaa: number };
  swellHeight: { noaa: number };
  swellDirection: { noaa: number };
  swellPeriod: { noaa: number };
  waterTemperature: { noaa: number };
  airTemperature: { noaa: number };
};
//get spots list with gps coordinates from the database (locations table)

const getSpotsFromDatabase = async (): Promise<Location[]> => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT locationID,name,latitude,longitude FROM locations LIMIT 2", (error: MysqlError | null, results: Location[]) => {
      if (error) {
        // reject(error);
        console.log("Database Query Error:", error);
      } else {
        console.log("Query successful:", results);
        resolve(results);
      }
    });
  });
};

//Utility function to calculate date
const calculateDate = (offsetDays: number, utcHour = 0): number => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offsetDays);
  date.setUTCHours(utcHour, 0, 0, 0);
  let dateTimestamp = Math.floor(date.getTime() / 1000);
  return dateTimestamp;
};

// const defineStartDate = () => calculateDate(0, 0);
// const defineEndDate = () => calculateDate(2, 21);

// Filter data for every 3 hours interval
const filterDataEveryTreeHours = (data: HourData[]): HourData[] => {
  return data.filter((item) => {
    const hour = new Date(item.time).getUTCHours();
    return hour % 3 == 0;
  });
};

// Flag to determine if it is the initial fetch
// Initial Fetch: Fetch data starting from today (day 0) up to two days ahead (day +2).
// Subsequent Fetches: Adjust both the start and end dates to day +2, but with different hours.

let firstFetch = false;

const defineStartDate = (): number => {
  return firstFetch ? calculateDate(0, 0) : calculateDate(2, 0);
};

const defineEndDate = (): number => {
  return firstFetch ? calculateDate(2, 21) : calculateDate(2, 21);
};

const fetchSurfData = async (): Promise<void> => {
  try {
    //get spots from database
    const spots = await getSpotsFromDatabase();

    console.log("Fetched spots:", spots);
    // fetch API for eachspot with own parameters
    const requests = spots.map((spot) =>
      axios.get(`https://api.stormglass.io/v2/weather/point`, {
        params: {
          lat: spot.latitude,
          lng: spot.longitude,
          // source: process.env.API_SOURCE,
          source: "noaa",
          start: defineStartDate(),
          end: defineEndDate(),
          params: "waveHeight,waveDirection,wavePeriod,swellHeight,swellDirection,swellPeriod,airTemperature,waterTemperature",
        },
        headers: {
          Authorization: `65e85ce2-95e1-11ef-9159-0242ac130003-65e85d78-95e1-11ef-9159-0242ac130003`,
        },
      })
    );

    const responses: AxiosResponse[] = await Promise.all(requests);

    // Iterate through responses to access data  of each spot

    responses.forEach(async (response, index) => {
      try {
        // Check the specific structure
        if (response && response.data && response.data.hours) {
          let filteredData = filterDataEveryTreeHours(response.data.hours as HourData[]);

          await insertDataIntoDatabase(spots[index].locationID, filteredData);
        } else {
          console.warn(`Unexpected response structure for spot ${spots[index].locationID}`);
        }
      } catch (innerError) {
        console.error(`Error processing response for spot ${spots[index].locationID}:`, innerError);
      }

      ////////////////
    });
    // Set flag to false after the initial fetch
    // firstFetch = false;
  } catch (error) {
    console.error(error);
  }
};

// const getLocationIdFromDatabase = async (spotID: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     pool.query("SELECT locationID FROM locations WHERE locationID = ?", [spotID], (error: MysqlError | null, results: any[]) => {
//       if (error) {
//         reject(new Error(`Error querying database: ${error.message}`));
//       } else if (results.length === 0) {
//         reject(new Error(`Location with ID ${spotID} not found in the database.`));
//       } else {
//         console.log("Query successful:", results);
//         resolve(results[0].locationID); // Resolves with the actual LocationID
//       }
//     });
//   });
// };
const getLocationIdFromDatabase = async (spotID: string): Promise<string> => {
  try {
    const [results] = await pool.query("SELECT locationID FROM locations WHERE locationID = ?", [spotID]);

    if ((results as any[]).length === 0) {
      throw new Error(`Location with ID ${spotID} not found in the database.`);
    }

    console.log("Query successful:", results);

    return (results as any[])[0].locationID;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error querying database: ${error.message}`);
    }
    throw new Error("Error querying database with an unknown error.");
  }
};
//test

// const insertDataIntoDatabase = async (spotID: string, filteredData: HourData[]): Promise<void> => {
//   try {
//     const locationID = await getLocationIdFromDatabase(spotID);

//     for (const hourData of filteredData) {
//       // for (const hourData of data.hours) {

//       // Parse Date and Time from time field
//       const dateTime = new Date(hourData.time);
//       const date = dateTime.toISOString().split("T")[0];
//       const timeSlot = dateTime.toISOString().slice(11, 19);

//       const sqlUpdateForecasts = "INSERT INTO forecasts (locationID, forecastDate, timeSlot) VALUES (?, ?, ?)";

//       const sqlUpdateWave = "INSERT INTO waveData(forecastID,height,period,direction) VALUES(?,?,?,?)";
//       const sqlUpdateSwell = "INSERT INTO swellData (forecastID, height,period,direction) VALUES (?, ?, ?,?)";
//       const sqlUpdateWater = "INSERT INTO waterData (forecastID,temperature) VALUES(?,?)";
//       const sqlUpdateAir = "INSERT INTO airData (forecastID,temperature) VALUES(?,?)";

//       try {
//         //insert data in forecast table
//         const forecastResult = await new Promise((resolve, reject) => {
//           pool.query(sqlUpdateForecasts, [locationID, date, timeSlot], (err: MysqlError | null, result) => {
//             if (err) {
//               console.error(`Error inserting data into forecasts table: ${err.message}`);
//               reject(err);
//             } else {
//               console.log("Data successfully inserted into forecasts table:", result);
//               resolve(result);
//             }
//           });
//         });

//         //gets the forecastId from the first query
//         const forecastId = forecastResult.insertId;

//         //insert data in waveData table

//         await new Promise((resolve, reject) => {
//           const waveHeight = hourData.waveHeight.noaa || 0;
//           const wavePeriod = hourData.wavePeriod.noaa || 0;
//           const waveDirection = hourData.waveDirection.noaa || 0;
//           pool.query(sqlUpdateWave, [forecastId, waveHeight, wavePeriod, waveDirection], (err: MysqlError | null, result) => {
//             if (err) {
//               console.error(`Error inserting data into waveData table: ${err.message}`);
//               reject(err);
//             } else {
//               console.log("Data successfully inserted into waveData table:", result);
//               resolve(result);
//             }
//           });
//         });

//         //insert data in swellData table
//         await new Promise((resolve, reject) => {
//           const swellHeight = hourData.swellHeight.noaa || 0;
//           const swellDirection = hourData.swellDirection.noaa || 0;
//           const swellPeriod = hourData.swellPeriod.noaa || 0;

//           pool.query(sqlUpdateSwell, [forecastId, swellHeight, swellPeriod, swellDirection], (err: MysqlError | null, result) => {
//             if (err) {
//               console.error(`Error inserting data into swellData table: ${err.message}`);
//               reject(err);
//             } else {
//               console.log("Data successfully inserted into swellData table:", result);
//               resolve(result);
//             }
//           });
//         });

//         //insert data in waterData table

//         await new Promise((resolve, reject) => {
//           const waterTemp = hourData.waterTemperature.noaa || 0;

//           pool.query(sqlUpdateWater, [forecastId, waterTemp], (err: MysqlError | null, result) => {
//             if (err) {
//               console.error(`Error inserting data into waterData table: ${err.message}`);
//               reject(err);
//             } else {
//               console.log("Data successfully inserted into waterData table:", result);
//               resolve(result);
//             }
//           });
//         });

//         //insert data in airData table

//         await new Promise((resolve, reject) => {
//           const airTemp = hourData.airTemperature.noaa || 0;

//           pool.query(sqlUpdateAir, [forecastId, airTemp], (err: MysqlError | null, result) => {
//             if (err) {
//               console.error(`Error inserting data into airData table: ${err.message}`);
//               reject(err);
//             } else {
//               console.log("Data successfully inserted into airData table:", result);
//               resolve(result);
//             }
//           });
//         });
//       } catch (queryError) {
//         console.error(`Query failed for time slot ${timeSlot}: ${queryError}`);
//       }
//     }
//   } catch (error) {
//     console.error(`Error in insertDataIntoDatabase function: ${error.message}`);
//   }
// };

const insertDataIntoDatabase = async (spotID: string, filteredData: HourData[]): Promise<void> => {
  try {
    const locationID = await getLocationIdFromDatabase(spotID);

    for (const hourData of filteredData) {
      // Parse Date and Time from time field
      const dateTime = new Date(hourData.time);
      const date = dateTime.toISOString().split("T")[0];
      const timeSlot = dateTime.toISOString().slice(11, 19);

      const sqlUpdateForecasts = "INSERT INTO forecasts (locationID, forecastDate, timeSlot) VALUES (?, ?, ?)";
      const sqlUpdateWave = "INSERT INTO waveData(forecastID, height, period, direction) VALUES (?, ?, ?, ?)";
      const sqlUpdateSwell = "INSERT INTO swellData (forecastID, height, period, direction) VALUES (?, ?, ?, ?)";
      const sqlUpdateWater = "INSERT INTO waterData (forecastID, temperature) VALUES (?, ?)";
      const sqlUpdateAir = "INSERT INTO airData (forecastID, temperature) VALUES (?, ?)";

      try {
        // Insert data into forecasts table
        const [forecastResult] = await pool.query(sqlUpdateForecasts, [locationID, date, timeSlot]);
        // @ts-ignore
        const forecastId = forecastResult.insertId;
        console.log(forecastId);
        // Insert data into waveData table
        const waveHeight = hourData.waveHeight.noaa || 0;
        const wavePeriod = hourData.wavePeriod.noaa || 0;
        const waveDirection = hourData.waveDirection.noaa || 0;
        await pool.query(sqlUpdateWave, [forecastId, waveHeight, wavePeriod, waveDirection]);

        // Insert data into swellData table
        const swellHeight = hourData.swellHeight.noaa || 0;
        const swellDirection = hourData.swellDirection.noaa || 0;
        const swellPeriod = hourData.swellPeriod.noaa || 0;
        await pool.query(sqlUpdateSwell, [forecastId, swellHeight, swellPeriod, swellDirection]);

        // Insert data into waterData table
        const waterTemp = hourData.waterTemperature.noaa || 0;
        await pool.query(sqlUpdateWater, [forecastId, waterTemp]);

        // Insert data into airData table
        const airTemp = hourData.airTemperature.noaa || 0;
        await pool.query(sqlUpdateAir, [forecastId, airTemp]);

        console.log("Data successfully inserted for time slot:", timeSlot);
      } catch (queryError) {
        if (queryError instanceof Error) {
          console.error(`Query failed for time slot ${timeSlot}: ${queryError.message}`);
        } else {
          console.error(`Query failed for time slot ${timeSlot} with an unknown error:`, queryError);
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in insertDataIntoDatabase function: ${error.message}`);
    } else {
      console.error("Unknown error in insertDataIntoDatabase function:", error);
    }
  }
};

// fetchSurfData();

// Function to delete specific day's data from all related tables

const deleteDayData = async (date: string): Promise<void> => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const queries = [
      `
        DELETE FROM airData
        WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)
      `,
      `
        DELETE FROM swellData
        WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)
      `,
      `
        DELETE FROM waterData
        WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)
      `,
      `
        DELETE FROM waveData
        WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)
      `,
      `
        DELETE FROM forecasts WHERE forecastDate = ?
      `,
    ];

    for (const query of queries) {
      await connection.query(query, [date]);
    }

    await connection.commit(); // Commit transaction on success
    console.log(`Deleted data for date: ${date}`);
  } catch (error) {
    await connection.rollback(); // Rollback transaction on error
    throw error;
  } finally {
    connection.release(); // Release the connection back to the pool
  }
};

// const deleteDayData = (date: string) => {
//   return new Promise((resolve, reject) => {
//     //

//     //

//     // Delete related data from WaveData and SwellData tables
//     const deleteAirDataQuery = `
//       DELETE FROM airData
//       WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)
//     `;
//     const deleteSwellDataQuery = `
//       DELETE FROM swellData
//       WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)
//     `;
//     const deleteWaterDataQuery = `
//     DELETE FROM waterData
//     WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)
//   `;
//     const deleteWaveDataQuery = `
//   DELETE FROM waveData
//   WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)
// `;

//     // Using transaction here to maintain consistency
//     pool.beginTransaction((err) => {
//       if (err) {
//         return reject(err);
//       }

//       pool.query(deleteAirDataQuery, [date], (error) => {
//         if (error) {
//           return pool.rollback(() => reject(error));
//         }

//         pool.query(deleteSwellDataQuery, [date], (error) => {
//           if (error) {
//             return pool.rollback(() => reject(error));
//           }

//           pool.query(deleteWaterDataQuery, [date], (error) => {
//             if (error) {
//               return pool.rollback(() => reject(error));
//             }

//             pool.query(deleteWaveDataQuery, [date], (error) => {
//               if (error) {
//                 return pool.rollback(() => reject(error));
//               }

//               // Step 2: Delete from forecasts table
//               const deleteForecastQuery = "DELETE FROM forecasts WHERE forecastDate = ?";
//               pool.query(deleteForecastQuery, [date], (error, results) => {
//                 if (error) {
//                   return pool.rollback(() => reject(error));
//                 }
//                 pool.commit((err) => {
//                   if (err) {
//                     return pool.rollback(() => reject(err));
//                   }
//                   console.log(`Deleted data for date: ${date}`);
//                   resolve(results);
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// };

// // Schedule and initial
const updateDailyData = async () => {
  try {
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const formattedDate = yesterday.toISOString().split("T")[0]; // Ensure correct date format (YYYY-MM-DD)

    // Step 1: Delete previous day's data from database 's tables(air,swell,water,wave,forecasts)

    await deleteDayData(formattedDate);

    // Step 1: Fetch new surf data
    await fetchSurfData();
  } catch (error) {
    console.error("Error updating daily data:", error);
  }
};

// updateDailyData()

// Schedule to run daily at midnight
cron.schedule(
  "0 0 * * *",
  async () => {
    console.log("Running scheduled data update...");
    try {
      await updateDailyData();
      console.log("Data update complete.");
    } catch (error) {
      console.error("Error during data update:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Lisbon",
  }
);

// const deleteDayData = async (date) => {
//   const deleteQueries = [
//     `DELETE FROM airData WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)`,
//     `DELETE FROM swellData WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)`,
//     `DELETE FROM waterData WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)`,
//     `DELETE FROM waveData WHERE forecastID IN (SELECT forecastID FROM forecasts WHERE forecastDate = ?)`
//   ];

//   try {
//     await new Promise((resolve, reject) => {
//       connection.beginTransaction(err => {
//         if (err) return reject(err);

//         resolve();
//       });
//     });

//     for (const query of deleteQueries) {
//       await new Promise((resolve, reject) => {
//         connection.query(query, [date], (error, results) => {
//           if (error) return reject(error);
//           resolve(results);
//         });
//       });
//     }

//     const deleteForecastQuery = "DELETE FROM forecasts WHERE forecastDate = ?";
//     await new Promise((resolve, reject) => {
//       connection.query(deleteForecastQuery, [date], (error, results) => {
//         if (error) return reject(error);
//         resolve(results);
//       });
//     });

//     await new Promise((resolve, reject) => {
//       connection.commit(err => {
//         if (err) return connection.rollback(() => reject(err));
//         console.log(`Deleted data for date: ${date}`);
//         resolve();
//       });
//     });
//   } catch (error) {
//     await new Promise(resolve => {
//       connection.rollback(() => {
//         resolve();
//         throw error;
//       });
//     });
//   }
// };

// const updateDailyData = async () => {
//   try {
//     const yesterday = new Date();
//     yesterday.setUTCDate(yesterday.getUTCDate() - 1);
//     const formattedDate = yesterday.toISOString().split("T")[0];

//     await deleteDayData(formattedDate);
//     await fetchSurfData();
//   } catch (error) {
//     console.error("Error updating daily data:", error);
//   }
// };

// updateDailyData();

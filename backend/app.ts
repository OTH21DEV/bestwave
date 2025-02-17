import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
// //let cors = require("cors");

// import forecastRoutes from "./routes/forecast"
import router from "./routes/forecast.ts";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //adds headers  while call  API
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
//  serve static files
// // Resolve the path to the frontend build directory
// const frontendPath = path.resolve(__dirname, "../frontend/dist");

// // Add this line to serve static files
// app.use(express.static(frontendPath));

// // Serve index.html for SPA routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });


// app.use('/api', forecastRoutes);
app.use("/api", router);


export default app;

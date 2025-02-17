import express from "express";
import { getForecast } from "../controllers/forecastController.ts";

const router = express.Router();

router.get("/", getForecast);

export default router;

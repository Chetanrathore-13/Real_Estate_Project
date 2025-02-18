import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getCountries, addCountry, deleteCountry, updateCountry,
  getStates, addState, deleteState, updateState,
  getCities, addCity, deleteCity, updateCity
} from "../controllers/location.controller.js";

const router = express.Router();

// Country Routes
router.get("/countries", authMiddleware, getCountries);
router.post("/add_country", authMiddleware, addCountry);
router.delete("/delete_country/:id", authMiddleware, deleteCountry);
router.patch("/patch_country/:id", authMiddleware, updateCountry);

// State Routes
router.get("/states", authMiddleware, getStates);
router.post("/add_states", authMiddleware, addState);
router.delete("/delete_states/:id", authMiddleware, deleteState);
router.patch("/patch_states/:id", authMiddleware, updateState);

// City Routes
router.get("/cities", authMiddleware, getCities);
router.post("/add_cities", authMiddleware, addCity);
router.delete("/delete_cities/:id", authMiddleware, deleteCity);
router.patch("/patch_cities/:id", authMiddleware, updateCity);

export default router;

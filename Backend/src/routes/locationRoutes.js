import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getCountries, addCountry, deleteCountry, updateCountry,
  getStates, addState, deleteState, updateState,
  getCities, addCity, deleteCity, updateCity
} from "../controllers/location.controller.js";
import {upload} from "../multer/upload.js";

const router = express.Router();

// Country Routes
router.get("/countries", authMiddleware, getCountries);
router.post("/add_country",authMiddleware,upload.single("icon"), addCountry);
router.delete("/delete_country/:id", authMiddleware, deleteCountry);
router.patch("/patch_country/:id", authMiddleware, updateCountry);

// State Routes
router.get("/states/:countryId", authMiddleware, getStates);
router.post("/add_states", authMiddleware,upload.single("icon"), addState);
router.delete("/delete_states/:id", authMiddleware, deleteState);
router.patch("/patch_states/:id", authMiddleware, updateState);

// City Routes
router.get("/cities/:stateId", authMiddleware, getCities);
router.post("/add_city", authMiddleware,upload.single("icon"), addCity);
router.delete("/delete_city/:id", authMiddleware, deleteCity);
router.patch("/patch_city/:id", authMiddleware, updateCity);

export default router;

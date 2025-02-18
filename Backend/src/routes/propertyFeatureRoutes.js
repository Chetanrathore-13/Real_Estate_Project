import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getPropertyFeatures,
  addPropertyFeature,
  deletePropertyFeature,
  updatePropertyFeature
} from "../controllers/propertyFeatures.controller.js";

const router = express.Router();

router.get("/property_features", authMiddleware, getPropertyFeatures);
router.post("/add_property_features", authMiddleware, addPropertyFeature);
router.delete("/delete_property_features/:id", authMiddleware, deletePropertyFeature);
router.patch("/update_property_features/:id", authMiddleware, updatePropertyFeature);

export default router;

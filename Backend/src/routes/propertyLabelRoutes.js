import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getPropertyLabels,
    addPropertyLabel,
    deletePropertyLabel,
    updatePropertyLabel
} from "../controllers/propertyLabel.controller.js";

const router = express.Router();

router.get("/property_labels", authMiddleware, getPropertyLabels);
router.post("/add_property_labels", authMiddleware, addPropertyLabel);
router.delete("/delete_property_labels/:id", authMiddleware, deletePropertyLabel);
router.patch("/update_property_labels/:id", authMiddleware, updatePropertyLabel);

export default router;
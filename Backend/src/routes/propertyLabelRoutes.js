import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getPropertyLabels,
    addPropertyLabel,
    deletePropertyLabel,
    updatePropertyLabel
} from "../controllers/propertyLabel.controller.js";
import { upload } from "../multer/upload.js";

const router = express.Router();

router.get("/property_labels", authMiddleware, getPropertyLabels);
router.post("/add_property_labels", authMiddleware, upload.single("icon"), addPropertyLabel);
router.delete("/delete_property_labels/:id", authMiddleware, deletePropertyLabel);
router.patch("/update_property_labels/:id", authMiddleware,upload.single("icon"), updatePropertyLabel);

export default router;
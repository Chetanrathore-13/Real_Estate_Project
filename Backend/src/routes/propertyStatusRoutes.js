import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getPropertyStatus,
    addPropertyStatus,
    deletePropertyStatus,
    updatePropertyStatus
} from "../controllers/propertyStatus.controller.js";
import { upload } from "../multer/upload.js";

const router = express.Router();

router.get("/property_status", authMiddleware, getPropertyStatus);
router.post("/add_property_status", authMiddleware,upload.single("icon"), addPropertyStatus);
router.delete("/delete_property_status/:id", authMiddleware, deletePropertyStatus);
router.patch("/update_property_status/:id", authMiddleware, updatePropertyStatus);

export default router;
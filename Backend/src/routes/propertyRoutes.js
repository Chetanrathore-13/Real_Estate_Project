import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getProperties,
    addProperty,
    deleteProperty,
    updateProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

router.get("/properties", authMiddleware, getProperties);
router.post("/add_property", authMiddleware, addProperty);
router.delete("/delete_property/:id", authMiddleware, deleteProperty);
router.patch("/update_property/:id", authMiddleware, updateProperty);

export default router;
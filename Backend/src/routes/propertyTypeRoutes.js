import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getPropertyTypes,
    addPropertyType,
    deletePropertyType,
    updatePropertyType
} from "../controllers/propertyType.controller.js";


const router = express.Router();

router.get("/property_types", authMiddleware, getPropertyTypes);
router.post("/add_property_types", authMiddleware, addPropertyType);
router.delete("/delete_property_types/:id", authMiddleware, deletePropertyType);
router.patch("/update_property_types/:id", authMiddleware, updatePropertyType);

export default router;

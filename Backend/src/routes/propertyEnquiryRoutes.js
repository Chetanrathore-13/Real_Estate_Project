import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    createPropertyEnquiry,
    getPropertyEnquiries,
    updatePropertyEnquiry,
    deletePropertyEnquiry
} from "../controllers/propertyEnquiry.controller.js";

const router = express.Router();

router.get("/contacts", authMiddleware, getPropertyEnquiries);
router.post("/add_contact", authMiddleware, createPropertyEnquiry);
router.delete("/delete_contact/:id", authMiddleware, deletePropertyEnquiry);
router.patch("/update_contact/:id", authMiddleware, updatePropertyEnquiry);

export default router;
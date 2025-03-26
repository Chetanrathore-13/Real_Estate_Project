import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getContactUs,
    createContactUs,
    deleteContactUs,
    updateContactUs
} from "../controllers/contactUs.controller.js";

const router = express.Router();

router.get("/get_contacts", getContactUs);
router.post("/add_contact", authMiddleware, createContactUs);
router.delete("/delete_contact/:id", authMiddleware, deleteContactUs);
router.patch("/update_contact/:id", authMiddleware, updateContactUs);

export default router;
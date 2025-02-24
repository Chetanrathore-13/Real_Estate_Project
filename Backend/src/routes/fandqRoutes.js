import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getFandQ,
    createFandQ,
    updateFandQ,
    deleteFandQ
} from "../controllers/fandq.controller.js";

const router = express.Router();

router.get("/contacts", authMiddleware, getFandQ);
router.post("/add_contact", authMiddleware, createFandQ);
router.delete("/delete_contact/:id", authMiddleware, deleteFandQ);
router.patch("/update_contact/:id", authMiddleware, updateFandQ);

export default router;
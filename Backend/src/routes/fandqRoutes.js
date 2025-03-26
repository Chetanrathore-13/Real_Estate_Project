import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getFandQ,
    createFandQ,
    updateFandQ,
    deleteFandQ
} from "../controllers/fandq.controller.js";

const router = express.Router();

router.get("/get_faqs", getFandQ);
router.post("/faqs", authMiddleware, createFandQ);
router.delete("/delete_faqs/:id", authMiddleware, deleteFandQ);
router.patch("/update_faqs/:id", authMiddleware, updateFandQ);

export default router;
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getAgents,
    addAgent,
    deleteAgent,
    updateAgent
} from "../controllers/agent.controller.js";

const router = express.Router();

router.get("/agents", authMiddleware, getAgents);
router.post("/add_agent", authMiddleware, addAgent);
router.delete("/delete_agent/:id", authMiddleware, deleteAgent);
router.patch("/update_agent/:id", authMiddleware, updateAgent);

export default router;
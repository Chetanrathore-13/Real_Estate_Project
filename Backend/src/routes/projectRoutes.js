import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getprojects,
    addproject,
    deleteproject,
    updateproject
} from "../controllers/project.controller.js";

const router = express.Router();    

router.get("/projects", authMiddleware, getprojects);
router.post("/add_project", authMiddleware, addproject);
router.delete("/delete_project/:id", authMiddleware, deleteproject);
router.patch("/update_project/:id", authMiddleware, updateproject);

export default router;
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getProjects,
    addProject,
    deleteProject,
    updateProject
} from "../controllers/project.controller.js";

const router = express.Router();    

router.get("/projects", authMiddleware, getProjects);
router.post("/add_project", authMiddleware, addProject);
router.delete("/delete_project/:id", authMiddleware, deleteProject);
router.patch("/update_project/:id", authMiddleware, updateProject);

export default router;
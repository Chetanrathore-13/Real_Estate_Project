import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    getprojects,
    getproject
} from "../controllers/project.controller.js";

const router = express.Router();    


router.get("/projects", getprojects);
router.get("/get_project/:slug", getproject);

export default router;
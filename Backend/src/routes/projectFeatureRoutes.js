import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import {addProjectFeature,getProjectFeature, updateProjectFeature, deleteProjectFeature } from "../controllers/projectFeature.controller.js"
import { upload } from "../multer/upload.js"

const router = express.Router()

router.get("/get_projectFeature",authMiddleware,getProjectFeature);
router.post("/add_projectFeature",authMiddleware,upload.single("icon"),addProjectFeature);
router.patch("/update_projectFeature/:slug",authMiddleware,upload.single("icon"),updateProjectFeature);
router.delete("/delete_projectFeature/:slug",authMiddleware,deleteProjectFeature)

export default router
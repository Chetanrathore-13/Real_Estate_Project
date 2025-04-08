import express from "express";
import { getUsers } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();



// Login User


// Protected Routes
router.get("/admin-dashboard", authMiddleware, roleMiddleware(["admin"]), getUsers); // Only Admin can see all users


export default router;

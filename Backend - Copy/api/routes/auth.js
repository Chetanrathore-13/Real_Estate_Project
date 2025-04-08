import express from "express";
import { login, register,getUsers } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Protected Routes
router.get("/admin-dashboard", authMiddleware, roleMiddleware(["admin"]), getUsers); // Only Admin can see all users
router.get("/vendor-dashboard", authMiddleware, roleMiddleware(["vendor"]), (req, res) => {
    res.json({ message: "Welcome to the Vendor Dashboard" });
});
router.get("/user-dashboard", authMiddleware, roleMiddleware(["user"]), (req, res) => {
    res.json({ message: "Welcome to the User Dashboard" });
});

export default router;

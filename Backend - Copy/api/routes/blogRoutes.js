import express from "express";
import { getBlogs, getBlogById } from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/get_blogs", getBlogs);
router.get("/get_blog/:slug", getBlogById);

export default router;

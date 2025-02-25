import Blog from "../models/blog.js";

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        return res.status(201).json(blog);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Get all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


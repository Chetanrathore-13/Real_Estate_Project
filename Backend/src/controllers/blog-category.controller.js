import BlogCategory from "../models/blog-category.js";

export const createBlogCategory = async (req, res) => {
    console.log("yha tak agae")
        try {
            const blogCategory = await BlogCategory.create(req.body);
            return res.status(201).json(blogCategory);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

export const getBlogCategories = async (req, res) => {
    console.log("Kuch to hua")
        try {
            const blogCategories = await BlogCategory.find();
            return res.status(200).json(blogCategories);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

export const updateBlogCategory = async (req, res) => {
        try {
            const blogCategory = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!blogCategory) {
                return res.status(404).json({ error: "Blog Category not found" });
            }
            return res.status(200).json(blogCategory);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

export const deleteBlogCategory = async (req, res) => {
        try {
            const blogCategory = await BlogCategory.findByIdAndDelete(req.params.id);
            if (!blogCategory) {
                return res.status(404).json({ error: "Blog Category not found" });
            }
            return res.status(200).json({ message: "Blog Category deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
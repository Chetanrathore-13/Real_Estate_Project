import BlogTag from "../models/blog-tags.js";

export const getBlogTags = async (req, res) => {
    try {
        const blogTags = await BlogTag.find();
        return res.status(200).json(blogTags);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const createBlogTag = async (req, res) => {
    const {name} = req.body;
    console.log(req.body);
    try {
        const blogTag = await BlogTag.create({name});
        return res.status(201).json(blogTag);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const updateBlogTag = async (req, res) => {
    try {
        const blogTag = await BlogTag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blogTag) {
            return res.status(404).json({ error: "Blog Tag not found" });
        }
        return res.status(200).json(blogTag);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteBlogTag = async (req, res) => {
    try {
        const blogTag = await BlogTag.findByIdAndDelete(req.params.id);
        if (!blogTag) {
            return res.status(404).json({ error: "Blog Tag not found" });
        }
        return res.status(200).json({ message: "Blog Tag deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

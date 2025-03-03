import BlogCategory from "../models/blog-category.js";
import slugify from "slugify";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../public/images");

export const createBlogCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description || !req.file) {
      return res
        .status(400)
        .json({ error: "All fields are required, including an image" });
    }
    const imageUrl = `/public/images/${req.file.filename}`;

    const blogCategory = await BlogCategory.create({
      name,
      Description: description,
      Image: imageUrl,
      slug,
    });
    return res.status(201).json(blogCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBlogCategories = async (req, res) => {

  try {
    const blogCategories = await BlogCategory.find();

    const categoriesWithImages = blogCategories.map((category) => {
      let imageBase64 = null;
      if (category.Image) {
        const imagePath = path.join(publicPath, path.basename(category.Image));
        try {
          if (fs.existsSync(imagePath)) {
            imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
          } else {
            console.warn(`Image not found at path: ${imagePath}`);
          }
        } catch (err) {
          console.error(`Error reading image file: ${err.message}`);
        }
      }
      return {
        ...category.toObject(),
        imageBase64: imageBase64,
      };
    });

    return res.status(200).json(categoriesWithImages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBlogCategory = async (req, res) => {
  try {
    const { name, Description } = req.body;
    const categoryId = req.params.id;

    let blogCategory = await BlogCategory.findById(categoryId);
    if (!blogCategory) {
      return res.status(404).json({ error: "Blog Category not found" });
    }

    // Check if name is changing and if it already exists
    if (name && name !== blogCategory.name) {
      const existingCategory = await BlogCategory.findOne({
        slug: slugify(name, { lower: true, strict: true }),
      });
      if (existingCategory) {
        return res
          .status(400)
          .json({ error: "Category with this name already exists" });
      }
    }

    // Prepare updated data
    const updatedData = { name, Description };

    if (name) {
      updatedData.slug = slugify(name, { lower: true, strict: true });
    }

    if (req.file) {
      const newImageUrl = `/images/${req.file.filename}`;

      // Delete the old image if it exists
      if (blogCategory.Image) {
        const oldImagePath = path.join(
          publicPath,
          path.basename(blogCategory.Image)
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      updatedData.Image = newImageUrl;
    }

    blogCategory = await BlogCategory.findByIdAndUpdate(
      categoryId,
      updatedData,
      { new: true }
    );

    return res.status(200).json(blogCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBlogCategory = async (req, res) => {
  try {
    const blogCategory = await BlogCategory.findById(req.params.id);

    if (!blogCategory) {
      return res.status(404).json({ error: "Blog Category not found" });
    }

    // Delete the image file from the server
    if (blogCategory.Image) {
      const imagePath = path.join(publicPath, path.basename(blogCategory.Image));

      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });
      }
    }

    // Delete the blog category from the database
    await BlogCategory.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Blog Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

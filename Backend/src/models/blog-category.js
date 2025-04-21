import mongoose from "mongoose";
import slugify from "slugify";

const blogCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    Image: { type: String, required: true },
    slug: { type: String, unique: true }
}, { timestamps: true });

// Middleware to generate slug before saving
blogCategorySchema.pre("save", function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });


export default mongoose.model("BlogCategory", blogCategorySchema);
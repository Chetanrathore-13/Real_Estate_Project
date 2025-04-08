import mongoose from "mongoose";
import slugify from "slugify";

const blogTagSchema = new mongoose.Schema({
    name: { type: String, required: [true, "name is required"], unique: true, trim: true },
    slug: { type: String, unique: true }
}, { timestamps: true });

// Middleware to generate slug before saving or updating
blogTagSchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("BlogTag", blogTagSchema);

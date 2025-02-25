import mongoose from "mongoose";

const blogTagSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true }
}, { timestamps: true });

// Middleware to generate slug before saving
blogTagSchema.pre("save", function (next) {
    if (this.Name) {
      this.slug = slugify(this.Name, { lower: true, strict: true });
    }
    next();
  });

export default mongoose.model("BlogTag", blogTagSchema);
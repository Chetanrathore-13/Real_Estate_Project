import mongoose from "mongoose";
import slugify from "slugify";
const projectTypeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon:{ type: String, required: true },
    slug: { type: String, unique: true }
}, { timestamps: true });

// Middleware to generate slug before saving
projectTypeSchema.pre("save", function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
})

export default mongoose.model("ProjectType", projectTypeSchema);
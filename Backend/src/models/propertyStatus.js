import mongoose from "mongoose";
import slugify from "slugify";

export const propertyStatusSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    icon: { type: String, required: true }, // URL of the icon/image
    description: { type: String, required: true },
    slug: { type: String, unique: true }
})

// Middleware to generate slug before saving
propertyStatusSchema.pre("save", function (next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });

export default mongoose.model("PropertyStatus", propertyStatusSchema);
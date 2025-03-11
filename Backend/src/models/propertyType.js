import mongoose from "mongoose";
import slugify from "slugify";

const propertyTypeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    icon: { type: String, required: true }, // URL of the icon/image
    description: { type: String, required: true },
    slug: { type: String, unique: true, default: "" }
  },
  { timestamps: true }
);

// Middleware to generate unique slug before saving
propertyTypeSchema.pre("save", async function (next) {
    if (this.isModified("title")) {
        let slug = slugify(this.title, { lower: true, strict: true });
        let existing = await this.constructor.findOne({ slug });

        if (existing) {
            slug = `${slug}-${Date.now()}`; // Append timestamp if duplicate exists
        }

        this.slug = slug;
    }
    next();
});

export default mongoose.model("PropertyType", propertyTypeSchema);

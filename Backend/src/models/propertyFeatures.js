import mongoose from "mongoose";

const propertyFeatureSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  icon: { type: String, required: true }, // URL of the icon/image
  description: { type: String, required: true },
  slug: { type: String, required: true, unique: true }
}, { timestamps: true });

// Middleware to generate slug before saving
propertyFeatureSchema.pre("save", function (next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });

export default mongoose.model("PropertyFeature", propertyFeatureSchema);

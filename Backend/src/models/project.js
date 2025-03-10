import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    projectFeatures: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectFeature" }],
    projectType: { type: mongoose.Schema.Types.ObjectId, ref: "ProjectType" },
    featuredImage: { type: String, required: true },
    imageGallery: [String],
    videoLinks: [String],
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    slug: { type: String, required: true, unique: true }
    
}, { timestamps: true });

// Middleware to generate slug before saving
projectSchema.pre("save", function (next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

export default mongoose.model("Project", projectSchema);
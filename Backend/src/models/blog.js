import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategory" },
    tagId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    featureImage: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    slug: { type: String, unique: true },
}, { timestamps: true });


// Middleware to generate slug before saving
blogSchema.pre("save", function (next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
})
export default mongoose.model("Blog",blogSchema)

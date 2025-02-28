import mongoose from "mongoose";

// Input fields
// Title
// Slug
// Description
// Category Id (obj id)
// Tag id (obj id)
// Feature Image
// Author id (login user id)(obj id)

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategory" },
    tagId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogTag" },
    featureImage: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });


// Middleware to generate slug before saving
blogSchema.pre("save", function (next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
})
export  default mongoose.model("Blog",blogSchema)

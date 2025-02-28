import mongoose from "mongoose";
import slugify from "slugify";

const blogCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    Image: { type: String, required: true },
    slug: { type: String,required: true, unique: true }
}, { timestamps: true });


export default mongoose.model("BlogCategory", blogCategorySchema);
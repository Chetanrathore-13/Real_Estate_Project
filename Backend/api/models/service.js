import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    icon: { type: String, required: true }, // URL of the icon/image
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
});

export default mongoose.model("Service", serviceSchema);
import mongoose from "mongoose";

// Input Fields

// Question(String)
// Answer(Longtext)

const fandqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("FandQ", fandqSchema);

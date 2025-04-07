import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    email: String,
    contactNumber: String,
    whatsappNumber: String,
    serviceAreas: [String],
    specialities: [String],
    position: String,
    companyName: String,
    licence: String,
    taxNumber: String,
    officeNumber: String,
    faxNumber: String,
    language: String,
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    fullAddress: String,
    facebookURL: String,
    instagramURL: String,
    xURL: String,
    googleURL: String,
    linkedinURL: String,
    profileImage: String
});

export default mongoose.model("Agent",agentSchema)

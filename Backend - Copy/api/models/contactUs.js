import mongoose from "mongoose";

// Input Fields

// Full Address
// Latitude Coordinates
// Longitude Coordinates
// Contact Number (Array)
// Opening Hours
// Email
// Whats App Number

const contactUsSchema = new mongoose.Schema({
    fullAddress: { type: String, required: true },
    latitudeCoordinates: { type: String, required: true },
    longitudeCoordinates: { type: String, required: true },
    contactNumber: [{ type: String, required: true }],
    openingHours: { type: String, required: true },
    email: { type: String, required: true },
    whatsAppNumber: { type: String, required: true },
    officeNumber:{ type: String, required: true },
    openingTIme:{ type: String, required: true },
    closingTime:{ type: String, required: true }
}, { timestamps: true });

export default mongoose.model("ContactUs", contactUsSchema);

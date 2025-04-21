import mongoose from "mongoose";

// Input fields are :-

// Full Name
// Contact Number
// Email (Not Compulsory)
// Property id (property obj id)
// Property Type (Ojb id)
// User Id (Vendor or admin id who listed it on website)(obj id)

const propertyEnquirySchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: false },
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    propertyType: { type: mongoose.Schema.Types.ObjectId, ref: "PropertyType" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("PropertyEnquiry", propertyEnquirySchema);

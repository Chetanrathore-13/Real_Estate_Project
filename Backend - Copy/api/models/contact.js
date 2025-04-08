import mongoose from "mongoose";


// Input fields are :-
// Full Name
// Email
// Contact Number
// Subject
// Message
// Budget
// Status (enum) (Closed, Pending, In Progress)

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    budget: { type: String, required: true },
    status: { type: String, enum: ["Closed", "Pending", "In Progress"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
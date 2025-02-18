import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
    role: { 
        type: String, 
        enum: ["user", "vendor", "admin"], // Allowed roles
        default: "user" // Default role
    }
}, { timestamps: true });


// Pre-save Hook to hash password
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
  
//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
  
//     // Remove confirmPassword field after validation
//     // this.confirmPassword = undefined;
  
//     next();
//   });

export default mongoose.model("User", userSchema);

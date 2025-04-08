import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config({
    path: "./.env",
});

// Fix __dirname for ES Modules
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use("/public/images", express.static("/public/images"));
// Serve uploaded images statically
app.use("/images", express.static(path.join(__dirname, "public/images")));


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
};
connectDb();






import authRoutes from "./routes/auth.js";
app.use("/api/v1/auth", authRoutes);






import propertyRoutes from "./routes/propertyRoutes.js";
app.use("/api/v1/property", propertyRoutes);

import projectRoutes from "./routes/projectRoutes.js";
app.use("/api/v1/project", projectRoutes);





import fandqRoutes from "./routes/fandqRoutes.js";
app.use("/api/v1/fandq", fandqRoutes);






import blogRoutes from "./routes/blogRoutes.js";
app.use("/api/v1/blog",blogRoutes)





import serviceRoutes from "./routes/serviceRoutes.js"
app.use("/api/v1/service", serviceRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

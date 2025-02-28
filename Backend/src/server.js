import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config({
    path: "./.env",
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/public/images", express.static("/public/images"));

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
};
connectDb();

import locationRoutes from './routes/locationRoutes.js';
app.use("/api/v1/location",locationRoutes)

import propertyFeature from "./routes/propertyFeatureRoutes.js"
app.use("/api/v1",propertyFeature)

import properyTypeRoutes from "./routes/propertyTypeRoutes.js"
app.use("/api/v1/property",properyTypeRoutes)

import authRoutes from "./routes/auth.js";
app.use("/api/v1/auth", authRoutes);

import propertyStatusRoutes from "./routes/propertyStatusRoutes.js";
app.use("/api/v1/property", propertyStatusRoutes);

import propertyLabelRoutes from "./routes/propertyLabelRoutes.js";
app.use("/api/v1/property", propertyLabelRoutes);

import agentRoutes from "./routes/agentRoutes.js";
app.use("/api/v1/agent", agentRoutes);

import propertyRoutes from "./routes/propertyRoutes.js";
app.use("/api/v1/property", propertyRoutes);

import projectRoutes from "./routes/projectRoutes.js";
app.use("/api/v1/project", projectRoutes);

import contactRoutes from "./routes/contactRoutes.js";
app.use("/api/v1/contact", contactRoutes);

import propertyEnquiryRoutes from "./routes/propertyEnquiryRoutes.js";
app.use("/api/v1/enquiry", propertyEnquiryRoutes);

import fandqRoutes from "./routes/fandqRoutes.js";
app.use("/api/v1/fandq", fandqRoutes);

import contactUsRoutes from "./routes/contactUsRoutes.js";
app.use("/api/v1/contactus", contactUsRoutes); 

import blogCategoryRoutes from "./routes/blog-cateogryRoutes.js";
app.use("/api/v1/blogcategory", blogCategoryRoutes);

import blogtagRoutes from "./routes/blog-tagRoutes.js";
app.use("/api/v1/blogtag",blogtagRoutes)

import blogRoutes from "./routes/blogRoutes.js";
app.use("/api/v1/blog",blogRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

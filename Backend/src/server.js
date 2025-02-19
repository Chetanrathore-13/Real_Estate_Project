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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

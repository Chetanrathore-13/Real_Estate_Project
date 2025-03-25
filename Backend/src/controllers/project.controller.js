import Project from "../models/project.js";
import fs from "fs"
import ProjectFeature from "../models/projectFeature.js";
import ProjectType from "../models/projectType.js";
import Property from "../models/property.js";

// Use all the CRUD operations
const getprojects = async (req, res) => {
    console.log("Hello paji");
    try {
        let { search = "", page = 1, limit = 10 } = req.query;

        page = Math.max(1, parseInt(page) || 1);
        limit = Math.max(1, parseInt(limit) || 10);

        const filter = search.trim()
            ? {
                  $or: [
                      { name: { $regex: search, $options: "i" } },
                      { slug: { $regex: search, $options: "i" } },
                  ],
              }
            : {};

        const total = await Project.countDocuments(filter); // Corrected countDocuments usage

        const projects = await Project.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .lean(); // Convert Mongoose docs to plain objects

        // Convert image file to Base64
        const convertToBase64 = (filePath) => {
            try {
                if (fs.existsSync(filePath)) {
                    const imageBuffer = fs.readFileSync(filePath);
                    return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
                }
                return null;
            } catch (error) {
                console.error("Error converting image:", error);
                return null;
            }
        };

        // Process projects with Base64 images
        const formattedProjects = projects.map((project) => ({
            ...project,
            featureImage: project.featureImage ? convertToBase64(project.featureImage) : null,
            imageGallery: project.imageGallery ? project.imageGallery.map((img) => convertToBase64(img)) : [],
        }));

        // Fetch and attach feature names
        const featureNames = await Promise.all(
            formattedProjects.map(async (project) => {
                const features = await ProjectFeature.find({ _id: { $in: project.projectFeatures } }, "title").lean();
                return features.map((feature) => feature.title);
            })
        );

        formattedProjects.forEach((project, index) => {
            project.featureName = featureNames[index];
        });

        // Fetch and attach type names
        const typeNames = await Promise.all(
            formattedProjects.map(async (project) => {
                const types = await ProjectType.find({ _id: { $in: project.projectType } }, "title").lean();
                return types.map((type) => type.title);
            })
        );

        formattedProjects.forEach((project, index) => {
            project.typeName = typeNames[index];
        });

        res.status(200).json({ formattedProjects, total, page, limit });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};  


const addproject = async (req, res) => {
    try {
        const { name, description, projectFeatures, projectType, videoLinks, agent, properties  } = req.body;
        const featureImage = req.files.featureImage[0].path
        const imageGallery = req.files.imageGallery.map((file) => file.path)
        const project = new Project({ name, description, projectFeatures, projectType, featureImage, imageGallery, videoLinks, agent, properties  });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateproject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedproject = await Project.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedproject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteproject = async (req, res) => {
    try {
        const { id } = req.params;
        await Project.findByIdAndDelete(id);
        res.json({ message: "project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getprojects, addproject, updateproject, deleteproject };
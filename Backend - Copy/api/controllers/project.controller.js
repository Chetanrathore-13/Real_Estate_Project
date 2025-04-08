import Project from "../models/project.js";
import fs from "fs"
import ProjectFeature from "../models/projectFeature.js";
import ProjectType from "../models/projectType.js";
import Property from "../models/property.js";

// Use all the CRUD operations
const getprojects = async (req, res) => {
    try {
        let { projectType = ""  ,search = "", page = 1, limit = 10 } = req.query;
        console.log(req.query)

        page = Math.max(1, parseInt(page) || 1);
        limit = Math.max(1, parseInt(limit) || 10);

        const filter = {};

        if (search.trim()) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { slug: { $regex: search, $options: "i" } },
            ];
        }

        if (projectType) {
            filter.projectType = projectType; // Assuming projectType is an ObjectId (string)
        }

        const total = await Project.countDocuments(filter);
        const totalPages = Math.ceil(total / limit); // Calculate total pages

        const projects = await Project.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .lean();

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

        res.status(200).json({ formattedProjects, total, totalPages, page, limit });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


const getproject = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(slug)
        const project = await Project.findOne({ slug }).lean();
        // find property and add in the project properties is the array of objectids of properties
        const properties = await Property.find({ _id: { $in: project.properties } }).lean();
        project.properties = properties
        // we have to convert image to base64
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
        project.featureImage = project.featureImage ? convertToBase64(project.featureImage) : null;
        project.imageGallery = project.imageGallery ? project.imageGallery.map((img) => convertToBase64(img)) : [];
        // now in the properties we have featureImage and imageGallery also
        properties.forEach((property) => {
            property.featureImage = property.featureImage ? convertToBase64(property.featureImage) : null;
            property.imageGallery = property.imageGallery ? property.imageGallery.map((img) => convertToBase64(img)) : [];
        })
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getprojects , getproject};
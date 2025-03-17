import Project from "../models/project.js";
import fs from "fs"
import ProjectFeature from "../models/projectFeature.js";
import ProjectType from "../models/projectType.js";
import Property from "../models/property.js";

// Use all the CRUD operations
const getprojects = async (req, res) => {
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
        const projects = await Project.find(filter)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
        
    const total = await Blog.countDocuments(filter)
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
               // Process properties with Base64 images
      const formattedProjects = projects.map((property) => ({
        ...property._doc,
        featureImage: property.featureImage ? convertToBase64(property.featureImage) : null,
        imageGallery: property.imageGallery
            ? property.imageGallery.map((img) => convertToBase64(img))
            : [],
    }));

    const featureName = await  Promise.all(formattedProjects.map(async (project) => {
        const feature = await ProjectFeature.find({_id:{$in:project.projectFeatures}});
        return feature.map((feature) => feature.title);
    }))
    formattedProjects.forEach((project, index) => {
        project.featureName = featureName[index];
    })
    
    const typeName = await Promise.all(formattedProjects.map(async (project)=>{
        const type = await ProjectType.find({_id:{$in:project.projectType}});
        return type.map((type)=> type.title);
    }))
    formattedProjects.forEach((project,index)=>{
        project.typeName = typeName[index];
    })
    
    res.status(200).json({ formattedProjects });
    } catch (error) {
        res.status(500).send("Error fetching projects");
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
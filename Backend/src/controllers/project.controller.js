import Project from "../models/project.js";

// Use all the CRUD operations
const getprojects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).send("Error fetching projects");
    }
};


const addproject = async (req, res) => {
    try {
        const { name, description, features, projectType, featuredImage, imageGallery, videoLinks, agent, properties  } = req.body;
        const project = new Project({ name, description, features, projectType, featuredImage, imageGallery, videoLinks, agent, properties  });
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
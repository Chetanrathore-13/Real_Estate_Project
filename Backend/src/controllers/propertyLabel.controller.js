import Agent from "../models/agent.model.js";

// Get all agents
export const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json({ success: true, data: agents });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Add a new agent
export const addAgent = async (req, res) => {
    try {
        const agent = new Agent(req.body);
        await agent.save();
        res.status(201).json({ success: true, data: agent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update an agent
export const updateAgent = async (req, res) => {
    try {
        const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!agent) {
            return res.status(404).json({ success: false, message: "Agent not found" });
        }
        res.status(200).json({ success: true, data: agent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete an agent
export const deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (!agent) {
            return res.status(404).json({ success: false, message: "Agent not found" });
        }
        res.status(200).json({ success: true, message: "Agent deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

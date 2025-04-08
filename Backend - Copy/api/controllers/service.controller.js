import Service from "../models/service.js";

export const getAllServices = async (req, res) => {
        try {
            const services = await Service.find();
            res.json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

export const createService = async (req, res) => {
        try {
            const service = await Service.create(req.body);
            res.status(201).json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

export const updateService = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
            res.json(updatedService);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

export const deleteService = async (req, res) => {
        try {
            const { id } = req.params;
            await Service.findByIdAndDelete(id);
            res.json({ message: "Service deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
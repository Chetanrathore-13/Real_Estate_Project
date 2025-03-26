import FandQ from "../models/fandq.js";

export const getFandQ = async (req, res) => {
    try {
        const fandqs = await FandQ.find();
        res.status(200).json( fandqs );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createFandQ = async (req, res) => {
    try {
        const fandq = await FandQ.create(req.body);
        res.status(201).json(fandq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateFandQ = async (req, res) => {
    try {
        const fandq = await FandQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(fandq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteFandQ = async (req, res) => {
    try {
        const fandq = await FandQ.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "FandQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

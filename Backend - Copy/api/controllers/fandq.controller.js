import FandQ from "../models/fandq.js";

export const getFandQ = async (req, res) => {
    try {
        const fandqs = await FandQ.find();
        res.status(200).json( fandqs );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}






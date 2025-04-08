import User from "../models/user.js";



// Get all registered users
 const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.status(200).json({user: users});
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
};

export {  getUsers };
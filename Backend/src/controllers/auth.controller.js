import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { username, email, password,confirmpassword, role } = req.body;

        if(!username || !email || !password || !confirmpassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            username,
            email,
            password: hashedPassword,          
            role: role || "user", // Default role is "user"
        });
        
        const registredUser = await newUser.save();
        res.status(201).json({ user: registredUser, message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token: `Bearer ${token}`,
            role: user.role, // Send role to frontend
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

// Get all registered users
 const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.status(200).json({user: users});
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
};

export { register, login, getUsers };
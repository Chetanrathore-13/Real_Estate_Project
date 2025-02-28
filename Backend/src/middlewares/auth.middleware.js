import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    console.log("auth middleware");
    
    const authHeader = req.header("Authorization");
    // Check if the Authorization header is missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

export default authMiddleware;

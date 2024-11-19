import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access Denied: No token provided.",
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Ensure the JWT secret is defined
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in the environment variables.");
      return res.status(500).json({
        message: "Server error: Missing JWT secret.",
      });
    }

    // Verify the token
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);

    // Attach verified user info to `req.user`
    req.user = verifiedUser;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        message: "Invalid token. Access denied.",
      });
    }

    // Catch-all for unexpected errors
    return res.status(500).json({
      message: "Server error during token verification.",
    });
  }
};

export default authMiddleware;

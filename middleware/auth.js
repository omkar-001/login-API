import jwt from "jsonwebtoken";

/**
 * Authentication Middleware
 * Verifies JWT token from request headers and adds user data to request
 *
 * Header format: Authorization: Bearer <token>
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const auth = (req, res, next) => {
  try {
    // Extract token from Authorization header and remove 'Bearer ' prefix
    const token = req.header("Authorization").replace("Bearer ", "");

    // Verify token using JWT_SECRET from environment variables
    // If token is invalid or expired, this will throw an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add decoded user data to request object for use in route handlers
    req.user = decoded;

    // Continue to next middleware or route handler
    next();
  } catch (error) {
    // Handle authentication errors (invalid/expired token, no token provided)
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default auth;

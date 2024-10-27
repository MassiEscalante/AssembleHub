import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
// **Middleware to authenticate JWT tokens**
export const authenticateToken = (req, res, next) => {
    // **Get token from Authorization header**
    const token = req.headers.authorization?.split(' ')[1];
    // **Return error if token is missing**
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        // **Verify token and attach user info to request**
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        // **Return error if token is invalid or expired**
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

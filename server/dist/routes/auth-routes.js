import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        // TODO: If the user exists and the password is correct, return a JWT token
        // **Updated: Check user and generate JWT if credentials are correct**
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' } // Token expires in 1 hour
            );
            return res.json({ token });
        }
        // **Return error if credentials are incorrect**
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    catch (error) {
        // **Return error if server encounters an issue**
        return res.status(500).json({ message: error.message });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
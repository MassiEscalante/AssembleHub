import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      // Log before checking the password to see if comparison succeeds
      console.log("User found, comparing passwords...");
      
      // Revert to bcrypt comparison
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("Password comparison result with bcrypt:", passwordMatch);

      if (passwordMatch) {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: '1h' } // Token expires in 1 hour
        );
        return res.json({ token });
      }
    }

    // Return error if credentials are incorrect
    return res.status(401).json({ message: 'Invalid username or password' });

  } catch (error: any) {
    // Log any other errors that occur during login
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
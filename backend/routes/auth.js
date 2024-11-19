import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const{username, email, password, role, country} = req.body;
    console.log(req.body);
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'Email already in use' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,email, password: hashedPassword, role, country
        });

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully!",
            user
        });
    } catch (err) {
        res.status(400).json({
            message: "Error Creating User",
            error: err.message,
            stack: err.stack
        })
    }
});


router.post('/login', async (req, res) => {

    const {email, password} = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
     
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role, country: user.country },
          process.env.JWT_SECRET,
          { expiresIn: '1d' } 
        );
    
        res.status(200).json({
          message: 'Login successful',
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            country: user.country,
            username: user.username,
          },
          token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post("/country", async (req, res) => {
  const { country } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; 
  console.log(token);


  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    const userId = decoded.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { country },
      { new: true } 
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });




    res.status(200).json({ message: "Country updated", user: updatedUser });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: err.message });
  }
});


export default router;
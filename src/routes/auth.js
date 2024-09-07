const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User'); // Ensure User model is defined properly
const mongoose = require('mongoose'); // Mongoose import should be here
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    body('username').isString().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    console.log('Incoming request to /register with body:', req.body); // Debugging log

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors on /register:', errors.array()); // Debugging log
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check if MongoDB is connected
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB not connected');
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('User already exists with username:', username); // Debugging log
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // Create a token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      if (error.message.includes('MongoDB not connected')) {
        console.error('MongoDB connection error during registration:', error.message);
        return res.status(500).json({ message: 'Database connection error during registration' });
      }
      console.error('Error during registration:', error.message);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// User login
router.post(
  '/login',
  [
    body('username').isString().withMessage('Username is required'),
    body('password').isString().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors on /login:', errors.array()); // Debugging log
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check if MongoDB is connected
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB not connected');
      }

      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        console.log('Login failed: User not found for username:', username); // Debugging log
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Login failed: Incorrect password for user:', username); // Debugging log
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create and send JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      if (error.message.includes('MongoDB not connected')) {
        console.error('MongoDB connection error during login:', error.message);
        return res.status(500).json({ message: 'Database connection error during login' });
      }
      console.error('Error during login:', error.message);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
);

// User Profile (Protected Route)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // Find the user by ID stored in req.user (set by authMiddleware)
    const user = await User.findById(req.user);
    if (!user) {
      console.error('User profile request failed: User not found for ID:', req.user); // Debugging log
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Respond with the user profile
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

module.exports = router;

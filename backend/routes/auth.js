const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, profilepicture, role, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      profilepicture,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User Registration Successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

    // Set session variables
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.email = user.email;
    req.session.username = user.username;

    console.log('Session userId set:', req.session.userId);
    console.log('Session role set:', req.session.role);
    console.log('Session email set:', req.session.email);
    console.log('Session username set:', req.session.username);

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Error logging out', error: err.message });

    res.clearCookie('connect.sid'); // Name of the session ID cookie
    res.clearCookie('token'); // Clear the JWT token cookie
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Protected route (requires authentication)
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

module.exports = router;

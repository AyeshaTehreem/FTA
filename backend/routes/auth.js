// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const createError = require('http-errors');

// const { authenticateToken } = require('../middleware/auth');
// require('dotenv').config();


// // Register
// router.post('/register', async (req, res, next) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });
    
//     newUser.generateVerificationToken(); // Generate token
//     await newUser.save();

//     const verificationUrl = `http://localhost:${process.env.PORT}/verify-email/${newUser.verificationToken}`;
//     await sendVerificationEmail(email,verificationUrl)
   

//     res.status(201).json({
//       message: 'Registration successful. Check your email for verification link.',
//       username: newUser.username,
//       email: newUser.email,
//       role: 'user'
//     });
//   } catch (error) {
//     next(error);
//   }
// });



// // Login
// router.post('/login', async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     // Check if email is verified
//     if (!user.verified) {
//       return res.status(403).json({ message: 'Email is not verified. Please check your inbox.' });
//     }

//     // Check if password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

//     // Set session data
//     req.session.userId = user._id;
//     req.session.role = user.role;
//     req.session.email = user.email;
//     req.session.username = user.username;

//     console.log('Session userId set:', req.session.userId);
//     console.log('Session role set:', req.session.role);
//     console.log('Session email set:', req.session.email);
//     console.log('Session username set:', req.session.username);
//     console.log('Session cookie attributes:', req.session.cookie);

//     // Return success response
//     res.status(200).json({ 
//       message: 'Login successful',
//       username: user.username,
//       email: user.email,
//       role: user.role
//     });
//   } catch (error) {
//     // Handle errors
//     next(createError(500, 'Error logging in'));
//   }
// });

// router.post('/logout', (req, res) => {
//   console.log('Logout request received:', req.session);
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Logout error:', err);
//       return res.status(500).json({ message: 'Logout failed', error: err.message });
//     }
//     res.clearCookie('connect.sid');
//     console.log('Logout successful, session destroyed');
//     res.status(200).json({ message: 'Logout successful' });
//   });
// });

// router.get('/session', (req, res) => {
//   if (req.session.userId) {
//     return res.status(200).json({
//       role: req.session.role,
//       email: req.session.email,
//       username: req.session.username,
//     });
//   } else {
//     return res.status(401).json({ message: 'No active session' });
//   }
// });


// // Protected route (requires authentication)
// router.get('/protected', authenticateToken, (req, res) => {
//   res.status(200).json({ message: 'This is a protected route' });
// });




// export const sendVerificationEmail = async (email, link) => {
//   // Create transporter object with SMTP server details
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', // or use your email provider
//     auth: {
//       user: "", // Your Gmail address
//       pass: '', // Your Gmail password or app-specific password
//     },
//   });

//   // Send email with the verification link
//   await transporter.sendMail({
//     from: 'fa952282@gmail.com.com',
//     to: email,
//     subject: '🔐 Verify Your Fair and Squair Account',
//     html: `
//       <p>👋 Hello,</p>
//       <p>Thank you for signing up with Fair and Squair! Please verify your email by clicking the link below:</p>
//       <p>🔗 <a href="${link}">Verify Email</a></p>
//       <p>Note:If you did not create an account with us, please ignore this email.</p>
//       <p>🚀 Best regards,<br/>Fair and Squair Team</p>
//     `,
//   });
// };
// module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const createError = require('http-errors');
require('dotenv').config();
const { authenticateToken } = require('../middleware/auth');


// Register
router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    
    newUser.generateVerificationToken(); // Ensure this is defined in your model
    await newUser.save();

    const verificationUrl = `http://localhost:3000/verify-email/${newUser.verificationToken}`;
    await sendVerificationEmail(email, verificationUrl);

    res.status(201).json({
      message: 'Registration successful. Check your email for verification link.',
      username: newUser.username,
      email: newUser.email,
      role: 'user',
    });
  } catch (error) {
    console.error('Error during registration:', error); // Log the error
    next(createError(500, 'Internal Server Error')); // Handle the error
  }
});




router.get('/verify-email/:token', async (req, res, next) => {
  const { token } = req.params;

  try {
    // Find the user by the verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Check if the user is already verified
    if (user.verified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = null; // Clear the token as it's no longer needed
    await user.save();

    // Redirect or return a success message
    res.status(200).json({ message: 'Email successfully verified!' });
  } catch (error) {
    next(createError(500, 'Error verifying email'));
  }
});


// Login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    if (!user.verified) {
      return res.status(403).json({ message: 'Email is not verified. Please check your inbox.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.email = user.email;
    req.session.username = user.username;

    res.status(200).json({ 
      message: 'Login successful',
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(createError(500, 'Error logging in'));
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err.message });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Get session details
router.get('/session', (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({
      role: req.session.role,
      email: req.session.email,
      username: req.session.username,
    });
  } else {
    return res.status(401).json({ message: 'No active session' });
  }
});

// Protected route (requires authentication)
router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});

// Function to send verification email
const sendVerificationEmail = async (email, link) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fa952282@gmail.com', // Use credentials from .env
      pass: 'xxka llen pmyr wupr', // Use credentials from .env
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // Sender address from .env
    to: email,
    subject: '🔐 Verify Your FTA TIMES Account',
    html: `
      <p>👋 Hello,</p>
      <p>Thank you for signing up with us! Please verify your email by clicking the link below:</p>
      <p>🔗 <a href="${link}">Verify Email</a></p>
      <p>If you did not create an account with us, please ignore this email.</p>
      <p>🚀 Best regards,<br/>FTA TIMES</p>
    `,
  });
};

module.exports = router;

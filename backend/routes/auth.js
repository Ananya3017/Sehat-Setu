const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate Verification Token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'patient',
      verificationToken,
      isVerified: false
    });

    if (user) {
      // Send Email
      const verifyUrl = `${req.headers.origin || 'http://localhost:8080'}/verify-email?token=${verificationToken}`;
      
      try {
        await sendEmail({
          email: user.email,
          subject: 'Health Vault - Verify your email',
          html: `
            <h2>Welcome to Health Vault, ${user.name}!</h2>
            <p>Please confirm your email address to activate your account by clicking the link below:</p>
            <a href="${verifyUrl}" style="background-color: #0d2318; color: #3fb950; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
          `
        });
        res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // We still created the user, they just might need to request another token later
        res.status(201).json({ message: 'Registration successful, but verification email failed to send. Please contact administration.' });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify a user's email using a token
// @access  Public
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'No verification token provided' });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email successfully verified!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during verification' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate a user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      // Ensure the user has verified their email
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Please verify your email before logging in.' });
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

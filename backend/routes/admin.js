const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    // Return users excluding their passwords
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

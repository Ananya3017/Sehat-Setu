const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('../models/User');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const adminEmail = 'admin@health.gov.in';
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log('Admin account already exists.');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const admin = await User.create({
      name: 'Health Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });

    console.log('✅ Admin account created successfully!');
    console.log('Email: admin@health.gov.in');
    console.log('Password: password123');
    process.exit();
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();

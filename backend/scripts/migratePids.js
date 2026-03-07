const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/User');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const migratePids = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for PID migration...');

    const patients = await User.find({ role: 'patient', pid: { $exists: false } });
    console.log(`Found ${patients.length} patients without a PID.`);

    for (const p of patients) {
      const newPid = `P-${Math.floor(10000 + Math.random() * 90000)}`;
      p.pid = newPid;
      await p.save();
      console.log(`Assigned PID ${newPid} to ${p.name}`);
    }

    console.log('✅ PID migration completed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Migration Error:', error.message);
    process.exit(1);
  }
};

migratePids();

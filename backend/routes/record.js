const express = require("express");
const router = express.Router();
const multer = require("multer");
const contract = require("../utils/contractService");
const Record = require("../models/Record");
const { protect } = require("../middleware/authMiddleware");
const { pinFileToIPFS } = require("../utils/pinataService");

const upload = multer({ storage: multer.memoryStorage() });

// @route   POST /api/records/store-record
// @desc    Store actual file on Pinata, hash on blockchain, and metadata in MongoDB
// @access  Private
router.post("/store-record", protect, upload.single('file'), async (req, res) => {
  try {
    const { name, type, date, size, doc } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 0. Upload File to Pinata IPFS
    const hash = await pinFileToIPFS(req.file.buffer, req.file.originalname, req.file.mimetype);

    // 1. Store hash on blockchain
    const tx = await contract.addRecord(req.user._id.toString(), hash, "timestamped_metadata_hash");
    await tx.wait();

    // 2. Store metadata + hash in MongoDB
    const record = await Record.create({
      userId: req.user._id, // Assume auth middleware adds user to req
      name,
      type,
      date,
      size: size || '1.5 MB', // Just a placeholder size
      doc,
      blockchainHash: hash,
    });

    res.json({
      success: true,
      message: "Record stored on blockchain and database",
      data: record
    });

  } catch (error) {
    console.error("Error storing record:", error);
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/records/user/:userId
// @desc    Get all records for a user
// @access  Private
router.get("/user/:userId", protect, async (req, res) => {
  try {
    // Ideally ensure req.user._id matches req.params.userId for security
    if (req.user._id.toString() !== req.params.userId && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to access these records' });
    }

    const records = await Record.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
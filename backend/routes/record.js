const express = require("express");
const router = express.Router();
const contract = require("../utils/contractService");

router.post("/store-record", async (req, res) => {
  try {
    const { hash } = req.body;

    const tx = await contract.storeRecord(hash);
    await tx.wait();

    res.json({
      success: true,
      message: "Record stored on blockchain"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
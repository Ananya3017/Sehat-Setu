require('dotenv').config();
const mongoose = require('mongoose');
const contract = require('./utils/contractService');
const Record = require('./models/Record');

async function test() {
    try {
        console.log("Testing contract...");
        const hash = "0x123";
        const patientId = new mongoose.Types.ObjectId().toString();

        console.log(`Calling addRecord with patientId: ${patientId}`);
        const tx = await contract.addRecord(patientId, hash, "metadata_hash");
        console.log("Tx submitted, waiting...", tx.hash);
        const receipt = await tx.wait();
        console.log("Tx mined!", receipt.transactionHash);

        console.log("Testing MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        const record = await Record.create({
            userId: patientId,
            name: "Test Record",
            type: "Test",
            date: "2023-01-01",
            size: "1 MB",
            doc: "Dr Test",
            blockchainHash: hash,
        });
        console.log("Record saved to DB:", record._id);
        process.exit(0);
    } catch (err) {
        console.error("ERROR:", err);
        process.exit(1);
    }
}
test();

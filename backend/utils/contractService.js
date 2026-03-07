const { ethers } = require("ethers");
const contractABI = require("../../blockchain/contracts/HealthVault.json");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  provider
);

module.exports = contract;
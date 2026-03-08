const { ethers } = require("ethers");
const contractArtifact = require("../../blockchain/artifacts/contracts/HealthVault.sol/HealthVault.json");
const contractABI = contractArtifact.abi;

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL || process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY || process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    contractABI,
    wallet
);

module.exports = contract;
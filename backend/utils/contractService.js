const { ethers } = require("ethers");
const contractArtifact = require("../../blockchain/artifacts/contracts/HealthVault.sol/HealthVault.json");
const contractABI = contractArtifact.abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    contractABI,
    provider
);

module.exports = contract;
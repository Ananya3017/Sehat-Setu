require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");

const privateKey = process.env.PRIVATE_KEY;
const accounts = privateKey && privateKey.length >= 64 ? [privateKey] : [];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    networks: {
        sepolia: {
            url: process.env.SEPOLIA_URL || "",
            accounts: accounts,
        },
    },
};

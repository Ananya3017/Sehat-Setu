const path = require('path');
const fs = require('fs');
const solc = require('solc');
const { ethers } = require('ethers');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') }); // Load .env from backend folder

async function deploy() {
  console.log("1. Reading Smart Contract...");
  const contractPath = path.resolve(__dirname, 'contracts/HealthVault.sol');
  const source = fs.readFileSync(contractPath, 'utf8');

  console.log("2. Compiling with Solc...");
  const input = {
    language: 'Solidity',
    sources: {
      'HealthVault.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  
  if (output.errors) {
    output.errors.forEach(err => console.error(err.formattedMessage));
    if (output.errors.some(e => e.severity === 'error')) return;
  }

  const compiledContract = output.contracts['HealthVault.sol']['HealthVault'];
  const abi = compiledContract.abi;
  const bytecode = compiledContract.evm.bytecode.object;

  console.log("   -> Compilation Successful!");

  console.log("\n3. Connecting to Sepolia Blockchain...");
  if (!process.env.ETH_RPC_URL || !process.env.ETH_PRIVATE_KEY) {
      console.error("❌ ERROR: Missing ETH_RPC_URL or ETH_PRIVATE_KEY in your backend/.env file.");
      console.error("Please add them and try again!");
      return;
  }

  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
  const wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);

  console.log(`   -> Connected Wallet: ${wallet.address}`);

  console.log("\n4. Deploying Contract...");
  try {
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();
    
    console.log("   -> Waiting for block confirmation...");
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log(`\n✅ DEPLOYMENT SUCCESSFUL!`);
    console.log(`=================================================`);
    console.log(`Copy this exactly into your backend/.env file:`);
    console.log(`CONTRACT_ADDRESS=${address}`);
    console.log(`=================================================\n`);
    
  } catch(e) {
      console.error("❌ DEPLOYMENT FAILED!");
      if(e.message.includes("insufficient funds")) {
          console.error("Your MetaMask wallet does not have enough Sepolia ETH to pay the gas fee!");
          console.error("Please use a faucet to get free testnet ETH.");
      } else {
          console.error(e.message);
      }
  }
}

deploy();

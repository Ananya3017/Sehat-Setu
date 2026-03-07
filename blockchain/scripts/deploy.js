import hre from "hardhat";

async function main() {
  console.log("Deploying HealthVault contract to Sepolia...");

  const healthVault = await hre.ethers.deployContract("HealthVault");

  await healthVault.waitForDeployment();

  console.log(`HealthVault deployed to: ${healthVault.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

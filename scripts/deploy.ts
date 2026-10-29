import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("--------------------------------------------------");
  console.log("Deploying OddOneScores to network...");

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} native currency`);

  const OddOneScoresFactory = await ethers.getContractFactory("OddOneScores");
  const oddOneScores = await OddOneScoresFactory.deploy();

  await oddOneScores.waitForDeployment();

  const deployedAddress = await oddOneScores.getAddress();

  console.log("--------------------------------------------------");
  console.log(`OddOneScores successfully deployed!`);
  console.log(`Contract Address: ${deployedAddress}`);
  console.log(`Explorer: https://scan.bohr.life/address/${deployedAddress}`);
  console.log("--------------------------------------------------");
  console.log("Next step:");
  console.log(`Add NEXT_PUBLIC_ODDONE_CONTRACT_ADDRESS=${deployedAddress} to your .env.local file.`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});

import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("--------------------------------------------------");
  console.log(`Deploying OddOneScores to BOT Chain (Chain ID ${chainId})...`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  const balanceBefore = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer balance: ${ethers.formatEther(balanceBefore)} BOT`);

  // Query network fee data to ensure we use minimal needed gas
  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice || ethers.parseUnits("20", "gwei");
  console.log(`Current network gas price: ${ethers.formatUnits(gasPrice, "gwei")} gwei`);

  const OddOneScoresFactory = await ethers.getContractFactory("OddOneScores");
  
  // Deploy using the network standard gas price without excess multipliers
  const oddOneScores = await OddOneScoresFactory.deploy({
    gasPrice: gasPrice,
  });

  console.log("Deployment transaction sent. Waiting for confirmation...");
  const deploymentTx = oddOneScores.deploymentTransaction();
  const receipt = await deploymentTx?.wait();

  const deployedAddress = await oddOneScores.getAddress();
  const balanceAfter = await ethers.provider.getBalance(deployer.address);
  const cost = balanceBefore - balanceAfter;

  const explorerBase = "https://scan.botchain.ai";

  console.log("--------------------------------------------------");
  console.log(`OddOneScores successfully deployed!`);
  console.log(`Contract Address: ${deployedAddress}`);
  console.log(`Gas used: ${receipt?.gasUsed.toString()} units`);
  console.log(`Total deployment gas cost: ${ethers.formatEther(cost)} BOT`);
  console.log(`Remaining balance: ${ethers.formatEther(balanceAfter)} BOT`);
  console.log(`Explorer: ${explorerBase}/address/${deployedAddress}`);
  console.log("--------------------------------------------------");
  console.log("Next step:");
  console.log(`Add NEXT_PUBLIC_ODDONE_CONTRACT_ADDRESS=${deployedAddress} to your .env.local and .env files.`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});

import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";




// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the zkCASINO contract`);

  // Initialize the wallet.
  const wallet = new Wallet("ef03c6b5aff4e0c6450ad3073d2a10c7d41f9843ec1854c7d911d510b81ed9d7");

// Create deployer object and load the artifact of the contract you want to deploy.
   const deployer = new Deployer(hre, wallet);
   const artifact = await deployer.loadArtifact("zkCASINO");

  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const zkContract = await deployer.deploy(artifact, []);
  console.log(zkContract.interface.encodeDeploy([]))
  // Show the contract info.
  const contractAddress = zkContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}

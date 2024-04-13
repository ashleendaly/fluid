async function deployWhiskyToken() {
  try {
    const WhiskyToken = await require("hardhat").ethers.getContractFactory(
      "CaskTokenContract"
    );

    const contract = await WhiskyToken.deploy();
    console.log("Contract deployed at:", contract.target);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

deployWhiskyToken();

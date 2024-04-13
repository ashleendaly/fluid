async function deployWhiskySwapFactory() {
  try {
    const WhiskySwapFactory =
      await require("hardhat").ethers.getContractFactory("WhiskySwapFactory");

    const contract = await WhiskySwapFactory.deploy();
    console.log("Contract deployed at:", contract.target);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

deployWhiskySwapFactory();

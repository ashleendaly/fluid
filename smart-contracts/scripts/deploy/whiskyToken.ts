async function deployWhiskyToken() {
    try {
      const WhiskyToken = await require("hardhat").ethers.getContractFactory("CaskTokenContract");
  
      const contract = await WhiskyToken.deploy("0x88F6a5b75b9a5296db46E89E16Ac270de0d243c7");
      console.log("Contract deployed at:", contract.target);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  
  deployWhiskyToken();
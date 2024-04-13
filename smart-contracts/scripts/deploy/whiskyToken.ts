async function deployWhiskyToken() {
  try {
    const WhiskyToken = await require("hardhat").ethers.getContractFactory(
      "CaskTokenContract"
    );

    const contract = await WhiskyToken.deploy(
      "0x6C2127CEd02a0d9a3DC29A8BE472ecC72Ef7862d"
    );
    console.log("Contract deployed at:", contract.target);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

deployWhiskyToken();

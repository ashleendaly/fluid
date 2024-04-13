import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  defaultNetwork: "sidechain",
  networks: {
    hardhat: {},
    sidechain: {
      url: "https://rpc-evm-sidechain.xrpl.org",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  solidity: "0.8.24",

};

export default config;

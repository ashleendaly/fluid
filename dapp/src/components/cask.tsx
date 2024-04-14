"use client"; // we connect the wallet in here because we want to fetch the client balance.

import { useState, useEffect, useContext } from "react";
import { EthersContext } from "@/context/wallet"; // we connect the wallet in here because we want to fetch the client balance.
import { useParams } from "next/navigation";
import { ethers } from "ethers";
import {
  whiskySwapFactoryAddress,
  whiskyTokenAddress,
  xrpCurrencyAddress,
} from "@/smart-contracts";
import WhiskySwapFactory from "../contracts/WhiskySwapFactory.json";
import WhiskySwapExchange from "../contracts/WhiskySwapExchange.json";

function Cask() {
  const params = useParams<{ caskId: string }>();
  const { signer } = useContext(EthersContext);
  const [isBuyClicked, setIsBuyClicked] = useState(false);
  const [isSellClicked, setIsSellClicked] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [warning, setWarning] = useState("");
  const [inputBuyValue, setinputBuyValue] = useState("");
  const [inputSellValue, setinputSellValue] = useState("");
  const [caskTokensInPool, setCaskTokensInPool] = useState(0);
  const [caskData, setCaskData] = useState({
    caskID: 0,
    tokensInLiquidityPool: 0,
    ageOfCask: 0,
    priceOfToken: 0,
    amountOfTokensOwned: 0,
  });

  // Fetch initial cask and wallet data when component mounts
  useEffect(() => {
    fetchCaskData();
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    // TODO: make a call to wallet to fetch walletBlance.
    setWalletBalance(walletBalance);
  };

  const fetchCaskData = async () => {
    const factoryContract = new ethers.Contract(
      whiskySwapFactoryAddress,
      WhiskySwapFactory.abi,
      signer
    );

    try {
      const liquidityPoolAddress = await factoryContract.tokensToExchange(
        whiskyTokenAddress,
        xrpCurrencyAddress,
        10,
        params.caskId ? parseInt(params.caskId) : undefined
      );

      if (liquidityPoolAddress) {
        const liquidityPool = new ethers.Contract(
          liquidityPoolAddress,
          WhiskySwapExchange.abi,
          signer
        );

        const tokensInLiquidityPool = await liquidityPool.getCurrencyReserves([
          params.caskId ? parseInt(params.caskId) : undefined,
        ]);
        console.log(tokensInLiquidityPool);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // setCaskData({
    //   caskID: parseInt(params.caskId),
    //   //   tokensInLiquidityPool,
    //   //   ageOfCask,
    //   //   priceOfToken,
    //   //   amountOfTokensOwned,
    // });
  };

  const handleBuyClick = () => {
    if (parseInt(inputBuyValue) <= walletBalance) {
      try {
        // Execute buy function in the backend contract
      } catch (error) {
        console.error("Error executing buy function:", error);
      }
    } else {
      setWarning("Insufficient wallet balance");
    }
  };

  const handleSellClick = () => {
    if (parseInt(inputSellValue) <= caskData.tokensInLiquidityPool) {
      try {
        // Execute sell function in the backend contract
      } catch (error) {
        console.error("Error executing buy function:", error);
      }
    } else {
      setWarning("Insufficient liquidity pool token balance for this cask");
    }
  };

  return (
    <div className="relative w-full h-screen bg-purple-500 flex flex-col justify-center items-center">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 bg-[url('/casks.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
        {/* Dark overlay */}
      </div>

      {/* Content container */}
      <div className="relative w-1/2 h-1/2 bg-white mx-auto flex flex-col justify-center items-center shadow-md border border-gray-700 rounded-sm">
        {/* Display warning message */}
        {warning && <p className="text-red-500">{warning}</p>}

        <h1 className="absolute top-0 left-0 p-6 mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Cask Info:
        </h1>
        <div className="absolute left-7 top-20">
          <p>Cask Id: {caskData.caskID}</p>
          <p>
            Amount of tokens in liquidity pool that are present:{" "}
            {caskData.tokensInLiquidityPool}
          </p>
          <p>Age of cask: {caskData.ageOfCask}</p>
          <p>Price of token: {caskData.priceOfToken}</p>
          <p>Amount of tokens owned: {caskData.amountOfTokensOwned}</p>
        </div>

        <div className="absolute left-7 top-60 flex flex-col justify-center items-center">
          <div className="Buy">
            <input
              type="number"
              placeholder="Enter amount"
              className="appearance-none border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              value={inputBuyValue}
              onChange={(e) => setinputBuyValue(e.target.value)}
            />
            <button
              className="ml-10 p-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleBuyClick}
            >
              Buy
            </button>
          </div>
          <div className="Sell p-4">
            <input
              type="number"
              placeholder="Enter amount"
              className="appearance-none border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              value={inputSellValue}
              onChange={(e) => setinputSellValue(e.target.value)}
            />
            <button
              className="ml-10 p-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleSellClick}
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cask;

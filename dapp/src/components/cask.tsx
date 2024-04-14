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
    const { signer, address } = useContext(EthersContext);
    const [isBuyClicked, setIsBuyClicked] = useState(false);
    const [isSellClicked, setIsSellClicked] = useState(false);
    const [warning, setWarning] = useState("");
    const [inputBuyValue, setinputBuyValue] = useState("");
    const [inputSellValue, setinputSellValue] = useState("");
    const [caskTokensInPool, setCaskTokensInPool] = useState(0);
    const [caskData, setCaskData] = useState({
        caskID: 0,
        tokensInLiquidityPool: 0,
    });
    const [contractAddress, setContractAddress] = useState("");

    const { One } = ethers.constants;

    // Fetch initial cask and wallet data when component mounts
    useEffect(() => {
        if (!signer) return;
        fetchCaskData();
    }, [signer]);

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
                parseInt(params.caskId)
            );

            if (liquidityPoolAddress) {
                setContractAddress(liquidityPoolAddress);
                const liquidityPool = new ethers.Contract(
                    liquidityPoolAddress,
                    WhiskySwapExchange.abi,
                    signer
                );

                const tokensInLiquidityPool = await liquidityPool.getCurrencyReserves([
                    params.caskId ? [parseInt(params.caskId)] : undefined,
                ]);
                console.log(tokensInLiquidityPool.toString());

                setCaskData({
                    caskID: parseInt(params.caskId),
                    tokensInLiquidityPool: parseInt(tokensInLiquidityPool.toString()),
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleBuyClick = async () => {
        const contract = new ethers.Contract(
            contractAddress,
            WhiskySwapExchange.abi,
            signer
        );
        try {
            if (parseInt(inputBuyValue) > 12) {    // 12 is a placeholder for the wallet blanace. in the actual app, we will have to fetch the balance of the wallet.
                const deadline = Math.floor(Date.now() / 1000) + 100000;
                const transaction = await contract.buyTokens(
                    [parseInt(params.caskId)],
                    [inputBuyValue],
                    100000,
                    deadline,
                    address,
                    [],
                    [],
                    {
                        gasLimit: 8000000,
                    }
                );
                await transaction.wait();
                console.log("Transaction successful:", transaction);
            }
            else {
                setWarning("Insufficient balance in wallet");
            }

        } catch (error) {
            console.error(error);
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
                    {/* <p>Age of cask: {caskData.ageOfCask}</p>
          <p>Price of token: {caskData.priceOfToken}</p>
          <p>Amount of tokens owned: {caskData.amountOfTokensOwned}</p> */}
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

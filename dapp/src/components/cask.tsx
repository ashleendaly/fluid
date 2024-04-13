"use client";

import { useState } from 'react';
import { EthersContext } from "@/context/wallet";
import Link from "next/link";
import { useContext } from "react";

export default function Cask() {
    const [isBuyClicked, setIsBuyClicked] = useState(false);
    const [isSellClicked, setIsSellClicked] = useState(false);
    // I have thse states and I want to set them to certain values using a fetch call to the backend
    const [caskData, setCaskData] = useState({  
        caskID: 0,     
        tokensInLiquidityPool: 0,
        ageOfCask: 0,
        priceOfToken: 0,
        amountOfTokensOwned: 0
    });

  return (
    <div className="">
        <h2>Cask Id: {caskData.caskID}</h2>
        <p>Amount of tokens in liquidity pool that are present: {caskData.tokensInLiquidityPool}</p>
        <p>Age of cask: {caskData.ageOfCask}</p>
        <p>Price of token: {caskData.priceOfToken}</p>
        <p>Amount of tokens owned: {caskData.amountOfTokensOwned}</p>
        <button onClick={() => setIsBuyClicked(true)}>Buy</button>
            {isBuyClicked && (
                <input placeholder="Enter amount"></input>
            )}
        <button onClick={() => setIsSellClicked(true)}> Sell</button>
        {isSellClicked && (
            <input placeholder="Enter amount">
            {/* 
            if amount you enterd is an amount that is not sth you have, it gives a warning " you don't have this amount"
            */}
            </input>
        )}              
    </div>
  );
}

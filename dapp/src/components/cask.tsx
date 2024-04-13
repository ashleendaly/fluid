"use client";   // we connect the wallet in here because we want to fetch the client balance.

import { useState, useEffect } from 'react';
import { EthersContext } from "@/context/wallet"; // we connect the wallet in here because we want to fetch the client balance.
import Link from "next/link";
import { useContext } from "react";

function Cask() {
    const [isBuyClicked, setIsBuyClicked] = useState(false);
    const [isSellClicked, setIsSellClicked] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [warning, setWarning] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [caskTokensInPool, setCaskTokensInPool] = useState(0);
    const [caskData, setCaskData] = useState({  
        caskID: 0,     
        tokensInLiquidityPool: 0,
        ageOfCask: 0,
        priceOfToken: 0,
        amountOfTokensOwned: 0
    });


    
    // Fetch initial cask and wallet data when component mounts
    useEffect(() => {
        fetchCaskData(); 
        fetchWalletBalance();
    }, []);

    const fetchWalletBalance = async () => {
        // TODO: make a call to wallet to fetch walletBlance.
        setWalletBalance(walletBalance);
    }

    const fetchCaskData = async () => {
        // TODO: make a call to fetch these data from the backend and get a [reponse] containing a list of the states
        setCaskData({
            caskID,
            tokensInLiquidityPool,
            ageOfCask,
            priceOfToken,
            amountOfTokensOwned
        });    
    };

    const handleBuyClick = () => {
        if (parseInt(inputValue) <= walletBalance) {
            try {
                // Execute buy function in the backend contract
            } catch (error) {
                console.error('Error executing buy function:', error);
            }
        } else {
            setWarning('Insufficient wallet balance');
        }
    };

    const handleSellClick = () => {
        if (parseInt(inputValue) <= caskData.tokensInLiquidityPool) {
            try {
                // Execute sell function in the backend contract
            } catch (error) {
                console.error('Error executing buy function:', error);
            }
        } else {
            setWarning('Insufficient liquidity pool token balance for this cask');
        }
    }

  return (
    <div className="">
        {/* Display warning message */}
        {warning && <p>{warning}</p>}


        <h2>Cask Id: {caskData.caskID}</h2>
        <p>Amount of tokens in liquidity pool that are present: {caskData.tokensInLiquidityPool}</p>
        <p>Age of cask: {caskData.ageOfCask}</p>
        <p>Price of token: {caskData.priceOfToken}</p>
        <p>Amount of tokens owned: {caskData.amountOfTokensOwned}</p>
        <div className="Buy">
            <input
                type="number"
                placeholder="Enter amount"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleBuyClick}>Buy</button>
        </div>
        <div className="Sell">
            <input
                type="number"
                placeholder="Enter amount"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSellClick}>Sell</button>
        </div>


        <button onClick={() => setIsBuyClicked(true)}>Buy</button>
        {isBuyClicked && (
            <input placeholder="Enter amount"></input>
            /* 
                - try (XRP input < wallet balance) {
                    trigger a function in contracts that will make token exchange
                } catch {
                    provide a warning.
                }
            */
        )}
        <button onClick={() => setIsSellClicked(true)}> Sell</button>
        {isSellClicked && (
            <input placeholder="Enter amount">
            {/* 
            - try (sell input > cask tokens) {
                call function in backend contract that makes the deal happen
            } catch {
                provide a warning.
            }
            */}
            </input>
        )}              
    </div>
  );
}

export default Cask
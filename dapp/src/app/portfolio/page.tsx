"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { whiskyTokenAddress } from "@/smart-contracts";
import CaskTokenContract from "../../contracts/CaskTokenContract.json";
import { EthersContext } from "@/context/wallet";
import { ethers } from "ethers";

// creating a data type.
type SingleCask = {
  caskId: number;
  price: number;
  invested: number;
  balance: number; // number of units owned.
};

// Creating a list of items of type SingleCask
const singleCasks: SingleCask[] = [
  { caskId: 1, price: 100, invested: 80, balance: 10 },
  { caskId: 2, price: 150, invested: 120, balance: 5 },
  { caskId: 3, price: 200, invested: 160, balance: 20 },
  { caskId: 4, price: 180, invested: 140, balance: 15 },
  { caskId: 5, price: 120, invested: 100, balance: 8 },
  { caskId: 6, price: 250, invested: 200, balance: 12 },
  { caskId: 7, price: 300, invested: 240, balance: 25 },
  { caskId: 8, price: 220, invested: 180, balance: 17 },
  { caskId: 9, price: 280, invested: 220, balance: 30 },
  { caskId: 10, price: 350, invested: 280, balance: 22 },
  { caskId: 11, price: 190, invested: 150, balance: 18 },
  { caskId: 12, price: 270, invested: 210, balance: 9 },
  { caskId: 13, price: 240, invested: 190, balance: 14 },
  { caskId: 14, price: 320, invested: 260, balance: 27 },
  { caskId: 15, price: 280, invested: 220, balance: 19 },
  { caskId: 16, price: 200, invested: 160, balance: 11 },
  { caskId: 17, price: 330, invested: 270, balance: 23 },
  { caskId: 18, price: 260, invested: 210, balance: 16 },
  { caskId: 19, price: 210, invested: 170, balance: 7 },
  { caskId: 20, price: 290, invested: 230, balance: 21 }
  // Add more items as needed
];


const Portfolio = () => {
  const portfolio: SingleCask[] = [];
  const [price, setPrice] = useState(0);
  const { signer, address } = useContext(EthersContext);

  useEffect(() => {
    fetchPortfolioCasks();
    fetchCurrentPrice();
  }, []);

  const portfolioCasks: SingleCask[] = [
    // we want to fill this with data after fetching that data from the backend (see below)
  ];

  // THIS IS PSEUDOCODE
  // fetching from backend AND setting portfolio variable.
  const fetchPortfolioCasks = async () => {
    // invoke function that generates portfolio from contract.
    // remember this returns a list of IDs and we'll use that to
    if (signer) {
      const tokenContract = new ethers.Contract(
        whiskyTokenAddress,
        CaskTokenContract.abi,
        signer
      );
      const casksHeldByID = await tokenContract.generatePortfolio(address);
      console.log(casksHeldByID);
    }

    // based on the id
    // for (let i = 0; i < casksHeldByID.length; i++) {
    //   const singleCask: SingleCask = {
    //     caskId: casksHeldByID[i],
    //     balance: balanceOf(owner, casksHeldByID[i]),
    //   };
    //   portfolio.push(singleCask);
    // }
  };

  const fetchCurrentPrice = async () => {
    // TODO: make a call to the liquidity pool contract that enable us to get price through the getBuyPrice method.
    setPrice(price);
  };

  // Cask is the cask ID fetched above.
  // Price is the
  // Invested is the number of XRP invested to get these cask tokens : when the user invokes a the function in one of the contracts to "buy" tokens using XRP, that has to update the above with the amount of XRP
  // Units Owned is the same "balance" in Portfolio data type above- it gets fetched.

  return (
    <div className="p-5">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600">Cask ID ({portfolioCasks.length})</TableHead>
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600">Price</TableHead>
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600">Invested (XRP)</TableHead>
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600">Tokens Owned</TableHead>
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600 text-right">Trade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {singleCasks.map((cask) => {
            return (
              <TableRow className="border-b border-gray-200" key={cask.caskId}>
                <TableCell className="py-2 px-4">{cask.caskId}</TableCell>
                <TableCell className="py-2 px-4">{cask.price}</TableCell>
                <TableCell className="py-2 px-4">{cask.invested}</TableCell>
                <TableCell className="py-2 px-4">{cask.balance}</TableCell>
                <TableCell className="py-2 px-4 text-right">
                  <Link
                    className="text-white bg-green-500 hover:bg-green-600 py-1 px-2 rounded-md"
                    href={`/${cask.caskId}`}
                  >
                    Trade
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
